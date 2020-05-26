import React, { Component } from 'react';
import Header from './Header.js';
import Nav from './Nav.js';
import Body from './Body.js';
import './app.css';

export default class App extends Component {
  componentDidMount() {
    document.title = 'Re-video';
  }

  render() {
    return (
      <>
        <Header/>
        <Nav/>
        <Body/>
      </>
    );
  }
}
