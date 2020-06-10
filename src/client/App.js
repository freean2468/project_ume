import React, { Component } from 'react';
import Head from './head/Head.js';
import Nav from './nav/Nav.js';
import Body from './body/Body.js';
import './app.css';

export default class App extends Component {

  componentDidMount() {
    document.title = 'meaning.gg';
  }

  render() {
    return (
      <>
        <div className="Container">
          <Nav/>
          <Head/>
        </div>
        <Body/>
      </>
    );
  }
}
