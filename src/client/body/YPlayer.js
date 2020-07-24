import React, { useState, useEffect } from '../../../node_modules/react';
import ReactDOM from '../../../node_modules/react-dom';
import YouTube from '../../../node_modules/react-youtube';
import TextDisplay from './TextDisplay';

function YPlayer(props) {
  const [textDisplayContainerEl, setTextDisplayContainerEl] = useState(document.createElement("div"));

  useEffect(() => {
    textDisplayContainerEl.setAttribute('class', 'TextDisplayContainer');
  }, []);

  useEffect(() => {
    const container = document.getElementsByClassName(props.container)[0];
    container.appendChild(textDisplayContainerEl);
    return () => {
      const container = document.getElementsByClassName(props.container)[0];
      container.removeChild(textDisplayContainerEl);
      setTextDisplayContainerEl(null);
    }
  }, []);

  return (
    <>
      <YouTube containerClassName={props.container} 
        className={props.class} 
        videoId={props.route.link} 
        opts={props.route.yplayer.opts} 
        // onPause={handleOnPause} 
        // onPlay={handleOnPlay}
        onReady={props.route.yplayer.handleReady}
        onStateChange={props.route.yplayer.handleOnStateChange}
        onError={props.route.yplayer.handleOnError}
      />
      {ReactDOM.createPortal(
        <TextDisplay route={props.route}/>,
        textDisplayContainerEl
      )}
    </>
  );
}

function useYPlayer(st) {
  const [opts, setOpts] = useState({
    height: '1080',
    width: '1920',
    playerVars: {
      autoplay: 0,
      rel: 0,
      fs:0,
      controls:1,
      modestbranding:1,
      iv_load_policy:3
    },
  });
  const [player, setPlayer] = useState(null);

  function seekTo(seconds) {
    player.seekTo(seconds, true);
  }

  function seekToAndLoad(seconds) {
    player.seekTo(seconds, true);
    player.playVideo();
    player.mute();
    setTimeout(function (){
      player.seekTo(seconds, true);
      player.pauseVideo();
      player.unMute();
    }, 100);
  };

  function handleReady(event) {
    event.target.playVideo();
    event.target.seekTo(st, true);
    event.target.mute();

    setTimeout(function (){
      event.target.pauseVideo();
      event.target.unMute();
    }, 400);

    // access to player in all event handlers via event.target
    setPlayer(event.target);
  };

  function handleError(e) {
    switch (e.data) {
      default:
        console.log('error occurd in yplayer : ', e.data);
        break;
    }
  };

  function handleStateChange(e) {
    const state = e.target.getPlayerState();

    switch (state) {
      case -1:  // doesn't begin
        console.log('not begin'); 
        break;
      case 0: // ended
        console.log('ended');
        break;
      case 1: // playing
        console.log('playing');
        break;
      case 2: // pause
        console.log('pause');
        break;
      case 3: //  buffering
        console.log('buffering');
        break;
      case 5: // CUED
        console.log('cued');
        break;
    }
  };

  return {
    opts,
    player,

    handleReady,
    handleError,
    handleStateChange,

    seekTo,
    seekToAndLoad
  };
}

export {
  YPlayer as default,
  useYPlayer
};