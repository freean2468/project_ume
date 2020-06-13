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

    let array = [];
    array.push({ title:'영어', isActive:false, isSelected:false });
    array.push({ title:'한글', isActive:false, isSelected:false });
    array.push({ title:'문장\n구조', isActive:false, isSelected:false });
    array.push({ title:'게임', isActive:false, isSelected:false });

    this.state = {
      listOfEnWord : null,
      categories : array
    }

    this.onMouseoutOutsideHandler = this.onMouseoutOutsideHandler.bind(this);
    this.handleOnMouseEnterCategory = this.handleOnMouseEnterCategory.bind(this);
    this.handleOnClickCategory = this.handleOnClickCategory.bind(this);
    this.handleOnMouseOutCategory = this.handleOnMouseOutCategory.bind(this);
    this.handleOnMouseLeaveMenu = this.handleOnMouseLeaveMenu.bind(this);

    this.getListOfEnglish();
  }

  componentDidMount() {
      window.addEventListener('mouseout', this.onMouseoutOutsideHandler);
  }

  componentWillUnmount() {
      window.removeEventListener('mouseout', this.onMouseoutOutsideHandler);
  }

  onMouseoutOutsideHandler(e) {
    // let isSelected = false;

    // for (let i = 0; i < this.state.categories.length; ++i) {
    //   if (this.state.categories[i].isSelected === true) {
    //     isSelected = true;
    //   }
    // }

    // if (this.menuRef.current.contains(e.target)) {
    //   if (isSelected === false) {
    //     console.log('menu off!')
    //     this.props.handleMouseEnter(e);
    //   } else {

    //   }
    // } else {
    //   // console.log(this.menuRef.current.contains(e.target))
    // }

    // if (this.state.isSelected && !this.ref.current.contains(e.target)) {
    //     this.setState({ isSelected: false});
    // }
  }

  getListOfEnglish () {
    fetch('/api/getListOfEnglish')
      .then(res => res.json())
      .then(json => this.setState({listOfEnWord:json.list}))
  }

  handleOnMouseLeaveMenu(e) {
    let isSelected = false;

    for (let i = 0; i < this.state.categories.length; ++i) {
      if (this.state.categories[i].isSelected === true) {
        isSelected = true;
      }
    }

    if (isSelected === false) {
      this.props.handleMouseEnter(e);
      e.stopPropagation();
    }
  }

  handleOnClickCategory(e, idx) {
    let array = this.state.categories;
    array[idx].isSelected = !array[idx].isSelected;
    this.setState({categories:array});

    switch(idx){
      case 0: // EN
        console.log('en');
        break;
      case 1: // KR
        break;
      case 2: // Strt
        break;
      case 3: // game
        break;
    }
  }

  handleOnMouseEnterCategory(e, idx) {
    this.setStateMenuInselected();
    let array = this.state.categories;
    array[idx].isActive = true;
    this.setState({categories:array});
  }

  handleOnMouseOutCategory(e, idx) {
    let array = this.state.categories;
    array[idx].isActive = false;
    this.setState({categories:array});
  }

  setStateMenuInselected() {
    let copy = this.state.categories;
    for (let i = 0; i < this.state.categories.length; ++i) {
      copy[i].isSelected = false;
    }
  }

  render() {
    var visibility = "hide";
 
    if (this.props.menuVisibility) {
      visibility = "show";
    }
 
    let classArray = ['CategoryButton','CategoryButton','CategoryButton','CategoryButton'];
    let categoryClassArray = ['Category','Category','Category','Category'];

    for (let i = 0; i < 4; i++) {
      if (this.state.categories[i].isActive) {
        classArray[i] = 'CategoryButton Active';
      }
      if (this.state.categories[i].isSelected) {
        classArray[i] = 'CategoryButton Active';
        categoryClassArray[i] = 'Category Active';
      }
    } 
    
    return (
      <>
        <div id="flyoutMenu" className={visibility}
          onMouseLeave={this.handleOnMouseLeaveMenu}>
          {this.state.categories.map((category, idx) =>
            <div key={idx} className={classArray[idx]} onClick={(e)=>this.handleOnClickCategory(e, idx)}
              onMouseEnter={(e)=>this.handleOnMouseEnterCategory(e, idx)}
              onMouseOut={(e)=>this.handleOnMouseOutCategory(e, idx)}>
              {category.title}
            </div>
          )}
        </div>
        {this.state.categories.map((category, idx) =>
          <div className={categoryClassArray[idx]} key={idx} idx={idx}>
            {(idx===0 && this.state.listOfEnWord !== null) &&
              this.state.listOfEnWord.map((word, _idx)=>
                <div key={_idx} className="List">
                  {word}
                </div>)
            }
          </div>  
        )}
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
