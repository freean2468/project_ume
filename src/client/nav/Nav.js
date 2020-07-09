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

    this.centerRef = React.createRef();

    this.setChannel = this.setChannel.bind(this);
    this.toHome = this.toHome.bind(this);
    this.setYVideo = props.setYVideo.bind(this);
  }

  toHome() {
    this.centerRef.current.setSearch('');
  }

  setChannel(o) {
    this.setState({ channel:o });
  }

  render() {
    return (
      <>
        <div className="NavContainer">
          <div className="Nav">
            <NavLeft setYVideo={this.setYVideo} setChannel={this.setChannel} toHome={this.toHome}/>
            <NavCenter setChannel={this.setChannel} ref={this.centerRef}/>
            <NavRight/>
            <div className="Dp03"></div>
          </div>
          {this.state.channel &&
            <Channel setYVideo={this.setYVideo} channel={this.state.channel}/>
          }
        </div>
      </>
    );
  }
}
