import React, { Component } from 'react';
import ShowWindow from './ShowWindow';
import './channel.css';

export default class Channel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            indicator:null,
            info:null
        }

        this.handlerOnClickCard = this.handlerOnClickCard.bind(this);
    }

    handlerOnClickCard(e, info, indicator) {
        this.setState({
            indicator:indicator,
            info:info
        });
    }

    render() {
        let styles = { display: 'none' };

        if (this.props.channel !== null) {
            styles = { display: 'flex' }
        } else {
            styles = { display: 'none' }
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
                                    <span className="ChannelCard" key={idx} onClick={(e)=>this.handlerOnClickCard(e, wd, 0)}>
                                        {wd.lt} <br></br>
                                    </span>
                                )}
                            </div>
                            <div className="Usages">
                                <p>{this.props.channel.rt} 용법 검색 결과({this.props.channel.strt_m.length})</p>
                                {this.props.channel.strt_m.map((strt, idx) =>
                                    <span className="ChannelCard" key={idx} onClick={(e)=>this.handlerOnClickCard(e, strt, 1)}>
                                        {strt.t} <br></br>
                                    </span>
                                )}
                            </div>
                        </div>
                    </>
                }
            </div>
            {this.props.channel !== null &&
                <ShowWindow indicator={this.state.indicator} rt={this.props.channel.rt} info={this.state.info} />
            }
        </>
      );  
    }
  }