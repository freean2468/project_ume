import React, { Component } from 'react';
import './navleft.css'

export default class NavLeft extends Component {
    constructor(props) {
      super(props);

      this.handleOnClick = this.handleOnClick.bind(this);
      this.setLink = props.setLink.bind(this);
      this.setChannel = props.setChannel.bind(this);
      this.toHome = props.toHome.bind(this);
    }

    handleOnClick() {
      this.toHome();
      this.setLink(null);
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