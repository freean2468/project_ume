import React from 'react';
import './navleft.css'

export default function NavLeft(props) {
  function handleClick() {
    props.route.init();
    props.nav.init();
  };

  return (
    <div className="NavLeft">
      <span className="Title" onClick={handleClick}>ume</span>
    </div>
  );  
}