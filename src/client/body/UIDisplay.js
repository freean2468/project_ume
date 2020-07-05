import React, { Component } from 'react';
import './uidisplay.css'
import script from '../../../public/script.svg';
import auto from '../../../public/auto.svg';

export default class UIDisplay extends Component {
    constructor(props){
        super(props);

        this.state = {
            isActive : false
        }

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);

        this.triggerAutomode = props.triggerAutomode.bind(this);
        this.seekTo = props.seekTo.bind(this);
    }

    handleMouseEnter() {
        this.setState({isActive : true});
    }

    handleMouseLeave() {
        this.setState({isActive : false});
    }

    render() {
        let classNameForScriptDisplay = "ScriptDisplay";
        if (this.state.isActive) {
            classNameForScriptDisplay = "ScriptDisplay Active"
        } else {
            classNameForScriptDisplay = "ScriptDisplay"
        }
        return (
            <div className="UIDisplay">
                <div className={classNameForScriptDisplay}
                    onMouseLeave={this.handleMouseLeave}>
                    {this.props.c.map((c, idx) =>
                        <div key={idx}>
                            <div className="ScriptToken"
                                onClick={()=>this.seekTo(c.st)}>
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
                                    {this.props.isAutomode===true ?
                                        <img className="AutoIcon" 
                                            src={auto} alt="enabling autonomous mode on/off"
                                            onClick={this.triggerAutomode}
                                        ></img>
                                    :
                                        <img className="AutoIcon Inactive" 
                                            src={auto} alt="enabling autonomous mode on/off"
                                            onClick={this.triggerAutomode}
                                        ></img>
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img className="ScriptIcon" 
                                        src={script} alt="script show button"
                                        onMouseEnter={this.handleMouseEnter}
                                    ></img>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}