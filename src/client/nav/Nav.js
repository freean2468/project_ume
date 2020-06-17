import React, { Component } from 'react';
import './nav.css';
import search from '../../../public/search.svg';
import Category from './Category';

class MenuButton extends Component {
  render() {
    return (
      <img className="SearchIcon"
        src={search} alt="search button" 
        onMouseEnter={this.props.handleMouseEnter}></img>
    );
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfEnWord : null
    }

    this.getListOfEnglish();
  }

  getListOfEnglish () {
    fetch('/api/getListOfEnglish')
      .then(res => res.json())
      .then(json => this.setState({listOfEnWord:json.list}))
  }

  render() {
    let visibility='hide';
    return (
      <>
        <div id="flyoutMenu" className={visibility}
          onMouseLeave={this.handleOnMouseLeaveMenu}>
        </div>
      </>
    );
  }
}

class MenuContainer extends Component {
  constructor(props, context) {
    super(props, context);
   
    this.state = {
      visible: false
    };
   
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  handleMouseEnter(e) {
    this.toggleMenu();
    e.stopPropagation();
  }
   
  toggleMenu() {
    this.setState({
        visible: !this.state.visible
    });
  }
  
  render() {
    return (
      <div className="MenuContainer">
        <MenuButton handleMouseEnter={this.handleMouseEnter}/>
        <Menu handleMouseEnter={this.handleMouseEnter}
          menuVisibility={this.state.visible}/>
      </div>
    );
  }
}

export default class Nav extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <nav className="Nav">
        <MenuContainer/>
      </nav>
    );
  }
}
