import React, { Component } from 'react';

import { Layout, Row, Col } from 'antd';

import Title from './components/Title';
import ConnectWith from './components/ConnectWith'
import Schedule from './components/Schedule'
import Pay from './components/Pay'

import './App.css'

const { Header, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <div>
        <Layout style={{backgroundColor: 'lightgrey'}}>
          <Header style={{backgroundColor: '#f0f2f5'}}>
          <Row>
            <Col sm={{ span: 20, offset: 4 }} xs={{ span: 23, offset: 1}}>
              <Title/>
            </Col>
          </Row>
          </Header>
        </Layout>
        <br/>
        <Row>
          <Col sm={{ span: 20, offset: 4 }} xs={{ span: 23, offset: 1}}>
            <ConnectWith />
            <br></br>
            <Schedule />
            <br></br>
            <br></br>
            {/* <Pay /> */}
          </Col>
        </Row>
        <Footer>Privacy by design. <span aria-label='lock' role='img'>🔒</span>GDPR Compliant.</Footer>
      </div>
    );
  }
}

export default App;