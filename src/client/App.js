import React, { useState } from 'react';
import Nav from './nav/Nav';
import Body from './body/Body';
import { useYPlayer } from './body/YPlayer';
import Footer from './footer/Footer';
import './app.css';

export default function App () {
  const route = useRoute();

  return (
    <div className="AppContainer">
      <Nav route={route}/>
      <Body route={route}/>
      <Footer />
    </div>
  );
}

function useRoute() {
  const [vid, setVid] = useState('');
  const [link, setLink] = useState('');

  const yplayer = useYPlayer(vid);

  function init() {
    setVid('');
    setLink('');
  };

  function set(_vid, _st) {
    fetch(`/api/getLink?id=${encodeURIComponent(_vid)}`)
    .then(res => res.text())
    .then(res => {
      yplayer.seekToAndLoad(_vid, _st);
      setVid(_vid);
      setLink(res);
    });
  };

  return {
    vid,
    link,
    yplayer,

    init,
    set
  };
}