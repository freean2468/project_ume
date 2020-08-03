import React, { useState, useEffect } from '../../../node_modules/react';
import ReactDOM from '../../../node_modules/react-dom';
import YouTube from '../../../node_modules/react-youtube';
import TextDisplay from './TextDisplay';
import { useTextDisplay } from './TextDisplay';

function YPlayer(props) {
  const [textDisplayContainerEl, setTextDisplayContainerEl] = useState(document.createElement("div"));

  useEffect(() => {
    textDisplayContainerEl.setAttribute('class', 'TextDisplayContainer');

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
        // onStateChange={props.route.yplayer.handleStateChange}
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
  const [isBuffering, setIsBuffering] = useState(false);

  const textDisplay = useTextDisplay(player);

  // useEffect(() => {
  //   if (player !== null && seekTime !== -1) {
  //     console.log('2');
  //     player.mute();
  //     player.seekTo(seekTime, true);
  //     player.playVideo();
  //   }
  // },[player, seekTime]);

  useEffect(() => {
    if (!player) return;

    const state = player.getPlayerState();

    switch (state) {
      case -1:  // doesn't begin
        console.log('not begin'); 
        break;
      case 0: // ended
        console.log('ended');
        player.seekTo(0, true);
        player.pauseVideo();
        break;
      case 1: // playing
        console.log('playing');
        if (isBuffering && seekTime !== -1) {
          console.log('in:1');
          player.pauseVideo();
          player.seekTo(seekTime, true);
        } else if (seekTime !== -1) {
          console.log('in:2');
          player.pauseVideo();
          player.seekTo(seekTime, true);
        }
        break;
      case 2: // pause
        console.log('pause');
        if (seekTime !== -1) {
          if (isBuffering === false) {
            player.playVideo();
            setIsBuffering(true);
          } else {
            setSeekTime(-1);
            player.unMute();
            setIsBuffering(false);
          }
        }
        break;
      case 3: //  buffering
        console.log('buffering');
        player.mute();
        setIsBuffering(true);
        break;
      case 5: // CUED
        console.log('cued');
        player.mute();
        player.seekTo(seekTime, true);
        player.playVideo();
        break;
    }
  }, [player && player.getPlayerState()]);

  function seekToAndLoad(newVid, seconds) {
    console.log('----------------seekToAndLoad----------------');
    if (vid !== newVid || (player && (vid === newVid && parseFloat(seconds) === player.getCurrentTime()))) {
      setSeekTime(seconds);
      setIsBuffering(false);
      textDisplay.initiateDisplay(newVid);
    } else {
      player.seekTo(seconds, true);
    }
  };

  function handleReady(e) {
    // access to player in all event handlers via event.target
    setPlayer(e.target);
  };

  function handleError(e) {
    switch (e.data) {
      default:
        console.log('error occurred in yplayer : ', e.data);
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

    seekToAndLoad
  };
}

export {
  YPlayer as default,
  useYPlayer
};