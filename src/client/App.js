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

    this.bodyRef = React.createRef();

    this.setLink = this.setLink.bind(this);
  }

  setLink(link, st){
    if (this.state.link === null) {
      this.setState({
        link: {
          link : link,
          st : st
        }
      });
    } else {
      if (this.state.link.link === link) {
        this.bodyRef.current.yplayerRef.current.seekToAndLoad(st);
      }
      
      this.setState({
        link: {
          link : link,
          st : st
        }
      });
    }
  }

  render() {
    return (
      <div className="AppContainer">
        <Nav setLink={this.setLink}/>
        <Body ref={this.bodyRef} link={this.state.link}/>
        <Footer />
      </div>
    );
  }
}
