import React, { useState, useRef } from 'react';
import Nav from './nav/Nav';
import Body from './body/Body';
import Footer from './footer/Footer';
import './app.css';

export default function App () {
  const route = useRoute();
  const bodyRef = useRef(null);

  return (
    <div className="AppContainer">
      <Nav route={route}/>
      {/* <Body ref={bodyRef} link={route}/> */}
      <Footer />
    </div>
  );
}

function useRoute() {
  const [vid, setVid] = useState('');
  const [link, setLink] = useState('');
  const [st, setSt] = useState(0);

  function init() {
    setVid('');
    setLink('');
    setSt(0);
  }

  function set(_vid, _st) {
    fetch(`/api/getLink?id=${encodeURIComponent(_vid)}`)
    .then(res => res.text())
    .then(res => {
      if (route.link === res) {
        bodyRef.current.yplayerRef.current.seekToAndLoad(_st);
      }
      setVid(_vid);
      setLink(res);
      setSt(_st);
    });
  };

  return {
    vid,
    link,
    st,

    init,
    set
  };
}