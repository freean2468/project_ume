import React, { Component } from 'react';
// import useScript from './hooks/useScript';
import './app.css';
import configs from '../configs.js'

// const YPlayer = props => {
//     useScript('https://www.youtube.com/iframe_api');

//     // create Youtube player object so that we could control it.
//     const youtubePlayer = new YT.Player('Player', {
//         width: '360',
//         height: '640',
//         videoId: 'M7lc1UVf-VE',
//         events: {
//             'onReady': ()=>console.log('YP ready'),
//             'onStateChange': ()=>console.log('YP state change'),
//             'onPlaybackQualityChange': function(){console.log('quality')},
//             'onPlaybackRateChange': function(){console.log('rate')},
//             'onError': function(e){console.log(e)}
//         },
//         host: 'https://www.youtube.com',
//         playerVars: { 
//             // 'origin':'',
//             'rel':0
//         }
//     });

//     return youtubePlayer;
// }

import YouTube from 'react-youtube';
 
export default class YPlayer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const opts = {
      height: '1080',
      width: '1920',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        origin: 'http://localhost:'+configs.port,
        rel: 0,
        fs:0
      },
    };
 
    return <YouTube containerClassName={this.props.container} className={this.props.class} videoId={this.props.id} opts={opts} onReady={this._onReady} />;
  }
 
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}