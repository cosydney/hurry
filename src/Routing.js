import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './App';
import Ticket from './components/Ticket'
import ThankYou from './components/ThankYou';


export default class Routing extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={App} /> 
        <Route path="/thankyou" exact component={ThankYou} /> 
        <Route path="/ticket/:id" exact component={Ticket} /> 
        <Route path="/dashboard/brite" component={App} /> 
        {/* exact */}
      </Router>
    )
  }
}

