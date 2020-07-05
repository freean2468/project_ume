import React, { Component } from 'react';
import './showwindow.css';
import sourceList from '../../../list_source.json';

export default class ShowWindow extends Component {
    constructor(props) {
        super(props);

        this.handleOnClickCard = this.handleOnClickCard.bind(this);
        this.setLink = props.setLink.bind(this);
    }

    handleOnClickCard(e, link) {
        this.setLink(link);
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
                    {this.props.info.lk.map((link, idx) =>
                        <span className="ChannelCard" key={idx} onClick={(e)=>this.handleOnClickCard(e, link)}>
                            <img src={`https://img.youtube.com/vi/${link.link}/1.jpg`}/>
                            <div className="Source">{sourceList.source[link.source]}</div>
                            <div className="Stc">{link.stc}</div>
                        </span>
                    )}
                </>
            }
            {this.props.indicator === 1 &&
                <>
                    <p>{this.props.info.t} : {this.props.info.usg}</p>
                    {this.props.info.lk.map((link, idx) =>
                        <span className="ChannelCard" key={idx} onClick={(e)=>this.handleOnClickCard(e, link)}>
                            <img src={`https://img.youtube.com/vi/${link.link}/1.jpg`}/>
                            <div className="Source">{sourceList.source[link.source]}</div>
                            <div className="Stc">{link.stc}</div>
                        </span>
                    )}
                </>
            }
            <div className="Dp01"></div>
        </div>
      );  
    }
  }