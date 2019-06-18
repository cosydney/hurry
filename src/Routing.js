import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from './App';


export default class Routing extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={App} /> 
        {/* exact */}
      </Router>
    )
  }
}

