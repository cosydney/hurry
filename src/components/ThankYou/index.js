import React, { Component } from "react";
import Confetti from "react-dom-confetti";
import { Redirect } from "react-router-dom";

import { Button } from "antd";

export default class ThankYou extends Component {
  state = {
    active: false
  };

  componentDidMount() {
    this.setState({
      active: true,
      redirect: false
    });
  }

  render() {
    const configLogo = {
      angle: "60",
      spread: "100",
      startVelocity: "45",
      elementCount: "100",
      dragFriction: 0.1,
      duration: "3370",
      stagger: "1",
      width: "10px",
      height: "10px",
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
    };
    const { active, redirect } = this.state;

    if (redirect) {
      return <Redirect to={"/"} />;
    }

    return (
      <div style={{ height: "100vh" }} className={"centered"}>
        <div className={"thank-you"}>
        <span
          onClick={() => {
            this.setState({ active: true });
            setTimeout(() => this.setState({ active: false }), 300);
          }}
          role="img"
          aria-label="party"
          className='party-emoji'
        >
          🎉
          <Confetti active={active} config={configLogo} />
        </span>
          {/* Here should redirect */}
          <h1>
            Thank you for trusting Harry for your event.<br /> You will receive
            a confirmation email soon with your receipt.
          </h1>
          <Button
            onClick={() => this.setState({ redirect: true })}
            type={"primary"}
          >
            Create a new campaign
          </Button>
        </div>
      </div>
    );
  }
}

// const ThankYou = () => {

//   return (

//   );
// };

// export default ThankYou;
