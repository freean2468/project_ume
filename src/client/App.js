import React, { Component } from 'react';
import Header from './Header.js';
import Nav from './Nav.js';
import Body from './Body.js';
import './app.css';

export default class App extends Component {
  componentDidMount() {
    document.title = 'SensebeDictionary';
  }

  render() {
    return (
      <>
        <div className="Container">
          <Nav/>
          <Header/>
        </div>
        <Body/>
      </>
    );
  }
}
