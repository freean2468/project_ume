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
          <Channel route={props.route} nav={nav} />
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
  const [isLoading, setIsLoading] = useState(false);
  const [isCardLoading, setIsCardLoading] = useState(false);

  useEffect(() => {
    function toArrayBuffer(buf) {
        var ab = new ArrayBuffer(buf.length);
        var view = new Uint8Array(ab);
        for (var i = 0; i < buf.length; ++i) {
            view[i] = buf[i];
        }
        return ab;
    };

    let _list = [...list], flag=false;

    list.map((card, idx) => {
      if (card.ib.data) {
        flag = true;
        let buffer = toArrayBuffer(card.ib.data);
        _list[idx].ib = new Blob([buffer], {type:"image/jpeg"});
        _list[idx].isCardImageLoading = false;
      }
    });

    if (flag)
      setList(_list);
  }, [list]);

  useEffect( () => {
    async function func() {
      // someday later, there will be needs to the fetch requests being limited.
      for (let i = 0; i < selected.lk.length; ++i) {
        let lk = selected.lk[i];

        if (selected.t === undefined) { // wd
          const response = await fetch(`/api/getWdChunkInVideo?vid=${encodeURIComponent(lk.vid)}&c=${lk.c}
                                          &stc=${lk.stc}&wd=${lk.wd}`);
          const json = await response.json();
          
          if (json.res !== undefined) {
            console.log('error occured : ', json.res);
          } else {
            json.vid = lk.vid;
            json.pos = {
                c: lk.c,
                stc: lk.stc,
                wd: lk.wd
            };
            json.isCardImageLoading = true;

            let lkList = [...list];

            lkList.push(json);

            setList(lkList);
          }
        } else { // strt
          const response = await fetch(`/api/getStrtChunkInVideo?vid=${encodeURIComponent(lk.vid)}&c=${lk.c}
                                          &stc=${lk.stc}&strt=${lk.strt}`);
          const json = await response.json();

          if (json.res !== undefined) {
            console.log('error occured : ', json.res);
          } else {
            json.vid = lk.vid;
            json.pos = {
                c: lk.c,
                stc: lk.stc,
                strt: lk.strt
            };
            json.isCardImageLoading = true;

            let lkList = [...list];

            lkList.push(json);

            setList(lkList);
          }
        }
      }
    };

    if (selected === null) return;
    
    func();
  }, [selected]);

  function init() {
    setValue(null);
    set(null, []);
    setIsLoading(false);
    setIsCardLoading(false);
  };

  function set(selected, list) {
    setList(list);
    setSelected(selected);
  };

  function channelStyle() {
    if (value || isLoading) {
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
    if (value || isLoading) {
      return {
        display : 'block'
      };
    } else {
      return {
        display : 'none'
      };
    }
  };

  function beforeSetSelected(data) {
    setList([]);
    if (data === selected) {
      setSelected(null);
    } else {
      setIsCardLoading(true);
      setSelected(data);
    }
  };

  return {
    value,
    list,
    selected,
    isLoading,
    isCardLoading,

    setValue,
    setList,
    setIsLoading,
    setIsCardLoading,
    beforeSetSelected,

    init,
    set,
    channelStyle,
    showWindowStyle
  }
}