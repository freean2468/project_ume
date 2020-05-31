import React, { Component } from 'react';

export default class SliderControl extends Component {
    constructor(props) {
      super(props)
      this.state = {
        isChecked : props.checked,
        id : props.id
      };
  
      this.toggleChange = this.toggleChange.bind(this);
    }
  
    toggleChange = () => {
      this.setState({ isChecked: !this.state.isChecked });
    }
  
    render() {
      return (
        <input type="radio" id={this.state.id} checked={this.state.isChecked}
          name="slider-control" onChange={this.toggleChange}/>
      );
    }
  }