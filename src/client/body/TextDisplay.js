import React, { useState, useEffect, useRef } from '../../../node_modules/react';
import WdToken from './WdToken';
import './textdisplay.css'
import UIDisplay from './UIDisplay';

function TextDisplay(props) {
    return (
        <>
            <div className="TextDisplay" ref={props.route.yplayer.textDisplay.displayRef} 
                style={{
                    fontSize:`${props.route.yplayer.textDisplay.fontSize}px`,
                    paddingTop:`${props.route.yplayer.textDisplay.cv.pt}%`,
                    paddingLeft:`${props.route.yplayer.textDisplay.cv.pl}%`,
                    paddingRight:`${props.route.yplayer.textDisplay.cv.pr}%`,
                    fontFamily:`${props.route.yplayer.textDisplay.cv.ff}`
                }}>
                {props.route.yplayer.textDisplay.playingIndex >= 0 &&
                    props.route.yplayer.textDisplay.scrt[props.route.yplayer.textDisplay.playingIndex].map((wd, idx)=>
                    <WdToken key={idx} wd={wd} abIdx={idx} textDisplay={props.route.yplayer.textDisplay}/>
                )}
            </div>
            {(props.route.yplayer.textDisplay.videoInfo) &&
                <UIDisplay route={props.route}/>
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

function useTextDisplay(player) {
    const displayRef = useRef(null);

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
        const interval = setInterval(() => {
            if (player) {
                setPlayingTime(player.getCurrentTime());
            }
        }, 100);
        return () => clearInterval(interval);
    },[player]);

    useEffect(() => {
        window.addEventListener('resize', update);
        update();
        return () => window.removeEventListener('resize', update);
    },[playingTime]);

    function initiateDisplay(vid) {
        fetch(`/api/getVideo?id=${encodeURIComponent(vid)}`)
        .then(res => res.json())
        .then(json => {
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

            console.log('initiating TextDisplay completed');
            setScrt(scrt);
            cv.setValue(cvList);
            setPlayingTime(playingTime-0.1);
        });
    };

    function update() {
        if (!videoInfo) return;

        let c = videoInfo.c, _playingIndex = -1;
        for (let i = 0; i < c.length; ++i) {
            if (parseFloat(c[i].st) <= playingTime && playingTime <= parseFloat(c[i].et)) {
                _playingIndex = i;
                break;
            }
        }

        let fs = 0;
        if (cv.value.length > 0 && _playingIndex >= 0) {
            fs = cv.value[_playingIndex].fs;
        }
        
        if (playingIndex !== _playingIndex) {
            let _scrt = [...scrt];
            for (let i = 0; i < _scrt.length; ++i) {
                for (let j = 0; j < _scrt[i].length; ++j) {
                    _scrt[i][j].autoIdx = null;
                }
            }
            setScrt(_scrt);
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

            let _scrt = [...scrt];

            for (let i = 0; i < _scrt[_playingIndex].length; ++i) {
                _scrt[_playingIndex][i].autoIdx = autoIdx;
            }

            setScrt(_scrt);
        }
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
        displayRef,

        videoInfo,
        playingIndex,
        scrt,
        cv,
        fontSize,
        selectedIdx,
        preSelectedIdx,
        isAuto,

        initiateDisplay,
        triggerAutomode,
        setMySelectedIdx,
        setPreSelectedIdx
    };
}

export {
    TextDisplay as default,
    useTextDisplay
};