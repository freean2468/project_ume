import React, { Component } from 'react';
import './nav.css';
import search from '../../../public/search.svg';

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
      search:'',
      searchRes:{},
      isActive:false,
      isResSelected:false,
      resList:[],
      isResReceived:false
    }

    this.optionRef = React.createRef();

    this.handleOnMouseLeaveMenu = this.handleOnMouseLeaveMenu.bind(this);
    this.handleOnClickRes = this.handleOnClickRes.bind(this);
  }

  handleOnMouseLeaveMenu(e) {
    this.props.handleMouseEnter(e);
  }

  handleOnClickRes(e, key) {
    this.setState({
      isResSelected:!this.state.isResSelected,
      isResReceived:false
    });
    fetch(`/api/search?id=${this.state.searchRes[key]}`)
      .then(res => res.json())
      .then(res => {
          this.setState({
            resList:res.links,
            isResReceived:true
          });
      })
  }

  handleOnChange(value) {
    let option = parseInt(this.optionRef.current.value), filter;
    if (value === ''){
      this.setState({searchRes:{}});
    }
    
    switch(option) {
      case 0: // USAGE
        filter = /^['a-zA-Z-\ ]+$/;
        if (value === '' || filter.test(value)) {
          this.setState({search: value})

          if (value !== '') {
            fetch(`/api/preSearch?option=${option}&search=${value}`)
              .then(res => res.json())
              .then(res => { this.setState({searchRes:res}); })
          }
        }
        break;
      case 1: // KOR

        break;
      case 2: // GAME

        break;
    }
  } 

  render() {
    let visibility = 'hide';
    if (this.props.menuVisibility || this.state.isActive || this.state.isResSelected)
      visibility = 'show'

    let leftWidth = '100%';
    let rightWidth = '0';
    if (this.state.isResReceived) {
      leftWidth = '25%';
      rightWidth = '75%';
    }

    return (
      <div id="flyoutMenu" className={visibility} onMouseLeave={this.handleOnMouseLeaveMenu}
        onMouseDown={(e)=>this.setState({isActive:!this.state.isActive})}
      >
        <div className="Request" 
          style={{height:`${this.props.height}px`}}
        >
          <select className="Options" defaultValue={0} ref={this.optionRef}>
            <option value={0}>영어</option>
            <option value={1}>한글</option>
            <option value={2}>게임</option>
          </select>
          { (this.optionRef.current !== null && this.optionRef.current.value == 0) &&
              <input className="Search"
                  value={this.state.search}
                  placeholder="english"
                  onChange={(e) => this.handleOnChange(e.target.value)}
              />
          }
        </div>
        <div className="Response">
          <div className="ResLeft" 
            style={{
              top:`${this.props.height}px`,
              width:`${leftWidth}`
            }}
          >
            {
              Object.keys(this.state.searchRes).map((key, idx) => 
                <div className="ResLeftItem" key={idx} onClick={(e)=>this.handleOnClickRes(e, key)}>
                  {key}
                </div>)
            }
          </div>
          <div className="ResRight" 
            style={{
              top:`${this.props.height}px`,
              left:`${leftWidth}`,
              width:`${rightWidth}`
            }}
          >
            {
              this.state.resList.map((item, idx) =>
                <div className="ResRightItem" key={idx} onClick={(e)=>console.log(item)}>
                  ct:{item.ct} lt:{item.lt}
                  <br></br>
                  <img src={`https://img.youtube.com/vi/${item.link}/0.jpg`}/>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

class MenuContainer extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      visible: false,
      height: 0
    };

    this.containerRef = React.createRef();
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  componentDidMount() {
    this.setState({height:this.containerRef.current.offsetHeight});
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
      <div className="MenuContainer" ref={this.containerRef}>
        <MenuButton handleMouseEnter={this.handleMouseEnter}/>
        <Menu handleMouseEnter={this.handleMouseEnter}
          menuVisibility={this.state.visible}
          height={this.state.height}
        />
      </div>
    );
  }
}

export default class Nav extends Component {

  render() {
    return (
      <nav className="Nav">
        <MenuContainer/>
      </nav>
    );
  }
}
