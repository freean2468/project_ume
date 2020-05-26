import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import YPlayer from './YPlayer.js';

class SliderControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChecked : props.checked,
      id : props.id
    };

    this.toggleChange = this.toggleChange.bind(this);
  }

  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  render() {
    return (
      <input type="radio" id={this.state.id} checked={this.state.isChecked}
        name="slider-control" onChange={this.toggleChange}/>
    );
  }
}

export default class Body extends Component {
  constructor(props) {
    super(props)
    this.handleChecked = this.handleChecked.bind(this)
  }
  
  componentDidMount() {

  }

  handleChecked() {

  }

  render() {
    return (
      <div className="Body">
        <SliderControl id="s-1" checked={true}/>
        <SliderControl id="s-2" checked={false}/>
        <SliderControl id="s-3" checked={false}/>
        <div className="js-slider">
          <figure className="js-slider_item img-1">
            <YPlayer id="dcye5-mzluo" container="iframe-container" class="iframe"/>
          </figure>
          <figure className="js-slider_item img-2">
            <YPlayer id="dcye5-mzluo" container="iframe-container" class="iframe"/>
          </figure>
          <figure className="js-slider_item img-3">
            <div className="js-slider_img">
              <YPlayer id="dcye5-mzluo" container="iframe-container" class="iframe"/>
              {/* <img className="c-img-h-full" src={ReactImage} alt=""/>   */}
            </div>
            <figcaption className="wo-caption">
              <h3 className="wo-h3">「風流無くてなゝくせ」ほおずき</h3>
              <ul className="wo-credit">
                <li>大判 享和年間 (1801-04)</li>
                <li>米・個人蔵</li>
                <li>展示期間：1月30日 (水) ～ 2月18日 (月)</li>
              </ul>
            </figcaption>
          </figure>
          <div className="js-slider_nav">
            <label className="js-slider_nav_item s-nav-1 prev" htmlFor="s-3"></label>
            <label className="js-slider_nav_item s-nav-1 next" htmlFor="s-2"></label>
            <label className="js-slider_nav_item s-nav-2 prev" htmlFor="s-1"></label>
            <label className="js-slider_nav_item s-nav-2 next" htmlFor="s-3"></label>
            <label className="js-slider_nav_item s-nav-3 prev" htmlFor="s-2"></label>
            <label className="js-slider_nav_item s-nav-3 next" htmlFor="s-1"></label>
          </div>
          <div className="js-slider_indicator">
            <div className="js-slider-indi indi-1"></div>
            <div className="js-slider-indi indi-2"></div>
            <div className="js-slider-indi indi-3"></div>
          </div>
        </div>
      </div>
    );
  }
}
