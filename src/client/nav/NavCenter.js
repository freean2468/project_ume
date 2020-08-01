import React, { useState, useEffect, useRef } from 'react';
import './navcenter.css'
import searchSvg from '../../../public/search.svg';

export default function NavCenter(props) {
  const centerRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    window.addEventListener('click', onClickOutsideHandler);
    return () => {
      window.removeEventListener('click', onClickOutsideHandler);
    };
  },[]);

  function onClickOutsideHandler(event) {
    if (searchRef.current.contains(event.target)) {
      props.nav.search.setIsSearchFocus(true);
    } else {
      props.nav.search.setIsSearchFocus(false);
    }
  };
  
  function handleClickRes(e, key) {
    props.nav.search.setSelected(key);
    props.nav.search.setValue(key);
    props.nav.channel.init();
    props.nav.channel.setIsLoading(true);

    fetch(`/api/search?id=${props.nav.search.res[key]}`)
    .then(res => res.json())
    .then(res => {
      props.nav.channel.setValue(res);
      props.nav.channel.setIsLoading(false);
    });
  };

  function handleChange(value) {
    props.nav.search.setIsSearchFocus(true);

    if (value === ''){
      props.nav.search.setRes({});
      props.nav.search.setValue('');
      props.nav.channel.setValue(null);
    } else if (value !== '') {
      const filter = /^['a-zA-Z-/$/@]+$/;

      if (filter.test(value[0])) {
        props.nav.search.setValue(value);

        fetch(`/api/preSearch?search=${value}`)
        .then(res => res.json())
        .then(res => { 
          props.nav.search.setRes(res); 
        });
      } else {
        props.nav.search.setValue("@");
      }
    }
  };

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      if (props.nav.search.res[props.nav.search.value]) {
        props.nav.search.setSelected(props.nav.search.value);
        props.nav.channel.init();
        props.nav.channel.setIsLoading(true);
        props.nav.search.setIsSearchFocus(false);

        fetch(`/api/search?id=${props.nav.search.res[props.nav.search.value]}`)
        .then(res => res.json())
        .then(res => {
          props.nav.channel.setValue(res);
          props.nav.channel.setIsLoading(false);
        });
      } else {
        props.nav.channel.init();
        props.nav.channel.setValue({
          rt:props.nav.search.value,
          wd_m:[],
          strt_m:[]
        });
      }
    }
  };

  return (
    <div className="NavCenter" ref={centerRef}>
        <div className="SearchBar">
            <div className="SearchForm">
                <input className="Search" ref={searchRef}
                    value={props.nav.search.value}
                    placeholder="english, @한글, $game_title"
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <img className="SearchIcon"
                    src={searchSvg} alt="search button" 
                    // onMouseEnter={props.handleMouseEnter}  
                />
            </div>
            <div className="Suggestion" style={props.nav.search.styleSuggestion()}>
                <div className="SuggestionList">
                    {Object.keys(props.nav.search.res).map((key, idx) => 
                        <div className="SuggestionItem" key={idx} onClick={(e)=>handleClickRes(e, key)}>
                            {BoldedText(key, props.nav.search.value)}
                        </div>)
                    }
                </div>
            </div>
        </div>
    </div>
  );  
}

function BoldedText(text, shouldBeBold) {
  const textArray = text.split(shouldBeBold);
  return (
    <span key>
      {textArray.map((item, index) => (
        <span key={index}>
          {item}
          {index !== textArray.length - 1 && (
            <b>{shouldBeBold}</b>
          )}
        </span>
      ))}
    </span>
  );
}