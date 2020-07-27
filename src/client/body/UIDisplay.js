import React, { useState } from 'react';
import './uidisplay.css'
import script from '../../../public/script.svg';
import auto from '../../../public/auto.svg';

export default function UIDisplay(props) {
    const [isActive, setIsActive] = useState(false);

    function classUIDisplay() {
        if (isActive) {
            return "ScriptDisplay Active";
        } else {
            return "ScriptDisplay";
        }
    };

    function handleMouseLeave() {
        setIsActive(false);
    };

    function handleMouseEnter() {
        setIsActive(true);
    };
    
    return (
        <div className="UIDisplay">
            <div className={classUIDisplay()} onMouseLeave={handleMouseLeave}>
                {props.route.yplayer.textDisplay.videoInfo.c.map((c, idx) =>
                    <div key={idx}>
                        <div className="ScriptToken" onClick={()=>props.route.yplayer.seekTo(c.st)}>
                            {c.t.scrt}
                        </div>
                        <br></br>
                    </div>)
                }
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
                                    onMouseEnter={handleMouseEnter}
                                ></img>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}