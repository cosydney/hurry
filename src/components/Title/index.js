import React, { Component } from "react";

import logo from '../../images/logo.svg';

import Confetti from "react-dom-confetti";
import ConfettiGenerator from "confetti-js";

class Title extends Component {
  state = {
    active: false
  };

  componentDidMount() {
    let width = window.innerWidth
    const height = document.getElementById('container').clientHeight;
    var confettiSettings = {
      target: "confetti-holder",
      max: "40",
      size: "1",
      animate: true,
      props: ["circle", "square", "triangle", "line"],
      colors: [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126]],
      clock: "1",
      rotate: true,
      width: width,
      height: height,
    };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  }

  render() {
    const configLogo = {
      angle: "308",
      spread: "155",
      startVelocity: "45",
      elementCount: "50",
      dragFriction: 0.1,
      duration: "3370",
      stagger: "1",
      width: "10px",
      height: "10px",
      colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
    };
    const { active } = this.state;
    const isMobile = window.innerWidth <= 500;

    return (
      <div
        id='container'
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "column",
          margin: "20px 0px 0px 0px",
          minHeight: 413
        }}
      >
        <div style={{ position: "absolute", display: "flex", marginLeft: isMobile? -63 : -146 }}>
          <canvas id="confetti-holder" />
        </div>
        <h2
          style={{zIndex: 2}}
          onClick={() => {
            this.setState({ active: true });
            setTimeout(() => this.setState({ active: false }), 300);
          }}
        >
          <Confetti active={active} config={configLogo} />
          <img src={logo} alt='logo harry' height={33}/> 
        </h2>
        <h1
          style={{ marginBottom: 0, zIndex: 2, fontSize: 46, color: "#232E50", fontWeight: 600 }}
        >
          Send SMS to your Eventbrite attendees
        </h1>
        <h3 style={{ marginTop: 0, zIndex: 2, color: "#9197A7", fontSize: 24 }}>
          Simply import you event contacts, schedule your messages and send them
          !
        </h3>
        </div>
    );
  }
}

export default Title;
