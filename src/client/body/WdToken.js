import React, { useEffect, useRef } from 'react';
import './wdtoken.css';

export default function WdToken(props) {
    const ref = useRef(null);
    const tokenInfoRef = useRef(null);

    useEffect(() => {
        window.addEventListener('click', onClickOutsideHandler);
        return () => window.removeEventListener('click', onClickOutsideHandler);
    },[]);

    function onClickOutsideHandler(event) {
        if (props.textDisplay.selectedIdx === props.abIdx && !ref.current.contains(event.target)) {
            props.textDisplay.setSelectedIdx(null)
        }
    }

    return (
        <>
            <span className="WdToken" onMouseEnter={()=>props.textDisplay.setPreSelectedIdx(props.abIdx)}
                onMouseLeave={() => props.textDisplay.setPreSelectedIdx(null) }
                onClick={() => props.textDisplay.setMySelectedIdx(props.abIdx) }
                ref={ref}
            >
                {props.wd.token}
            </span>
            {ref.current !== null && ((props.textDisplay.selectedIdx === null && props.textDisplay.preSelectedIdx === props.abIdx)
            || (props.textDisplay.selectedIdx === null && props.textDisplay.preSelectedIdx === null && props.wd.autoIdx === props.abIdx)
            || (props.textDisplay.selectedIdx === props.abIdx )) && 
                <span className="WdToken Active" style={{
                    width: `${ref.current.offsetWidth}px`,
                    transform:`translateX(-${ref.current.offsetWidth*98/100}px) 
                            translateY(${ref.current.offsetHeight*20/100}px)
                            scale(1.2, 1.8)`
                }}>
                </span>
            }
            {props.wd.isSpace &&
                <span>&nbsp;</span>
            }
            {((props.textDisplay.selectedIdx === null && props.textDisplay.preSelectedIdx === props.abIdx)
            || (props.textDisplay.selectedIdx === null && props.textDisplay.preSelectedIdx === null && props.wd.autoIdx === props.abIdx)
            || (props.textDisplay.selectedIdx === props.abIdx )) &&
                <div className="TokenInfo">
                    <table>
                        <tbody>
                            {(props.wd.strt !== null) ?
                                <tr>
                                    <td>
                                        <table className="StrtInfo">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        문장구조
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        {props.wd.strt.t.split(' ').map((token, idx)=>
                                                            <table key={idx} className="StrtToken">
                                                                <tbody>
                                                                    <tr>
                                                                        <td colSpan={42}>
                                                                            {(props.wd.strt.valInfo[idx].idxS <= props.wd.idxInStc && props.wd.strt.valInfo[idx].idxE >= props.wd.idxInStc) ?
                                                                                <b>{token}</b> : <>{token}</>}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            {props.wd.dpList.map((dp, _idx)=>
                                                                                (props.wd.strt.valInfo[idx].idxS <= _idx && props.wd.strt.valInfo[idx].idxE >= _idx) &&
                                                                                <span key={_idx}>
                                                                                    {props.wd.idxInStc === _idx ? 
                                                                                    <b>{dp}</b> : <>{dp}</>}
                                                                                    {(props.wd.strt.valInfo[idx].idxS < props.wd.strt.valInfo[idx].idxE &&
                                                                                        props.wd.strt.valInfo[idx].idxE > _idx) &&
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
                                        </table>
                                    </td>
                                    <td className="Indicator">
                                        <br></br>
                                        {props.wd.strt.usg !== '' ? <div>={'>'}</div> : <div style={{opacity:0}}>={'>'}</div>}
                                        {props.wd.strt.cmt !== '' ? <div>={'>'}</div> : <div style={{opacity:0}}>={'>'}</div>}
                                    </td>
                                    <td className="CmtContainer">
                                        {props.wd.strt.usg !== '' ? <div className="Cmt">{props.wd.strt.usg}</div> : <div style={{opacity:0}}>blank</div>}
                                        {props.wd.strt.cmt !== '' ? <div className="Cmt">{props.wd.strt.cmt}</div> : <div style={{opacity:0}}>blank</div>}
                                    </td>
                                </tr>
                            :
                                <tr  style={{opacity:0}}>
                                    <td>
                                        <table className="StrtInfo">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        blank
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        {'blank'.split(' ').map((token, idx)=>
                                                            <table key={idx} className="StrtToken">
                                                                <tbody>
                                                                    <tr>
                                                                        <td colSpan={42}>
                                                                            blank
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <span>
                                                                                blank
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td className="Indicator">
                                        <br></br>
                                        blank <br></br>
                                        blank
                                    </td>
                                    <td className="CmtContainer">
                                        <div className="Cmt">blank</div>
                                        <div className="Cmt">blank</div>
                                    </td>
                                </tr>
                            }

                            <tr ref={tokenInfoRef}>
                                <td colSpan={42}>
                                    <div className="TrstInfoContainer">
                                        <table className="TrstInfo">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        본문
                                                    </td>
                                                    {
                                                        props.wd.dpList.map((dp, idx)=>
                                                            <td key={idx}>
                                                                {
                                                                    props.wd.idxInStc === idx ?
                                                                        <b>{dp}</b> : dp
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
                                                        props.wd.ltList.map((lt, idx)=>
                                                            <td key={idx}>
                                                                {
                                                                    props.wd.idxInStc === idx ?
                                                                        <b>{lt}</b> : lt
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
                                                        {props.wd.pp}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
}
