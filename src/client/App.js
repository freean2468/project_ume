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

    this.setYVideo = this.setYVideo.bind(this);
  }

  setYVideo(vid, st){

    fetch(`/api/getLink?id=${encodeURIComponent(vid)}`)
    .then(res => res.text())
    .then(res => {
      // gotta load link data from server
      console.log(res);
      if (this.state.link === null) {
        this.setState({
          link: {
            id : vid,
            link : res,
            st : st
          }
        });
      } else {
        if (this.state.link.link === res) {
          this.bodyRef.current.yplayerRef.current.seekToAndLoad(st);
        }
        
        this.setState({
          link: {
            id : vid,
            link : res,
            st : st
          }
        });
      }
    });
  }

  render() {
    return (
      <div className="AppContainer">
        <Nav setYVideo={this.setYVideo}/>
        <Body ref={this.bodyRef} link={this.state.link}/>
        <Footer />
      </div>
    );
  }
}
