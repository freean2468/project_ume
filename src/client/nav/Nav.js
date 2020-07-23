import React, { useState, useEffect } from 'react';
import './nav.css';
import NavLeft from './NavLeft'
import NavCenter from './NavCenter'
import NavRight from './NavRight'
import Channel from './Channel'

export default function Nav(props) {
  const nav = useNav();
  
  return (
    <>
      <div className="NavContainer">
        <div className="Nav">
          <NavLeft route={props.route} nav={nav}/>
          <NavCenter nav={nav}/>
          <NavRight/>
          <div className="Dp03"></div>
        </div>
        {nav.channel.value &&
          <Channel route={props.route} nav={nav} />
        }
      </div>
    </>
  );
}

function useNav() {
  const channel = useChannel();
  const search = useSearch();

  function init() {
    channel.init();
    search.init();
  };

  return {
    channel,
    search,

    init
  };
}

function useSearch() {
  const [value, setValue] = useState('');
  const [res, setRes] = useState({});
  const [selected, setSelected] = useState(null);
  const [isSearchFocus, setIsSearchFocus] = useState(false);

  function init() {
    setValue('');
    setRes({});
    setSelected(null);
    setIsSearchFocus(false);
  };

  function styleSuggestion() {
    if (isSearchFocus && value !== '') {
      return {
        display:'block'
      };
    } else {
      return {
        display:'none'
      };
    }
  };

  return {
    value,
    res,
    selected,
    isSearchFocus,

    setValue,
    setRes,
    setSelected,
    setIsSearchFocus,

    init,
    styleSuggestion
  };
}


function useChannel() {
  const [value, setValue] = useState(null);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);

  function init() {
    setValue(null);
    set(null, []);
  };

  function set(selected, list) {
    setList(list);
    setSelected(selected);
  };

  function channelStyle() {
    if (value) {
      return {
        display : 'flex'   
      };
    } else {
      return {
        display : 'none'
      };
    }
  };

  function showWindowStyle() {
    return {
      display : 'block'
    };
  }

  return {
    value,
    list,
    selected,

    setValue,
    setList,
    setSelected,

    init,
    set,
    channelStyle,
    showWindowStyle
  }
}