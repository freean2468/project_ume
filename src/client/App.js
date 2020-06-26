import React, { Component } from 'react';
import Nav from './nav/Nav.js';
import Body from './body/Body.js';
import './app.css';

export default class App extends Component {
  render() {
    return (
      <>
        <Nav/>
        <Body/>
      </>
    );
  }
}
