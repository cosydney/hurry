import React, { useState } from "react";

import ConfettiImg from "../../images/confetti-bg.png";
import Confetti from "react-dom-confetti";

const Title = () => {
  const config = {
    angle: "308",
    spread: "155",
    startVelocity: "33",
    elementCount: "85",
    dragFriction: 0.1,
    duration: "3370",
    stagger: "1",
    width: "10px",
    height: "10px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };
  const [active, setActive] = useState(false);
  const isMobile = window.innerWidth <= 500;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        margin: "20px 0px 0px 0px",
        minHeight: 413
      }}
    >
      <h1
        onClick={() => {
          setActive(!active);
          setTimeout(function() {
            setActive(false);
          }, 300);
        }}
      >
        <Confetti active={active} config={config} /> 
        Harry (ALPHA)
      </h1>
      <h1
        style={{ zIndex: 2, fontSize: 46, color: "#232E50", fontWeight: 600 }}
      >
        Increase the attendance rate at your Eventbrite events
      </h1>
      <h2 style={{ zIndex: 2, color: "#9197A7", fontSize: 24 }}>
        Simply import you event contacts, schedule your messages and send them !
      </h2>
      <div
        className="confetti"
        style={{
          background: `url(${ConfettiImg})`,
          right: isMobile ? 0 : false
        }}
      />
    </div>
  );
};

export default Title;
