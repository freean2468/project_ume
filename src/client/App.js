import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Nav = lazy(() => import(
  /* webpackChunkName: "nav" */
  /* webpackPrefetch: true */
  './nav/Nav'));
const Body = lazy(() => import(
  /* webpackChunkName: "body" */
  /* webpackPrefetch: true */
  './body/Body'));
const Footer = lazy(() => import(
  /* webpackChunkName: "footer" */
  /* webpackPrefetch: true */
  './footer/Footer'));

import { useYPlayer } from './body/YPlayer';
import './app.css';

export default function App () {
  const route = useRoute();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="AppContainer">
        <Nav route={route}/>
        <Body route={route}/>
        <Footer />
      </div>
    </Suspense>
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