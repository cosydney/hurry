import React, { Component } from "react";

import { Icon, Table, message, Button, Spin, Modal, Tag } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { setToken, setUserInfo } from "./action";

import { URLFront } from "../../utils/urls";
import { ClientId } from "../../utils/eventBrite";
import ImportContacts from "../ImportContacts";

import Axios from "axios";

const columns = [
  {
    key: "1",
    title: "Name",
    dataIndex: "profile.name"
  },
  {
    key: "2",
    title: "Email",
    dataIndex: "profile.email"
  },
  {
    key: "3",
    title: "Phone",
    dataIndex: "profile.cell_phone"
  }
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

class ConnectWith extends Component {
  state = {
    spinning: false,
    eventBriteVisible: false,
    selectedRowKeys: []
  };

  eventBrite() {
    const redirectUri = `${URLFront}dashboard/brite`;
    const popup = `https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=${ClientId}&redirect_uri=${redirectUri}`;
    window.location.replace(popup);
  }

  componentDidMount() {
    this.setEbToken();
  }

  componentDidUpdate(prevProps) {
    const { name, email, ebToken } = this.props.user;
    if (name && email) {
      return;
    }
    if (prevProps.user.ebToken !== ebToken) {
      this.fetchUser();
      // this.fetchEvents();
    }
  }

  fetchUser() {
    let { ebToken } = this.props.user;
    this.setState({ spinning: true });
    Axios.get(`https://www.eventbriteapi.com/v3/users/me/?token=${ebToken}`)
      .then(response => {
        this.setState({
          ebUser: response.data,
          spinning: false,
          eventBriteVisible: true
        });
        this.props.setUserInfo(response.data);
      })
      .catch(error => {
        this.setState({ spinning: false });
        message.error("error fecthing info on event brite", error);
      });
  }

  setEbToken() {
    if (this.props.location) {
      const token = this.props.location.hash.split("=")[2];
      if (token) {
        this.props.setToken(token);
        this.setState({ token });
        return token;
      }
    }
    return null;
  }

  render() {
    const {
      user: { name, email },
      attendees,
      event
    } = this.props;
    console.log(event);
    const { spinning, eventBriteVisible } = this.state;
    let contactCount = attendees.filter(
      attendee => attendee.profile.cell_phone
    );
    return (
      <div>
        <h1 className="sections">
          <Icon className="icon-section" type="contacts" theme="filled" />{" "}
          Import your event contacts
        </h1>
        <Spin spinning={spinning}>
          <div>
            {/* BUTTON */}
            {!name && (
              <Button
                onClick={() => this.eventBrite()}
                id={"primary-button"}
                type={"primary"}
              >
                Connect with EventBrite
              </Button>
            )}
            {/* TABLE */}
            {name && (
              <div>
                <div className={"info-import"}>
                <Tag color="blue" className="tag-info">
                  {" "}
                  <Icon type="info-circle" theme='filled' /> Attendee without phone will receive
                  email instead
                </Tag>
                <br></br>
                <Button
                  style={{marginTop: 5}}
                  icon={'edit'}
                  type={"primary"}
                  onClick={() => {
                    this.setState({ eventBriteVisible: true });
                  }}
                >
                  Import another Event
                </Button>
              </div>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ marginLeft: 8 }} />
                </div>
                <Table
                  title={() => (
                    <div>
                      {event.name && (
                        <div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              margin: 20
                            }}
                          >
                            <h1>{event.name.text}</h1>
                            <h2>
                              <Icon type="user" /> {attendees.length} Attendees
                              {/* {contactCount.length} with phone numbers. */}
                            </h2>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              margin: 20,
                              marginTop: -20,
                              padding: 5
                            }}
                          >
                            <div
                              style={{
                                marginRight: 10,
                                padding: 10,
                                backgroundColor: "white",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                minWidth: 70,
                                height: 70
                              }}
                            >
                              <h4 style={{ margin: 0, marginBottom: -10 }}>
                                {monthNames[
                                  new Date(event.start.utc).getMonth()
                                ].toUpperCase()}
                              </h4>
                              <h1 style={{ margin: 0, marginTop: 4 }}>
                                {new Date(event.start.utc).getDay()}
                              </h1>
                            </div>
                            <div>
                              <h4>{formatAMPM(new Date(event.start.utc))}</h4>
                              {/* <h4>Station F</h4>
                              <h4>Address</h4> */}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  size={"small"}
                  scroll={{ x: 4, y: 400 }}
                  columns={columns}
                  dataSource={attendees}
                />
              </div>
            )}
          </div>
          {/* MODAL */}
          <Modal
            style={{ top: 30 }}
            title={"Import your contacts with EventBrite"}
            visible={eventBriteVisible}
            closable
            onCancel={() => this.setState({ eventBriteVisible: false})}
            footer={[
              <Button
                style={{ backgroundColor: "lightgrey" }}
                key="back"
                onClick={() => this.setState({ eventBriteVisible: false })}
              >
                Cancel
              </Button>
            //   <Button
            //   style={{ backgroundColor: "#0664FE" }}
            //   key="OK"
            //   onClick={() => this.setState({ eventBriteVisible: false })}
            // >
            //   Import
            // </Button>,
            ]}
          >
            <ImportContacts
              closeModal={() => this.setState({ eventBriteVisible: false })}
              openModal={() => this.setState({ eventBriteVisible: true })}
            />
          </Modal>
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = ({ user, attendees, event }) => ({
  user,
  attendees,
  event
});

const mapDispatchToProps = dispatch => {
  return {
    setToken: token => dispatch(setToken(token)),
    setUserInfo: info => dispatch(setUserInfo(info))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectWith)
);
