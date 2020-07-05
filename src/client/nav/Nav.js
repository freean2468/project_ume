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
    this.setLink = props.setLink.bind(this);
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
            <NavLeft setLink={this.setLink} setChannel={this.setChannel} toHome={this.toHome}/>
            <NavCenter setChannel={this.setChannel} ref={this.centerRef}/>
            <NavRight/>
            <div className="Dp03"></div>
          </div>
          <Channel setLink={this.setLink} channel={this.state.channel}/>
        </div>
      </>
    );
  }
}
