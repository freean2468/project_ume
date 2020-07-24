import React, { useState, useEffect, useRef } from '../../../node_modules/react';
import WdToken from './WdToken';
import './textdisplay.css'
import UIDisplay from './UIDisplay';

export default function TextDisplay(props) {
    const displayRef = useRef(null);
    const textDisplay = useTextDisplay(props.route, displayRef);

    return (
        <>
            <div className="TextDisplay" ref={displayRef} 
                style={{
                    fontSize:`${textDisplay.fontSize}px`,
                    paddingTop:`${textDisplay.cv.pt}%`,
                    paddingLeft:`${textDisplay.cv.pl}%`,
                    paddingRight:`${textDisplay.cv.pr}%`,
                    fontFamily:`${textDisplay.cv.ff}`
                }}>
                {textDisplay.playingIndex >= 0 &&
                    textDisplay.scrt[textDisplay.playingIndex].map((wd, idx)=>
                    <WdToken key={idx} wd={wd} abIdx={idx} textDisplay={textDisplay}/>
                )}
            </div>
            {(textDisplay.videoInfo) &&
                <UIDisplay route={props.route} textDisplay={textDisplay}/>
            }
        </>
    );
}

function useCv(playingIndex) {
    const [value, setValue] = useState([]);
    const [pt, setPt] = useState(0);
    const [pl, setPl] = useState(0);
    const [pr, setPr] = useState(0);
    const [ff, setFf] = useState('');

    useEffect( () => {
        if (value.length <= 0) return;
        if (playingIndex <= -1) return;

        setPt(value[playingIndex].pt);
        setPl(value[playingIndex].pl);
        setPr(value[playingIndex].pr);
        setFf(value[playingIndex].ff);
    }, [playingIndex, value]);

    return {
        value,
        pt,
        pl,
        pr,
        ff,

        setValue
    }
}

function useTextDisplay(route, displayRef) {
    const [videoInfo, setVideoInfo] = useState(null);
    const [playingIndex, setPlayingIndex] = useState(-1);
    const [scrt, setScrt] = useState([[]]);
    const cv = useCv(playingIndex);
    const [fontSize, setFontSize] = useState(0);
    const [playingTime, setPlayingTime] = useState(0);

    const [selectedIdx, setSelectedIdx] = useState(null);
    const [preSelectedIdx, setPreSelectedIdx] = useState(null);
    const [isAuto, setIsAuto] = useState(true);

    useEffect(() => {
        fetch(`/api/getVideo?id=${encodeURIComponent(route.vid)}`)
        .then(res => res.json())
        .then(json => initiateDisplay(json));
    },[route.vid]);

    useEffect(() => {
        // may there are memory leaks?
        const interval = setInterval(() => {
            if (route.yplayer.player) setPlayingTime(route.yplayer.player.getCurrentTime());
        }, 100);
        return () => clearInterval(interval);
    },[route.yplayer.player]);

    useEffect(() => {
        if (!videoInfo) return;

        let c = videoInfo.c, _playingIndex = -1;
        for (let i = 0; i < c.length; ++i) {
            if (parseFloat(c[i].st) <= playingTime && playingTime <= parseFloat(c[i].et)) {
                _playingIndex = i;
                break;
            }
        }

        let fs = 0;
        if (cv.value !== [] && _playingIndex >= 0) {
            fs = cv.value[_playingIndex].fs;
        }
        
        if (playingIndex !== _playingIndex) {
            let _scrt = scrt;
            for (let i = 0; i < _scrt.length; ++i) {
                for (let j = 0; j < _scrt[i].length; ++j) {
                    _scrt[i][j].autoIdx = null;
                }
            }
            setScrt(_scrt);
        }

        if (playingIndex !== _playingIndex) {
            setPreSelectedIdx(null);
            setSelectedIdx(null);
        }

        setPlayingIndex(_playingIndex);
        setFontSize(fs*displayRef.current.offsetWidth/1920*0.5625);

        // logic of displaying script info autonomously
        if (_playingIndex >= 0) {
            let autoIdx = null;

            if (isAuto) {
                for (let i = 0; i < scrt[_playingIndex].length; ++i) {
                    let wd = scrt[_playingIndex][i],
                        nWd = scrt[_playingIndex][i+1];

                    if (nWd === undefined) {
                        if (wd.st !== '') {
                            if (playingTime >= wd.st) {
                                autoIdx = i;
                                break;
                            }
                        } else {
                            autoIdx = null;
                            break;
                        }
                    } else {
                        if (playingTime >= wd.st && playingTime < nWd.st) {
                            autoIdx = i;
                            break;
                        }
                    }
                }
            }

            let _scrt = scrt;

            for (let i = 0; i < _scrt[_playingIndex].length; ++i) {
                _scrt[_playingIndex][i].autoIdx = autoIdx;
            }

            setScrt(_scrt);
        }
    },[playingTime]);

    function initiateDisplay(json) {
        setVideoInfo(json);

        let c = json.c, scrt = [[]], cvList = []

        for (let i = 0; i < c.length; ++i) {
            let stc = c[i].t.stc;
            let cv = c[i].cv;

            scrt[i] = [];
            cvList.push(cv);
            for (let j = 0; j < stc.length; ++j) {
                let ct = stc[j].ct,
                    pp = stc[j].pp,
                    wd = stc[j].wd,
                    strt = stc[j].strt,
                    dpList = [],
                    ltList = [],
                    wholeLength = -1;

                for (let k = 0; k < wd.length; ++k) {
                    let dp = wd[k].dp;
                    if (dp === ''){
                        dp = wd[k].ct;
                    }
                    dpList.push(dp);
                    ltList.push(wd[k].lt);
                }

                for (let k = 0; k < wd.length; ++k) {
                    let dp = wd[k].dp,
                        isSpace = true;
                    if (dp === ''){
                        dp = wd[k].ct;
                    }

                    wholeLength += dp.length;

                    if (ct[wholeLength+1] === ' ' || ct[wholeLength+1] === undefined){
                        wholeLength += 1;
                    } else {
                        isSpace = false;
                    }

                    let strtPick = null;
                    
                    if (strt !== undefined) {
                        for (let l = 0; l < strt.length; ++l) {
                            if (strt[l].from <= k && k <= strt[l].to) {
                                strtPick = strt[l];
                                break;
                            }
                        }
                    }

                    scrt[i].push({
                        dpList:dpList, 
                        pp:pp,
                        lt:wd[k].lt,
                        st:wd[k].st,
                        ltList:ltList, 
                        idxInStc:k,
                        strt:strtPick,
                        token:dp,
                        isSpace:isSpace,
                        autoIdx:null
                    });
                }
            }
        }

        setScrt(scrt);
        cv.setValue(cvList);
    };

    function triggerAutomode() {
        setIsAuto(!isAuto);
    };

    function setMySelectedIdx(idx) {
        if (idx === selectedIdx) {
            setSelectedIdx(null);
        } else {
            setSelectedIdx(idx);
        }
    }

    return {
        videoInfo,
        playingIndex,
        scrt,
        cv,
        fontSize,
        selectedIdx,
        preSelectedIdx,
        isAuto,

        triggerAutomode,
        setMySelectedIdx,
        setPreSelectedIdx
    };
}