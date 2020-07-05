import React, { Component } from 'react';
import Nav from './nav/Nav';
import Body from './body/Body';
import Footer from './footer/Footer';
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
      <div className="AppContainer">
        <Nav setLink={this.setLink}/>
        <Body link={this.state.link}/>
        <Footer />
      </div>
    );
  }
}
