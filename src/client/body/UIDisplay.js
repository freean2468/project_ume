import React, { useState, useEffect } from 'react';
import './uidisplay.css'
import script from '../../../public/script.svg';
import auto from '../../../public/auto.svg';

export default function UIDisplay(props) {
    const [isActive, setIsActive] = useState(false);
    const uIDisplay = useUIDisplay(props.route);
    const [wdHover, setWdHover] = useState(null);

    function triggerIsActive() {
        setIsActive(!isActive);
        if (isActive) {
            // props.route.yplayer.player.playVideo();
        } else {
            props.route.yplayer.player.pauseVideo();
        }
    };

    function handleClickScriptIcon() {
        triggerIsActive();
    };

    function handleClickInner(e) {
        e.stopPropagation();
    };

    function handleClickWd(e, wd) {
        e.stopPropagation();
        if (wd === uIDisplay.selected) {
            uIDisplay.setSelected(null);    
        } else {
            uIDisplay.setSelected(wd);
        }
    };

    function handleClickPlay(e, st) {
        console.log('------------------handleCLickPlay------------');
        e.stopPropagation();
        props.route.yplayer.setSeekTime(st);
        props.route.yplayer.player.seekTo(st, true);
        uIDisplay.setSelected(null);
        triggerIsActive();
        props.route.yplayer.player.playVideo();
    };
    
    return (
        <div className="UIDisplay">
            <div className={isActive ? "ScriptDisplay Active" : "ScriptDisplay"}>
                <div className="Inner" onClick={handleClickInner}
                    style={{
                        paddingLeft:`${props.route.yplayer.textDisplay.displayRef.current.offsetWidth/1920*100}px`
                    }}>
                    {uIDisplay.script.map((list, idx) => 
                        <div key={idx} className="ScriptToken" 
                            style={{
                                fontSize:`${props.route.yplayer.textDisplay.fontSize*0.8}px`,
                                fontFamily:`${props.route.yplayer.textDisplay.cv.ff}`
                            }}
                        >
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <td className="Clickable" rowSpan="3" onClick={(e)=>handleClickPlay(e, list.st)}>
                                                <img src={window.URL.createObjectURL(list.ib)}
                                                    style={{
                                                        width:`${props.route.yplayer.textDisplay.displayRef.current.offsetWidth/1920*160}px`
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <div className="TrstInfoContainer">
                                                    <table className="TrstInfo">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    본문
                                                                </td>
                                                                {
                                                                    list.detail.map((wd, _idx)=>
                                                                        <td className="Token" key={_idx} 
                                                                            style={wd===wdHover ? {color:"yellow"} : {}}
                                                                            onMouseEnter={()=>setWdHover(wd)}
                                                                            onMouseLeave={()=>setWdHover(null)}
                                                                            onClick={(e)=>handleClickWd(e, wd)}>
                                                                            {
                                                                                wd === uIDisplay.selected ?
                                                                                    <b>{wd.dp}</b> : wd.dp
                                                                            }
                                                                        </td>
                                                                    )
                                                                }
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    직역
                                                                </td>
                                                                {
                                                                    list.detail.map((wd, _idx)=>
                                                                        <td className="Token" key={_idx} 
                                                                            style={wd===wdHover ? {color:"yellow"} : {}}
                                                                            onMouseEnter={()=>setWdHover(wd)}
                                                                            onMouseLeave={()=>setWdHover(null)}
                                                                            onClick={(e)=>handleClickWd(e, wd)}>
                                                                            {
                                                                                wd === uIDisplay.selected ?
                                                                                    <b>{wd.lt}</b> : wd.lt
                                                                            }
                                                                        </td>
                                                                    )
                                                                }
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    의역
                                                                </td>
                                                                <td colSpan={42}>
                                                                    {list.pp}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </thead>
                                    {list.detail.map((wd, _idx) => 
                                        uIDisplay.selected === wd &&
                                        <tbody className="TokenDetail" key={_idx} onClick={(e)=>handleClickPlay(e, wd.st)}>
                                                <tr>
                                                    <td>

                                                    </td>
                                                    <td>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <img src={window.URL.createObjectURL(uIDisplay.getIb(wd.ib))}
                                                                            style={{
                                                                                width:`${props.route.yplayer.textDisplay.displayRef.current.offsetWidth/1920*160}px`
                                                                            }}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <table className="StrtInfo">
                                                                            {wd.strt ?
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td>
                                                                                            문장구조
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td>
                                                                                            {wd.strt.t.split(' ').map((token, __idx)=>
                                                                                                <table key={__idx} className="StrtToken">
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td colSpan={42}>
                                                                                                                {(wd.strt.valInfo[__idx].idxS <= _idx && wd.strt.valInfo[__idx].idxE >= _idx) ?
                                                                                                                    <b>{token}</b> : <>{token}</>}
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>
                                                                                                                {list.detail.map((_wd, ___idx)=>
                                                                                                                    (wd.strt.valInfo[__idx].idxS <= ___idx && wd.strt.valInfo[__idx].idxE >= ___idx) &&
                                                                                                                        <span key={___idx}>
                                                                                                                            {_idx === ___idx ? 
                                                                                                                            <b>{_wd.dp}</b> : <>{_wd.dp}</>}
                                                                                                                            {(wd.strt.valInfo[__idx].idxS < wd.strt.valInfo[__idx].idxE &&
                                                                                                                                wd.strt.valInfo[__idx].idxE > ___idx) &&
                                                                                                                                    <>&nbsp;</>}
                                                                                                                        </span>
                                                                                                                )}
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            )}
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                                :
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td>
                                                                                            {wd.dp}
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            }
                                                                        </table>
                                                                    </td>
                                                                    {wd.strt &&
                                                                    <>
                                                                        <td className="Indicator">
                                                                            <br></br>
                                                                            {wd.strt.usg !== '' ? <div>={'>'}</div> : <div style={{opacity:0}}>={'>'}</div>}
                                                                            {wd.strt.cmt !== '' ? <div>={'>'}</div> : <div style={{opacity:0}}>={'>'}</div>}
                                                                        </td>
                                                                        <td className="CmtContainer">
                                                                            <br></br>
                                                                            {wd.strt.usg !== '' ? <div className="Cmt">{wd.strt.usg}</div> : <div style={{opacity:0}}>blank</div>}
                                                                            {wd.strt.cmt !== '' ? <div className="Cmt">{wd.strt.cmt}</div> : <div style={{opacity:0}}>blank</div>}
                                                                        </td>
                                                                    </>
                                                                    }
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                        </tbody>
                                    )}
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="UIContainer">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                {props.route.yplayer.textDisplay.isAuto ?
                                    <img className="AutoIcon" src={auto} alt="enabling autonomous mode on/off"
                                        onClick={props.route.yplayer.textDisplay.triggerAutomode}
                                    ></img>
                                :
                                    <img className="AutoIcon Inactive" src={auto} alt="enabling autonomous mode on/off"
                                        onClick={props.route.yplayer.textDisplay.triggerAutomode}
                                    ></img>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img className="ScriptIcon" src={script} alt="script show button"
                                    onClick={handleClickScriptIcon}
                                ></img>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function useUIDisplay(route) {
    const [script, setScript] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        let c = route.yplayer.textDisplay.videoInfo.c;

        if (c !== null) {
            let list = [];

            for (let i = 0; i < c.length; ++i) {
                let stc = c[i].t.stc;

                for (let j = 0; j < stc.length; ++j) {
                    let pp = stc[j].pp, st = stc[j].wd[0].st, ib = stc[j].wd[0].ib, strt = stc[j].strt, wd = stc[j].wd;

                    // This logic takes heavy times
                    ib = getIb(ib.data);
                    let detail = [];

                    for (let k = 0; k < wd.length; ++k) {
                        let dp = wd[k].dp, o = {};
                        if (dp === ''){
                            dp = wd[k].ct;
                        }
                        o.dp = dp;
                        o.lt = wd[k].lt;
                        o.ib = wd[k].ib.data;
                        o.st = wd[k].st;
                        
                        if (strt !== undefined) {
                            for (let l = 0; l < strt.length; ++l) {
                                if (strt[l].from <= k && k <= strt[l].to) {
                                    o.strt = strt[l];
                                    break;
                                }
                            }
                        }
                        detail.push(o);
                    }

                    list.push({
                        pp:pp,
                        ib:ib,
                        st:st,
                        detail:detail
                    });
                }
            }

            setScript(list);
        }
    },[route.yplayer.textDisplay.videoInfo]);

    function getIb(buf) {
        let ab = new ArrayBuffer(buf.length);
        let view = new Uint8Array(ab);
        for (let i = 0; i < buf.length; ++i) {
            view[i] = buf[i];
        }
        let ib = new Blob([ab], {type:"image/jpeg"});
        return ib;
    };

    return {
        script,
        selected,

        setSelected,
        getIb
    };
}