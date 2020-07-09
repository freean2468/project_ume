import React, { Component } from 'react';
import './channel.css';
import sourceList from '../../../list_source.json';

export default class Channel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flag:null,
            lkList:[],
            selectedChunk:null
        }

        this.handleOnClickCard = this.handleOnClickCard.bind(this);
        this.handlerOnClickChunk = this.handlerOnClickChunk.bind(this);
        
        this.setYVideo = props.setYVideo.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.channel.rt !== prevProps.channel.rt) {
            this.setState({
                flag:null,
                lkList:[],
                selectedChunk:null
            });
        }
    }

    handlerOnClickChunk(e, data, flag) {
        function toArrayBuffer(buf) {
            var ab = new ArrayBuffer(buf.length);
            var view = new Uint8Array(ab);
            for (var i = 0; i < buf.length; ++i) {
                view[i] = buf[i];
            }
            return ab;
        }

        this.setState({
            selectedChunk:data,
            flag:flag,
            lkList:[]
        });

        // someday later, there will be needs to the fetch requests being limited.
        for (let i = 0; i < data.lk.length; ++i) {
            let lk = data.lk[i];

            if (flag === 0) { // wd
                fetch(`/api/getWdChunkInVideo?vid=${encodeURIComponent(lk.vid)}&c=${lk.c}
                        &stc=${lk.stc}&wd=${lk.wd}`)
                .then(res => res.json())
                .then(res => {
                    if (res.res !== undefined) {
                        console.log('error occured : ', res.res);
                    } else {
                        res.vid = lk.vid;
                        res.pos = {
                            c: lk.c,
                            stc: lk.stc,
                            wd: lk.wd
                        }

                        let buffer = toArrayBuffer(res.ib.data);
                        res.ib = new Blob([buffer], {type:"image/jpeg"});

                        let lkList = this.state.lkList;

                        lkList.push(res);

                        if (this.state.flag === flag) {
                            // console.log('this.state.selectedChunk.lt : (' + this.state.selectedChunk.lt + ')'
                            //             + ' data.lt : (' + data.lt + ')')
                            if (this.state.selectedChunk.lt === data.lt){
                                this.setState({ lkList:lkList });
                            } else {
                                this.setState({ 
                                    lkList:[]
                                })
                            }
                        }
                    }
                });
            } else { // strt
                fetch(`/api/getStrtChunkInVideo?vid=${encodeURIComponent(lk.vid)}&c=${lk.c}
                        &stc=${lk.stc}&strt=${lk.strt}`)
                .then(res => res.json())
                .then(res => {
                    if (res.res !== undefined) {
                        console.log('error occured : ', res.res);
                    } else {
                        res.vid = lk.vid;
                        res.pos = {
                            c: lk.c,
                            stc: lk.stc,
                            strt: lk.strt
                        }

                        let buffer = toArrayBuffer(res.ib.data);
                        res.ib = new Blob([buffer], {type:"image/jpeg"});

                        let lkList = this.state.lkList;

                        lkList.push(res);

                        if (this.state.flag === flag) {
                            if (this.state.selectedChunk.t === data.t) {
                                this.setState({ lkList:lkList });
                            } else {
                                this.setState({ 
                                    lkList:[]
                                })
                            }
                        }
                    }
                });
            }
        }
    }

    handleOnClickCard(e, vid, st) {
        this.setYVideo(vid, st);
    }

    render() {
        let styles = { display: 'none' };

        if (this.props.channel !== null) {
            styles = { display: 'flex' }
        } else {
            styles = { display: 'none' }
        }

        let showWindowStyles = { display: 'none' };

        if (this.props.data !== []) {
            showWindowStyles = { display: 'block' }
        }
      return (
        <>
            <div className="Channel" style={styles}>
                <div className="ResultsContainer">
                    <div className="Words">
                        <p>{this.props.channel.rt} 단어 검색 결과({this.props.channel.wd_m.length})</p>
                        {this.props.channel.wd_m.map((wd, idx) =>
                            <span className="Card" key={idx} onClick={(e)=>this.handlerOnClickChunk(e, wd, 0)}>
                                {wd.lt} <br></br>
                            </span>
                        )}
                    </div>
                    <div className="Usages">
                        <p>{this.props.channel.rt} 용법 검색 결과({this.props.channel.strt_m.length})</p>
                        {this.props.channel.strt_m.map((strt, idx) =>
                            <span className="Card" key={idx} onClick={(e)=>this.handlerOnClickChunk(e, strt, 1)}>
                                {strt.t} <br></br>
                            </span>
                        )}
                    </div>
                    <div className="Dp02"></div>
                </div>
            </div>
            <div className="ShowWindow" style={showWindowStyles}>
                {this.state.lkList !== [] &&
                    <>
                        {/* <p>{this.props.rt} : {this.props.data.lt}</p> */}
                        {/* <p>{this.props.data.t} : {this.props.data.usg}</p> */}
                        {this.state.lkList.map((data, idx) =>
                            <span className="Card" key={idx} onClick={(e)=>this.handleOnClickCard(e, data.vid, data.st)}>
                                <img src={window.URL.createObjectURL(data.ib)}/>
                                <div className="Source">{sourceList.source[data.source]}</div>
                                <div className="Stc">{data.stc}</div>
                            </span>
                        )}
                    </>
                }
                <div className="Dp01"></div>
            </div>
        </>
      );  
    }
  }