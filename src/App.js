import React, { Component } from "react";

import { Layout, Row, Col } from "antd";

import Title from "./components/Title";
import ConnectWith from "./components/ConnectWith";
import Schedule from "./components/Schedule";
import Pay from "./components/Pay";

import Europeflag from "./images/europe.png";

import "./App.css";

require("typeface-inter");

const { Header, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <div>
        <Layout style={{ backgroundColor: "#EEF5FF" }}>
          <Header style={{ backgroundColor: "#EEF5FF" }} className='header-back'>
            <Row>
              <Col sm={{ span: 22, offset: 1 }} xs={{ span: 23, offset: 1 }}>
                <Title />
              </Col>
            </Row>
          </Header>
        </Layout>
        <br />
        <Row>
          <Col sm={{ span: 20, offset: 2 }} xs={{ span: 23, offset: 1 }}>
            <ConnectWith />
            <br />
            <Schedule />
            <br />
            <br />
            <Pay />
          </Col>
        </Row>
        <Footer
          style={{
            backgroundColor: "rgb(238, 245, 255)",
            fontSize: 16,
            fontWeight: 500
          }}
        >
          Privacy by design{" "}
          <span style={{ marginLeft: 40 }} aria-label="lock" role="img">
            <img src={Europeflag} alt="europe-flag" className="europe" />
          </span>
          GDPR Compliant
        </Footer>
      </div>
    );
  }
}

export default App;
