import React, { Component } from 'react';
import Nav from './nav/Nav.js';
import Body from './body/Body.js';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link : null
    }

    this.setLink = this.setLink.bind(this);
  }

  setLink(link){
    this.setState({link:link});
  }

  render() {
    return (
      <>
        <Nav setLink={this.setLink}/>
        <Body link={this.state.link}/>
      </>
    );
  }
}
