import React, { Component } from '../../../node_modules/react';
import WdToken from './WdToken';
import './textdisplay.css'

export default class TextDisplay extends Component {
    constructor(props){
        super(props)

        this.displayRef = React.createRef();

        this.state = {
            id : props.id,
            videoInfo : null,
            playingIndex : -1,
            seconds : 0,
            scrt : [[]],
            fontSize : 0
        }

        fetch('/api/getVideo?id='+this.state.id)
            .then(res => res.json())
            .then(json => this.initiateDisplay(json))
    }

    initiateDisplay(json) {
        this.setState({ videoInfo : json })

        let c = json.c;

        for (let i = 0; i < c.length; ++i) {
            let stc = c[i].t.stc;
            
            this.state.scrt[i] = [];
            for (let j = 0; j < stc.length; ++j) {
                let ct = stc[j].ct,
                    pp = stc[j].pp,
                    wd = stc[j].wd,
                    wholeLength = -1;
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

                    this.state.scrt[i].push(<WdToken ct={ct} pp={pp} lt={wd[k].lt} 
                                            key={`${i}${j}${k}`} token={dp}
                                            isSpace={isSpace}/>);
                }
            }
        }
    }

    updateSeconds(second){
        this.setState({seconds : second});

        if (this.state.videoInfo !== null) {
            let c = this.state.videoInfo.c,
                playingIndex = -1;
            for (let i = 0; i < c.length; ++i) {
                if (c[i].st <= second && second <= c[i].et) {
                    playingIndex = i;
                    break;
                }
            }
            this.setState({
                playingIndex:playingIndex,
                fontSize:39.9*this.displayRef.current.offsetWidth/1920*0.5625
            });
        }
    }

    render() {
        return (
            <div className="TextDisplay" ref={this.displayRef} 
                style={{
                    fontSize:this.state.fontSize,
                }}>
                {this.state.playingIndex >= 0 &&
                    this.state.scrt[this.state.playingIndex].map((token)=>token)} <br/>
            </div>
        );
    }
}