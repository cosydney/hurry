import React, { Component } from "react";
import { connect } from "react-redux";
import { message, Button, Icon, Row, Col } from "antd";
import Axios from "axios";

import EmaBot from "../../images/ema_botblue.png";

import StripeCheckout from "react-stripe-checkout";
import { STRIPE_PUBLIC_KEY } from "../../utils/stripe";
import { URL } from "../../utils/urls";

const PRICING = 0.2;
class Pay extends Component {
  state = {
    eventId: "",
    paymentComplete: false
  };

  onToken = token => {
    let { eventId } = this.state;
    const { event } = this.props;
    let body = {};
    body.token = token.id;
    body.info = token;
    body.event = eventId;
    body.price = this.calculatePricing();
    body.currency = event.currency === "EUR" ? "EUR" : "USD";

    Axios.post(`${URL}save-stripe-token`, body)
      .then(({ data }) => {
        console.log("data", data);
        message.success(`We are in business`);
        // TODO reset redux state here?
        this.setState({ paymentComplete: true })
      })
      .catch(response => {
        message.error("error processing payment", response.error);
      });
  };

  // TODO async function?
  postInfo = () => {
    const { event, user, attendees } = this.props;
    if (attendees.length < 1) {
      message.error(
        "You don't have any attendees please import from 1. Import your event contacts"
      );
      return;
    }
    let body = {};
    body.name = event.name.text;
    body.start = event.start.utc;
    body.info = event;
    body.email = user.email;
    body.username = user.name;
    body.ebToken = user.ebToken;
    Axios.post(`${URL}events`, body)
      .then(response => {
        let eventId = response.data.id;
        this.setState({ eventId });
        // TODO
        this.postAttendees(eventId);
        this.postMessages(eventId);
      })
      .catch(error => {
        message.error(`Server error ${error}`);
      });
  };

  postAttendees(eventId) {
    const { attendees } = this.props;
    let array = [];
    for (let i = 0; i < attendees.length; i++) {
      const element = attendees[i];
      let newElement = {};
      newElement.event = eventId;
      newElement.name = element.profile.name;
      newElement.email = element.profile.email;
      newElement.phone = element.profile.cell_phone;
      newElement.info = element;
      array.push(newElement);
    }
    if (array.length === 1) {
      array = array[0];
    }
    Axios.post(`${URL}attendees`, array)
      .then(attendeeresponse => {
        console.log("attendeeresponse", attendeeresponse.data);
      })
      .catch(error => {
        message.error(`Server error ${error}`);
      });
  }

  postMessages(eventId) {
    const { scheduled_sms, event } = this.props;
    let array = [];
    for (let i = 0; i < scheduled_sms.length; i++) {
      const element = scheduled_sms[i];
      let newElement = {};
      newElement.scheduledTime = new Date(
        new Date(event.start.utc) - 1 + element.schedule_time
      );
      newElement.text = element.text;
      newElement.type = element.type;
      newElement.number = element.number;
      newElement.before = element.before;
      newElement.event = eventId;
      array.push(newElement);
    }
    if (array.length === 1) {
      array = array[0];
    }
    Axios.post(`${URL}scheduledmessages`, array)
      .then(messagesresponse => {
        console.log("messagesresponse", messagesresponse.data);
      })
      .catch(error => {
        message.error(`Server error ${error}`);
      });
  }

  calculatePricing() {
    const { scheduled_sms, attendees } = this.props;
    let setupfee = 200;
    let smsCount = 0;
    let contactCount = attendees.filter(attendee => attendee.profile.cell_phone)
      .length;

    for (let i = 0; i < scheduled_sms.length; i++) {
      const sms = scheduled_sms[i];
      smsCount += Math.ceil(sms.text.length / 160);
    }
    let totalSms = smsCount * contactCount;
    let pricing = totalSms * PRICING;
    return (Math.round(pricing * 100) + setupfee)*0.8;
  }

  calculateEmail() {
    const { scheduled_sms, attendees, user, event } = this.props;
    let contactCount = attendees.filter(
      attendee => !attendee.profile.cell_phone
    ).length;
    let numberofMsgScheduled = scheduled_sms.filter(({ text }) => text).length;
    return contactCount * numberofMsgScheduled;
  }

  smsCount() {
    const { scheduled_sms } = this.props;
    let smsCount = 0;
    for (let i = 0; i < scheduled_sms.length; i++) {
      const sms = scheduled_sms[i];
      smsCount += Math.ceil(sms.text.length / 160);
    }
    return smsCount;
  }

  contactCountsms() {
    return this.props.attendees.filter(attendee => attendee.profile.cell_phone)
      .length;
  }

