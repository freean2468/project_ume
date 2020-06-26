import React, { Component } from 'react';
import './showwindow.css';
import sourceList from '../../../list_source.json';

export default class Channel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let styles = { display: 'none' };

        if (this.props.indicator !== null) {
            styles = { display: 'block' }
        }
      return (
        <div className="ShowWindow" style={styles}>
            {this.props.indicator === 0 &&
                <>
                    <p>{this.props.rt} : {this.props.info.lt}</p>
                    <span className="ChannelCard" onClick={(e)=>console.log(wd)}>
                        {this.props.info.lk.map((link, idx) =>
                            <span key={idx}>
                                <img src={`https://img.youtube.com/vi/${link.link}/1.jpg`}/>
                                <div className="Source">{sourceList.source[link.source]}</div>
                                <div className="Stc">{link.stc}</div>
                            </span>
                        )}
                    </span>
                </>
            }
            {this.props.indicator === 1 &&
                <>
                    <p>{this.props.info.t} : {this.props.info.usg}</p>
                    <span className="ChannelCard" onClick={(e)=>console.log(strt)}>
                        {this.props.info.lk.map((link, idx) =>
                            <span key={idx}>
                                <img src={`https://img.youtube.com/vi/${link.link}/1.jpg`}/>
                                <div className="Source">{sourceList.source[link.source]}</div>
                                <div className="Stc">{link.stc}</div>
                            </span>
                        )}
                    </span>
                </>
            }
        </div>
      );  
    }
  }