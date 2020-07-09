import React, { Component } from 'react';
import './navleft.css'

export default class NavLeft extends Component {
    constructor(props) {
      super(props);

      this.handleOnClick = this.handleOnClick.bind(this);
      this.setYVideo = props.setYVideo.bind(this);
      this.setChannel = props.setChannel.bind(this);
      this.toHome = props.toHome.bind(this);
    }

    handleOnClick() {
      this.toHome();
      this.setYVideo(null);
      this.setChannel(null);
    }

    render() {
      return (
        <div className="NavLeft">
          <span className="Title" onClick={this.handleOnClick}>ume</span>
        </div>
      );  
    }
  }