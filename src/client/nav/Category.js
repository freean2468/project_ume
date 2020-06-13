import React, { Component } from 'react';
import "./category.css"

export default class Category extends Component {
    constructor(props) {
        super(props);

        this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
    }

    handleOnMouseLeave(e) {
        // this.setState({isActive : false});
    }

    render() {
        let visibility = 'Category';
        if (this.props.isSelected) {
            visibility = 'Category Active';
        }
        return (
            <div className={visibility}
                onMouseLeave={this.handleOnMouseLeave}>
                test
            </div>
        );
    }
}