  render() {
    const { scheduled_sms, attendees, user, event } = this.props;
    const { paymentComplete } = this.state;
    let totalContactCount = attendees.length;

    let totalSms = this.smsCount() * this.contactCountsms();
    let pricing = this.calculatePricing();
    let currency = event.currency === "EUR" ? "€" : "$";
    let numberofMsgScheduled = scheduled_sms.filter(({ text }) => text).length;
    let totalEmail = this.calculateEmail();

    if (paymentComplete) {
      return (
        <Row gutter={0}>
          <Col sm={16} xs={24}>
            <div className={"pay"}>
              {/* Here should redirect */}
              <h1>Thank you for your purchase. You will receive a confirmation email soon.</h1>
            </div>
          </Col>
        </Row>
      )
    }

    return (
      <div>
        <h2 className="sections">
          <Icon type="dollar-circle" theme="filled" className="icon-section" />{" "}
          Order summary:
        </h2>
        <Row gutter={0}>
          <Col sm={16} xs={24}>
            <div className={"pay"}>
              {/* <h2>Order summary:</h2> */}
              <div className={"summary-line"}>
                <h4>Set up fee:</h4>
                <h4>{currency}2</h4>
              </div>
              <div className={"summary-line"}>
                <h4>Number of messages scheduled:</h4>
                <h4>
                  <Icon
                    type="message"
                    size="small"
                    theme="filled"
                    style={{ marginRight: 5, color: "darkgrey" }}
                  />
                  {numberofMsgScheduled}
                </h4>
              </div>
              <div className={"summary-line"}>
                <h4>Number of contacts to send to:</h4>
                <h4>
                  <Icon
                    type="user"
                    size="small"
                    style={{ marginRight: 5, color: "darkgrey" }}
                  />
                  {totalContactCount}
                </h4>
              </div>
              <hr />
              <div className={"summary-line"}>
                <h4>Total number of SMS to be sent:</h4>
                <h4>
                  <Icon
                    type="message"
                    size="small"
                    theme="filled"
                    style={{ marginRight: 5, color: "darkgrey" }}
                  />
                  {totalSms}
                </h4>
              </div>
              <div className={"summary-line"}>
                <h4>Price per sms:</h4>
                <h4>{currency + PRICING}</h4>
              </div>
              <hr />
              <div className={"summary-line"}>
                <h4>Total number of Email to be sent:</h4>
                <h4>
                  <Icon
                    type="mail"
                    size="small"
                    theme="filled"
                    style={{ marginRight: 5, color: "darkgrey" }}
                  />
                  {totalEmail}
                </h4>
              </div>
              <div className={"summary-line"}>
                <h4>Price per email:</h4>
                <h4>free</h4>
              </div>
              <hr></hr>
              <div className={"summary-line"}>
                <h4>Product hunt discount:</h4>
                <h4>20%</h4>
              </div>
              <br />
              <br />
              <div className={"summary-line"}>
                <h3>Total Price:</h3>
                <h3 style={{ color: "#ED593A" }}>{currency + pricing / 100}</h3>
              </div>

              {/* Payments */}
              {pricing >= 200 && (
                <div className={"pay-now"}>
                  {attendees.length > 0 &&
                  <StripeCheckout
                    name="Ema" // the pop-in header title
                    description="Send SMS to your attendees" // the pop-in header subtitle
                    image={EmaBot}
                    // ComponentClass="div"
                    panelLabel="Pay" // prepended to the amount in the bottom pay button
                    amount={pricing} // cents
                    currency={event.currency === "EUR" ? "EUR" : "USD"}
                    stripeKey={STRIPE_PUBLIC_KEY}
                    locale="fr"
                    email={user.email}
                    // Note: Enabling either address option will give the user the ability to
                    // fill out both. Addresses are sent as a second parameter in the token callback.
                    shippingAddress={false}
                    billingAddress={false}
                    zipCode={false}
                    allowRememberMe // "Remember Me" option (default true)
                    token={this.onToken} // submit callback
                    // opened={this.onOpened} // called when the checkout popin is opened (no IE6/7)
                    // closed={this.onClosed} // called when the checkout popin is closed (no IE6/7)

                    // Note: `reconfigureOnUpdate` should be set to true IFF, for some reason
                    // you are using multiple stripe keys
                    reconfigureOnUpdate={false}
                  >
                    <Button
                      block
                      size={"large"}
                      id={"primary-button"}
                      type={"primary"}
                      onClick={() => this.postInfo()}
                    >
                      Pay now{" "}
                      <span
                        style={{ marginLeft: 10 }}
                        role="img"
                        aria-label="hand"
                      >
                        👉
                      </span>
                    </Button>
                    <p style={{ color: "grey", marginTop: 5 }}>
                      Payment processed with stripe
                    </p>
                  </StripeCheckout>
                  }
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ schedule, attendees, user, event }) => ({
  scheduled_sms: schedule.scheduled_sms,
  attendees,
  user,
  event
});

// const mapDispatchToProps = dispatch => {
//   return {
//     editBox: (index, info) => dispatch(editBox(index, info))
//   };
// };

export default connect(
  mapStateToProps,
  null
)(Pay);
