import React, { Component } from 'react';
import './channel.css';
import sourceList from '../../../list_source.json';

export default class Channel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            flag:null,
            data:[]
        }

        this.handleOnClickCard = this.handleOnClickCard.bind(this);
        this.handlerOnClickChunk = this.handlerOnClickChunk.bind(this);

        this.initializeData = this.initializeData.bind(this);
        
        this.setLink = props.setLink.bind(this);
    }

    initializeData() {
        this.setState({data:[]});
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

        // someday later, there will be needs to the fetch requests being limited.
        for (let i = 0; i < data.lk.length; ++i) {
            let lk = data.lk[i];

            if (i === 0) {
                this.setState({
                    flag:flag,
                    data:[]
                });
            }

            if (flag === 0) { // wd
                fetch(`/api/getWdChunkInVideo?vid=${lk.vid}&c=${lk.c}
                        &stc=${lk.stc}&wd=${lk.wd}`)
                .then(res => res.json())
                .then(res => {
                    if (res.res !== undefined) {
                        console.log('error occured : ', res.res);
                    } else {
                        res.link = lk.vid;
                        res.pos = {
                            c: lk.c,
                            stc: lk.stc,
                            wd: lk.wd
                        }

                        let buffer = toArrayBuffer(res.ib.data);
                        res.ib = new Blob([buffer], {type:"image/jpeg"});

                        let data = this.state.data;

                        data.push(res);

                        this.setState({ data:data });
                    }
                });
            } else { // strt
                fetch(`/api/getStrtChunkInVideo?vid=${lk.vid}&c=${lk.c}
                        &stc=${lk.stc}&strt=${lk.strt}`)
                .then(res => res.json())
                .then(res => {
                    if (res.res !== undefined) {
                        console.log('error occured : ', res.res);
                    } else {
                        res.link = lk.vid;
                        res.pos = {
                            c: lk.c,
                            stc: lk.stc,
                            strt: lk.strt
                        }

                        let buffer = toArrayBuffer(res.ib.data);
                        res.ib = new Blob([buffer], {type:"image/jpeg"});

                        let data = this.state.data;

                        data.push(res);

                        this.setState({ data:data });
                    }
                });
            }
        }
    }

    handleOnClickCard(e, link, st) {
        this.setLink(link, st);
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
                {this.props.channel !== null &&
                    <>
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
                    </>
                }
            </div>
            {this.props.channel !== null &&
                <div className="ShowWindow" style={showWindowStyles}>
                    {this.state.data !== [] &&
                        <>
                            {/* <p>{this.props.rt} : {this.props.data.lt}</p> */}
                            {/* <p>{this.props.data.t} : {this.props.data.usg}</p> */}
                            {this.state.data.map((data, idx) =>
                                <span className="Card" key={idx} onClick={(e)=>this.handleOnClickCard(e, data.link, data.st)}>
                                    <img src={window.URL.createObjectURL(data.ib)}/>
                                    <div className="Source">{sourceList.source[data.source]}</div>
                                    <div className="Stc">{data.stc}</div>
                                </span>
                            )}
                        </>
                    }
                    <div className="Dp01"></div>
                </div>
            }
        </>
      );  
    }
  }