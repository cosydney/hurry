import React, { Component } from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";

import Axios from "axios";
import { Spin } from "antd";
import { URL } from "../../utils/urls";

export default class Ticket extends Component {
  static propTypes = {
    // prop: PropTypes
  };

  state = {
    spinning: false
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    this.setState({ spinning: true })
    Axios.get(`${URL}attendees/${id}`).then(response =>
      this.setState({ attendee: response.data[0], spinning: false })
    );
  }

  render() {
    const { spinning } = this.state;

    if (this.state.spinning) {
      return (
        <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center', height: '80vh', padding: 40, margin: 40}}>
          <Spin spinning={spinning} size={'large'}/>
        </div>
      )
    }

    if (this.state.attendee) {
      const {
        attendee,
        attendee: {
          email,
          event: {
            start,
            name,
            info: {
              venue,
              venue: {
                address: { localized_address_display }
              }
            }
          },
          info: { barcodes }
        }
      } = this.state;
      return (
        <div style={{ margin: 20, padding: 20 }}>
          {barcodes.map(({ barcode }, index) => {
            return (
              <div key={index}>
                <h1>{name}</h1>
                <p>{new Date(start).toString()}</p>
                <h3>
                  {venue.name}, {localized_address_display}
                </h3>
                <h3>{attendee.name}</h3>
                <h3>{email}</h3>
                <QRCode value={barcode} />
                <br />
              </div>
            );
          })}
        </div>
      );
    }
    return <h1>No ticket to display</h1>;
  }
}
