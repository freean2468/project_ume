import React, { Component } from '../../../node_modules/react';
import YPlayer from './YPlayer';
import './slider.css'

export default class Slider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width : 0,
            height : 0
        }
        this.ref = React.createRef();
    }

    render() {
        return (
            <figure className={'Slider img-'+this.props.idx} ref={this.ref}>
                <YPlayer id={this.props.id} link={this.props.link} idx={this.props.idx} 
                    container="iframe-container"  class="iframe"
                />
            </figure>
        );
    }
};