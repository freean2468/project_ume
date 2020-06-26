import React, { Component } from 'react';
import './nav.css';
import NavLeft from './NavLeft'
import NavCenter from './NavCenter'
import NavRight from './NavRight'
import Channel from './Channel'

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channel:null
    };

    this.setChannel = this.setChannel.bind(this);
  }

  setChannel(o) {
    console.log(o);
    this.setState({ channel:o });
  }

  render() {
    return (
      <div className="NavContainer">
        <div className="Nav">
          <NavLeft/>
          <NavCenter setChannel={this.setChannel}/>
          <NavRight/>
        </div>
        <Channel channel={this.state.channel}/>
      </div>
    );
  }
}
