import React, { Component } from 'react';
import './navcenter.css'
import search from '../../../public/search.svg';

function BoldedText(text, shouldBeBold) {
    const textArray = text.split(shouldBeBold);
    return (
      <span key>
        {textArray.map((item, index) => (
          <span key={index}>
            {item}
            {index !== textArray.length - 1 && (
              <b>{shouldBeBold}</b>
            )}
          </span>
        ))}
      </span>
    );
}

export default class NavCenter extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          search:'',
          searchRes:{},
          selectedRt:null,
          isSearchFocus:false
        }

        this.navCenterRef = React.createRef();
        this.searchRef = React.createRef();
        this.searchIconRef = React.createRef();
        this.suggestionRef = React.createRef();
    
        this.handleOnMouseLeaveMenu = this.handleOnMouseLeaveMenu.bind(this);
        this.handleOnClickRes = this.handleOnClickRes.bind(this);
        this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this.onClickOutsideHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onClickOutsideHandler);
    }

    onClickOutsideHandler(event) {
        if (this.searchRef.current.contains(event.target)) {
          this.setState({isSearchFocus:true});
        } else {
          this.setState({isSearchFocus:false});
        }
    }
    
    handleOnMouseLeaveMenu(e) {
        this.props.handleMouseEnter(e);
    }
    
    handleOnClickRes(e, key) {
        this.setState({
          selectedRt:key,
          search:key
        });
        fetch(`/api/search?id=${this.state.searchRes[key]}`)
          .then(res => res.json())
          .then(res => {
              this.props.setChannel(res);
          })
    }
    
    handleOnChange(value) {
        if (value === ''){
          this.setState({searchRes:{},search:''});
        }
        
        if (value !== '') {
          const filter = /^['a-zA-Z-/$/@]+$/;
    
          if (filter.test(value[0])) {
            this.setState({search: value})
    
            fetch(`/api/preSearch?search=${value}`)
              .then(res => res.json())
              .then(res => { 
                this.setState({searchRes:res}); 
              })
          } 
        }
    } 

    render() {
      let suggestionDisplay = 'none';
      if (this.state.isSearchFocus) {
        suggestionDisplay = 'block';
      }
      return (
        <div className="NavCenter" ref={this.navCenterRef}>
            <div className="SearchBar">
                <div className="SearchForm">
                    <input className="Search"
                        ref={this.searchRef}
                        value={this.state.search}
                        placeholder="english, @한글, $game_title"
                        onChange={(e) => this.handleOnChange(e.target.value)}
                    />
                    <img className="SearchIcon"
                        ref={this.searchIconRef}
                        src={search} alt="search button" 
                        onMouseEnter={this.props.handleMouseEnter}  
                    />
                </div>
                <div className="Suggestion" style={{display:suggestionDisplay}} ref={this.suggestionRef}>
                    <div className="SuggestionList">
                        {Object.keys(this.state.searchRes).map((key, idx) => 
                            <div className="SuggestionItem" key={idx} onClick={(e)=>this.handleOnClickRes(e, key)}>
                                {BoldedText(key, this.state.search)}
                            </div>)
                        }
                        {/* <div className="ResRight" 
                            style={{
                                top:`${this.props.height}px`,
                            }}
                        >
                            {this.state.res !== null &&
                            <>
                                <p>
                                    {this.state.selectedRt} 검색 결과 :
                                </p>
                                <div>
                                <p>단어({this.state.res.wd_m.length})</p>
                                {
                                    this.state.res.wd_m.map((wd, idx) =>
                                    <div className="ResRightItem" key={idx} onClick={(e)=>console.log(wd)}>
                                        <p>직역 : {wd.lt}</p>
                                        {wd.lk.map((link, idx) =>
                                        <div key={idx}>
                                            <p>&#60; {sourceList.source[link.source]} &#62;</p>
                                            <p>{link.stc}</p>
                                            <img src={`https://img.youtube.com/vi/${link.link}/1.jpg`}/>
                                        </div>
                                        )}
                                    </div>
                                    )
                                }
                                </div>
                                <div>
                                <p>용법({this.state.res.strt_m.length})</p>
                                {
                                    this.state.res.strt_m.map((strt, idx) =>
                                    <div className="ResRightItem" key={idx} onClick={(e)=>console.log(strt)}>
                                        <p>용법:{strt.t}</p>
                                        <p>{strt.usg}</p>
                                        {strt.lk.map((link, idx) =>
                                        <div key={idx}>
                                            <p>&#60; {sourceList.source[link.source]} &#62;</p>
                                            <p>{link.stc}</p>
                                            <img src={`https://img.youtube.com/vi/${link.link}/1.jpg`}/>
                                        </div>
                                        )}
                                    </div>
                                    )
                                }
                                </div>
                            </>
                            }
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
      );  
    }
  }
