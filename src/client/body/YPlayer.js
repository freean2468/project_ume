import React, { Component } from '../../../node_modules/react';
import ReactDOM from '../../../node_modules/react-dom';
import YouTube from '../../../node_modules/react-youtube';
import TextDisplay from './TextDisplay'
 
export default class YPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevState:null,
      state:null,
    }

    this.textDisplayRef = React.createRef();

    this.seekTo = this.seekTo.bind(this);
    this.seekToAndLoad = this.seekToAndLoad.bind(this);

    this.state = {
      textChild : <TextDisplay id={props.link.link} ref={this.textDisplayRef} seekTo={this.seekTo}/>,
      seconds : 0,
      interval : null,
      player : null
    }

    this.handleOnPause = this.handleOnPause.bind(this);
    this.handleOnPlay = this.handleOnPlay.bind(this);
    this.handleOnReady = this.handleOnReady.bind(this);
    this.handleOnStateChange = this.handleOnStateChange.bind(this);

    this.textDisplayContainerEl = document.createElement("div");
    this.textDisplayContainerEl.setAttribute('class', 'TextDisplayContainer');
  }

  componentDidMount = () => {
    const container = document.getElementsByClassName(this.props.container)[0];
    container.appendChild(this.textDisplayContainerEl);
  };
  
  componentWillUnmount = () => {
    const container = document.getElementsByClassName(this.props.container)[0];
    container.removeChild(this.textDisplayContainerEl);
    clearInterval(this.state.interval);
  };

  setSeconds(target) {
    let ct = target.getCurrentTime()

    console.log('playing : ', ct);
    this.setState({seconds : ct})
    this.textDisplayRef.current.updateSeconds(ct);
  }

  handleOnPlay(e) {
    // this.setState({interval : setInterval(() => {
    //   this.setSeconds(e)
    // }, 100)});
  }

  handleOnPause(e) {
    // clearInterval(this.state.interval);
  }

  handleOnStateChange(e) {
    const state = e.target.getPlayerState();
    this.setState({ prevState:this.state.state, state:state });

    switch (state) {
      case -1:  // doesn't begin
        // console.log('-1'); 
        break;
      case 0: // ended
        // console.log('0');
        break;
      case 1: // playing
        // console.log('1');
        break;
      case 2: // pause
        // console.log('2');
        break;
      case 3: //  buffering
        // console.log('3'); 
        break;
      case 5: // video signal
        // console.log('5');
        break;
    }
  }

  seekTo(seconds) {
    this.state.player.seekTo(seconds, true);
  }

  seekToAndLoad(seconds) {
    const that = this;
    this.state.player.seekTo(seconds, true);
    this.state.player.playVideo();
    this.state.player.mute();
    setTimeout(function (){
      console.log('hi')
      that.state.player.pauseVideo();
      that.state.player.unMute();
    }, 100);
  }

  render() {
    const opts = {
      height: '1080',
      width: '1920',
      playerVars: {
        autoplay: 0,
        rel: 0,
        fs:0,
        controls:1,
        modestbranding:1
      },
    };

    return (
      <>
        <YouTube containerClassName={this.props.container} 
          className={this.props.class} 
          videoId={this.props.link.link} 
          opts={opts} 
          onPause={this.handleOnPause} 
          onPlay={this.handleOnPlay}
          onReady={this.handleOnReady}
          onStateChange={this.handleOnStateChange}
        />
        {ReactDOM.createPortal(
          this.state.textChild,
          this.textDisplayContainerEl
        )}
      </>
    );
  }
 
  handleOnReady(event) {
    event.target.playVideo();
    event.target.seekTo(this.props.link.st, true);
    event.target.mute();
    setTimeout(function (){
      event.target.pauseVideo();
      event.target.unMute();
    }, 400);

    this.setState({interval : setInterval(() => {
      this.setSeconds(event.target)
    }, 100)});

    // access to player in all event handlers via event.target
    this.setState({player:event.target});
  }
}