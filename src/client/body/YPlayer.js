import React, { useState, useEffect } from '../../../node_modules/react';
import ReactDOM from '../../../node_modules/react-dom';
import YouTube from '../../../node_modules/react-youtube';
import TextDisplay from './TextDisplay';
import { useTextDisplay } from './TextDisplay';

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
        onStateChange={props.route.yplayer.handleStateChange}
        onError={props.route.yplayer.handleError}
      />
      {ReactDOM.createPortal(
        <TextDisplay route={props.route}/>,
        textDisplayContainerEl
      )}
    </>
  );
}

function useYPlayer(vid) {
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
  const [seekTime, setSeekTime] = useState(0);

  const textDisplay = useTextDisplay(player);

  function seekTo(seconds) {
    player.seekTo(seconds, true);
  }

  function seekToAndLoad(newVid, seconds) {
    if (vid !== newVid) {
      setSeekTime(seconds);
      textDisplay.initiateDisplay(newVid);
    } else {
      player.seekTo(seconds, true);
    }
  };

  function handleReady(e) {
    handleStateChange(e);

    // access to player in all event handlers via event.target
    setPlayer(e.target);
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
        if (seekTime !== -1) {
          console.log('seektime');
          e.target.pauseVideo();
          e.target.seekTo(seekTime, true);
          e.target.unMute();
          setSeekTime(-1);
        }
        break;
      case 2: // pause
        console.log('pause');
        break;
      case 3: //  buffering
        console.log('buffering');
        if (seekTime !== -1) {
          function buffer(time) {
            if (e.target.getVideoLoadedFraction() < 0.2) {
              setTimeout(buffer.bind(null, time),120);
            } else {
              console.log('buffering completed');
              e.target.seekTo(time, true);
            }
          }
          setTimeout(buffer.bind(null, seekTime),120);
        }
        break;
      case 5: // CUED
        console.log('cued');
        e.target.mute();
        e.target.seekTo(seekTime, true);
        break;
    }
  };

  return {
    opts,
    player,
    textDisplay,

    setSeekTime,

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