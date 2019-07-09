import React, { Component } from 'react'
import { Checkbox, List, Button, message, Spin } from "antd";
import { setUserInfo } from "../ConnectWith/action";
import { connect } from 'react-redux'
import Axios from "axios";
import ContactListHeader from "./ContactListHeader"
import { addAttendees, addEvent } from './action';


class ImportContacts extends Component {
  state = {
    spinning: false,
    events: [],
    attendees: [],
    selectedEvent: "",
  }

  componentDidMount() {
    this.fetchEvents();
  }
  
  componentDidUpdate(prevProps) {
    const { email } = this.props.user;
    if (prevProps.user.email !== email) {
      this.fetchEvents();
    }
  }

  fetchEvents() {
    let { ebToken } = this.props.user;
    this.setState({ spinning: true });
    Axios.get(
      `https://www.eventbriteapi.com/v3/users/me/owned_events/?expand=venue&token=${ebToken}`
    )
      .then(({ data: { events, pagination } }) => {
        this.setState({
          spinning: false,
          events: events.reverse(),
          events_pagination: pagination
        });
        if (pagination.has_more_items) {
          this.fetchEventPagination(pagination.continuation);
        }
      })
      .catch(error => {
        this.setState({ spinning: false });
        message.error("error fecthing info on event brite", error);
      });
  }

  fetchEventPagination(continuation) {
    let { ebToken } = this.props.user;
    this.setState({ spinning: true });
    Axios.get(
      `https://www.eventbriteapi.com/v3/users/me/owned_events/?token=${ebToken}&continuation=${continuation}`
    )
      .then(({ data: { pagination, events } }) => {
        const currentEvents = this.state.events;
        this.setState({
          spinning: false,
          events: [...events.reverse(), ...currentEvents],
          events_pagination: pagination
        });
        if (pagination.has_more_items) {
          this.fetchEventPagination(pagination.continuation);
        }
      })
      .catch(error => {
        this.setState({ spinning: false });
        message.error("error", error);
        console.log("error", error);
      });
  }

  getEventContacts(id, event) {
    let { ebToken } = this.props.user;
    this.setState({ spinning: true, selectedEvent: event.name.text });
    Axios.get(
      `https://www.eventbriteapi.com/v3/events/${id}/attendees/?token=${ebToken}`
    )
      .then(({ data: { pagination, attendees } }) => {
        if (attendees.length === 0) {
          message.warning("There are no attendees for this events");
        }
        let newAttendees = this.addCheckToAttendees(attendees).reverse();
        newAttendees = newAttendees.filter(attendees => !attendees.cancelled)
        this.setState({
          spinning: false,
          attendees: newAttendees,
          attendees_pagination: pagination
        });
        if (pagination.has_more_items) {
          this.getContactsPagination(id, pagination.continuation);
        }
      })
      .catch(error => {
        this.setState({ spinning: false });
        console.log(error)
        message.error("error fecthing info on event brite", error);
      });
  }

  getContactsPagination(id, continuation) {
    let { ebToken } = this.props.user;
    this.setState({ spinning: true });
    Axios.get(
      `https://www.eventbriteapi.com/v3/events/${id}/attendees/?token=${ebToken}&continuation=${continuation}`
    )
      .then(({ data: { pagination, attendees } }) => {
        const currentAttendees = this.state.attendees;
        const allAttendees = [
          ...this.addCheckToAttendees(attendees).reverse(),
          ...currentAttendees
        ];
        this.setState({
          spinning: false,
          attendees: allAttendees,
          attendees_pagination: pagination
        });
        if (pagination.has_more_items) {
          this.getContactsPagination(id, pagination.continuation);
        }
      })
      .catch(error => {
        this.setState({ spinning: false });
        message.error("error", error);
        console.log("error", error);
      });
  }

  unCheckAttendee(attendeeId) {
    const attendees = this.state.attendees;
    const attendee = attendees.filter(({ id }) => id === attendeeId)[0];
    const index = attendees.map(({ id }) => id).indexOf(attendee.id);
    attendees[index].checked = !attendees[index].checked;
    this.setState({ attendees });
  }

  ToggleAttendees() {
    const attendees = this.state.attendees;
    attendees.forEach(attendee => {
      attendee.checked = !attendee.checked;
    });
    this.setState({ attendees });
  }

  addCheckToAttendees(attendees) {
    attendees.forEach((attendee) => {
      attendee.checked = true;
      attendee.key = attendee.id;
    });
    return attendees;
  }

  importList = () => {
    this.setState({ spinning: true });
    const { attendees } = this.state;
    const activeAttendees = attendees.filter(({ checked }) => checked);
    const selectedEvent = this.state.events.filter(event => event.name.text === this.state.selectedEvent)[0]
    this.props.importEvents(selectedEvent);
    this.props.importAttendees(activeAttendees);
    this.props.closeModal();
    this.setState({ spinning: false });
  };

  render() {
    const { name, email } = this.props.user;
    const { spinning, events, attendees, selectedEvent } = this.state;
    return (
      <div>
      <div>
          <Spin size="large" spinning={spinning}>
            {events && attendees.length < 1 && (
              <List
                header={
                  <h5 style={{ display: "flex", justifyContent: "center", color: 'white'}}>
                    {" "}
                    Connected as {name} with email {email}
                  </h5>
                }
                style={{
                  overflow: "auto",
                  height: 500
                }}
                size="small"
                bordered
                dataSource={events}
                renderItem={event => (
                  <List.Item
                    onClick={() => this.getEventContacts(event.id, event)}
                    className='event-list' 
                  >
                    <span style={{ marginLeft: 10 }}>{`   ${
                      event.name.text
                    }`}</span>
                    <Button icon="arrow-right" style={{borderRadius: 60}}/>
                  </List.Item>
                )}
              />
            )}

            {attendees.length > 1 && (
              <div>
                <List
                  id={'list-contact'}
                  style={{
                    overflow: "auto",
                    height: 500
                  }}
                  header={
                    <ContactListHeader
                      selectedEvent={selectedEvent}
                      attendees={attendees}
                      importList={() => this.importList()}
                      resetState={() =>
                        this.setState({
                          attendees: [],
                          attendees_pagination: null
                        })
                      }
                      ToggleAttendees={() => this.ToggleAttendees()}
                    />
                  }
                  size="small"
                  bordered
                  dataSource={attendees}
                  renderItem={({
                    id,
                    profile: { name, email, cell_phone },
                    checked
                  }) => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <div style={{ display: "flex" }}>
                            <Checkbox
                              type="checkbox"
                              className="checkbox"
                              checked={checked}
                              onChange={() => this.unCheckAttendee(id)}
                            />
                            <h5 style={{ marginLeft: 10 }}>{name}</h5>
                          </div>
                        }
                        description={`✉️${email} ${
                          cell_phone ? `📞${cell_phone}` : ""
                        }`}
                      />
                    </List.Item>
                  )}
                />
              </div>
            )}
          </Spin>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user, attendees, event }) => ({
  user,
  attendees,
  event
});

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: info => dispatch(setUserInfo(info)),
    importAttendees: attendees => dispatch(addAttendees(attendees)),
    importEvents: event => dispatch(addEvent(event))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportContacts);
