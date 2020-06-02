import React, { Component } from '../../../node_modules/react';
import ReactDOM from '../../../node_modules/react-dom';
import YouTube from '../../../node_modules/react-youtube';
import TextDisplay from './TextDisplay'

{/* <YouTube
  videoId={string}                  // defaults -> null
  id={string}                       // defaults -> null
  className={string}                // defaults -> null
  containerClassName={string}       // defaults -> ''
  opts={obj}                        // defaults -> {}
  onReady={func}                    // defaults -> noop
  onPlay={func}                     // defaults -> noop
  onPause={func}                    // defaults -> noop
  onEnd={func}                      // defaults -> noop
  onError={func}                    // defaults -> noop
  onStateChange={func}              // defaults -> noop
  onPlaybackRateChange={func}       // defaults -> noop
  onPlaybackQualityChange={func}    // defaults -> noop

  // custom parameter
  ref={ref}
/> */}
 
export default class YPlayer extends Component {
  constructor(props) {
    super(props)

    this.textDisplayRef = React.createRef();

    this.state = {
      textChild : <TextDisplay id={props.id} ref={this.textDisplayRef}/>,
      seconds : 0,
      interval : null
    }

    this.handleOnPause = this.handleOnPause.bind(this)
    this.handleOnPlay = this.handleOnPlay.bind(this)

    this.textDisplayContainerEl = document.createElement("div")
    this.textDisplayContainerEl.setAttribute('class', 'TextDisplayContainer')
  }

  componentDidMount = () => {
    const container = document.getElementsByClassName(this.props.container)[this.props.idx];
    container.appendChild(this.textDisplayContainerEl);
  };
  
  componentWillUnmount = () => {
    const container = document.getElementsByClassName(this.props.container)[this.props.idx];
    container.removeChild(this.textDisplayContainerEl);
    clearInterval(this.state.interval);
  };

  setSeconds(e) {
    let ct = e.target.getCurrentTime()
    this.setState({seconds : ct})
    this.textDisplayRef.current.updateSeconds(ct);
  }

  handleOnPlay(e) {
    this.setState({interval : setInterval(() => {
      this.setSeconds(e)
    }, 100)});
  }

  handleOnPause(e) {
    // clearInterval(this.state.interval);
  }

  render() {
    const opts = {
      height: '1080',
      width: '1920',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        // origin: 'http://localhost:'+configs.port,
        rel: 0,
        fs:0
      },
    };

    return (
      <>
        <YouTube containerClassName={this.props.container} 
          className={this.props.class} 
          videoId={this.props.link} 
          opts={opts} 
          onPause={this.handleOnPause} 
          onPlay={this.handleOnPlay}
          ref={this.state.yplaerRef}
        />
        {ReactDOM.createPortal(
          this.state.textChild,
          this.textDisplayContainerEl
        )}
      </>
    );
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}