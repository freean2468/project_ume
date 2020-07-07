import React, { Component } from '../../../node_modules/react';
import WdToken from './WdToken';
import './textdisplay.css'
import UIDisplay from './UIDisplay';

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
            fontSize : 0,

            selectedIdx : null,
            preSelectedIdx : null,
            isAutomode : true
        }

        fetch('/api/getVideo?id='+this.state.id)
            .then(res => res.json())
            .then(json => this.initiateDisplay(json))

        this.seekTo = props.seekTo.bind(this);

        this.setPreSelectedIdx = this.setPreSelectedIdx.bind(this);
        this.setSelectedIdx = this.setSelectedIdx.bind(this);
        this.triggerAutomode = this.triggerAutomode.bind(this);
    }

    initiateDisplay(json) {
        this.setState({ videoInfo : json })

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

        this.setState({ scrt:scrt, cv:cvList });
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
            
            if (this.state.playingIndex !== playingIndex) {
                let scrt = this.state.scrt;
                for (let i = 0; i < scrt.length; ++i) {
                    for (let j = 0; j < scrt[i].length; ++j) {
                        scrt[i][j].autoIdx = null;
                    }
                }
                this.setState({scrt:scrt});
            }

            if (this.state.playingIndex !== playingIndex) {
                this.setState({
                    preSelectedIdx:null,
                    selectedIdx:null
                })
            }

            this.setState({
                playingIndex:playingIndex,
                fontSize:fs*this.displayRef.current.offsetWidth/1920*0.5625
            });

            // logic of displaying script info autonomously
            if (playingIndex >= 0) {
                let autoIdx = null;

                if (this.state.isAutomode) {
                    for (let i = 0; i < this.state.scrt[playingIndex].length; ++i) {
                        let wd = this.state.scrt[playingIndex][i],
                            nWd = this.state.scrt[playingIndex][i+1];

                        if (nWd === undefined) {
                            if (wd.st !== '') {
                                if (second >= wd.st) {
                                    autoIdx = i;
                                    break;
                                }
                            } else {
                                autoIdx = null;
                                break;
                            }
                        } else {
                            if (second >= wd.st && second < nWd.st) {
                                autoIdx = i;
                                break;
                            }
                        }
                    }
                }

                let scrt = this.state.scrt;

                for (let i = 0; i < this.state.scrt[playingIndex].length; ++i) {
                    scrt[playingIndex][i].autoIdx = autoIdx;
                }

                this.setState({scrt:scrt});
            }
        }
    }

    setPreSelectedIdx(idx) {
        this.setState({preSelectedIdx:idx});
    }

    setSelectedIdx(idx) {
        if (idx === this.state.selectedIdx) {
            this.setState({selectedIdx:null});
        } else {
            this.setState({selectedIdx:idx});
        }
    }

    triggerAutomode() {
        this.setState({isAutomode:!this.state.isAutomode});
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
                        this.state.scrt[this.state.playingIndex].map((wd, idx)=>
                        <WdToken key={idx} dpList={wd.dpList} pp={wd.pp} lt={wd.lt} st={wd.st}
                                ltList={wd.ltList} strt={wd.strt}
                                token={wd.token} isSpace={wd.isSpace}   
                                idxInStc={wd.idxInStc} abIdx={idx} autoIdx={wd.autoIdx} 
                                preSelectedIdx={this.state.preSelectedIdx} selectedIdx={this.state.selectedIdx}
                                setPreSelectedIdx={this.setPreSelectedIdx}
                                setSelectedIdx={this.setSelectedIdx}
                        />)
                    }
                </div>
                {this.state.videoInfo !== null &&
                    <UIDisplay c={this.state.videoInfo.c} seekTo={this.props.seekTo}
                        isAutomode={this.state.isAutomode}
                        triggerAutomode={this.triggerAutomode}
                    />
                }
            </>
        );
    }
}