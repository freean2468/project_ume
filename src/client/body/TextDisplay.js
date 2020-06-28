import React, { Component } from '../../../node_modules/react';
import WdToken from './WdToken';
import './textdisplay.css'
import ScriptDisplay from './ScriptDisplay';

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
            cv : [],
            fontSize : 0
        }

        fetch('/api/getVideo?id='+this.state.id)
            .then(res => res.json())
            .then(json => this.initiateDisplay(json))

        this.seekTo = props.seekTo.bind(this);
    }

    initiateDisplay(json) {
        this.setState({ videoInfo : json })

        let c = json.c;

        for (let i = 0; i < c.length; ++i) {
            let stc = c[i].t.stc;
            let cv = c[i].cv;

            this.state.scrt[i] = [];
            this.state.cv.push(cv);
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

                    this.state.scrt[i].push(<WdToken dpList={dpList} pp={pp} lt={wd[k].lt}
                                            ltList={ltList} idx={k} strt={strtPick}
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
            let fs = 0;
            if (this.state.cv !== [] && playingIndex >= 0) {
                fs = this.state.cv[playingIndex].fs;
            }
                
            this.setState({
                playingIndex:playingIndex,
                fontSize:fs*this.displayRef.current.offsetWidth/1920*0.5625
            });
        }
    }

    render() {
        let pt=0, pl=0, pr=0, ff='';
        if (this.state.playingIndex >= 0) {
            pt = this.state.cv[this.state.playingIndex].pt;
            pl = this.state.cv[this.state.playingIndex].pl;
            pr = this.state.cv[this.state.playingIndex].pr;
            ff = this.state.cv[this.state.playingIndex].ff;
        }
        return (
            <>
                <div className="TextDisplay" ref={this.displayRef} 
                    style={{
                        fontSize:`${this.state.fontSize}px`,
                        paddingTop:`${pt}%`,
                        paddingLeft:`${pl}%`,
                        paddingRight:`${pr}%`,
                        fontFamily:`${ff}`
                    }}>
                    {this.state.playingIndex >= 0 &&
                        this.state.scrt[this.state.playingIndex].map((token)=>token)}
                </div>
                {this.state.videoInfo !== null &&
                    <ScriptDisplay c={this.state.videoInfo.c} seekTo={this.props.seekTo}></ScriptDisplay>
                }
            </>
        );
    }
}