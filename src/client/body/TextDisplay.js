import React, { Component } from '../../../node_modules/react';
import WdToken from './WdToken';

export default class TextDisplay extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : props.id,
            videoInfo : null,
            playingIndex : -1,
            seconds : 0,
            scrt : [[]],
            width : 0
        }

        fetch('/api/getVideo?id='+this.state.id)
            .then(res => res.json())
            .then(json => this.setJson(json))

        this.displayRef = React.createRef();
    }

    setJson(json) {
        this.setState({ videoInfo : json })

        let c = json.c;

        for (let i = 0; i < c.length; ++i) {
            let scrt = c[i].t.scrt;
            scrt = scrt.split(' ');
            this.state.scrt[i] = [];
            scrt.map((word, idx)=>
                this.state.scrt[i].push(<WdToken key={idx} token={word}/>));
            // for (let j = 0; j < c[i].t.stc.length; ++j) {
            //     let stc = c[i].t.stc[j]
            //     for (let k = 0; k < stc.wd.length; ++k) {
            //         let wd = stc.wd[k]
            //         lt += '<span>' + wd.lt + '</span> '
            //     }
            //     pp += stc.pp + ' '
            // }
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
            this.setState({playingIndex:playingIndex});
            if (this.state.playingIndex >= 0) {
                this.setState({width:this.displayRef.current.offsetWidth});
            }
        }
    }

    render() {
        let fontSize = 50*this.state.width/1920*0.5625;
        return (
            <div className="TextDisplay" ref={this.displayRef} style={{fontSize:fontSize}}>
                {this.state.playingIndex >= 0 &&
                    this.state.scrt[this.state.playingIndex].map((token)=>token)} <br/>
            </div>
        );
    }
}