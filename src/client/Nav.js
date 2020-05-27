import React, { Component } from 'react';
import './app.css';

class MenuButton extends Component {
  render() {
    return (
      <button className="RoundButton"
              onMouseDown={this.props.handleMouseDown}></button>
    );
  }
}

class Menu extends Component {
  render() {
    var visibility = "hide";
 
    if (this.props.menuVisibility) {
      visibility = "show";
    }
 
    return (
      <div id="flyoutMenu"
           onMouseDown={this.props.handleMouseDown} 
           className={visibility}>
        <h2><a href="#">Home</a></h2>
        <h2><a href="#">About</a></h2>
        <h2><a href="#">Contact</a></h2>
        <h2><a href="#">Search</a></h2>
      </div>
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
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  handleMouseDown(e) {
    this.toggleMenu();
 
    console.log("clicked");
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
        <MenuButton handleMouseDown={this.handleMouseDown}/>
        <Menu handleMouseDown={this.handleMouseDown}
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
