import React, { Component } from '../../../node_modules/react';
import './scriptdisplay.css'

export default class ScriptDisplay extends Component {
    constructor(props){
        super(props);

        this.state = {
            isActive : false
        }

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
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
            <>
                <div className={classNameForScriptDisplay}
                    onMouseLeave={this.handleMouseLeave}>
                    {this.props.c.map((c, idx) =>
                        <div key={idx} className="ScriptToken"
                            onClick={()=>this.seekTo(c.st)}>
                            {c.t.scrt}
                        </div>)
                    }
                </div>
                <div className="ScriptIconContainer">
                    <img className="ScriptIcon" 
                        src="./public/script.svg" alt="script show button"
                        onMouseEnter={this.handleMouseEnter}
                    ></img>
                </div>
            </>
        );
    }
}