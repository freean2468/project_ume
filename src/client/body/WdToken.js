import React, { Component } from 'react';
import './WdToken.css';

class WdToken extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isActive : false,
            width : 0
        }
        this.ref = React.createRef();
    }


    render() {
        return (
            <>
                <span className="WdToken"
                    onMouseEnter={() => this.setState({isActive:true})}
                    onMouseLeave={() => this.setState({isActive:false})}
                    ref={this.ref}
                >
                    {this.props.token}
                </span>
                {this.state.isActive && 
                    <span className="WdToken Active" style={{
                        width: `${this.ref.current.offsetWidth}px`,
                        transform:`translateX(-${this.ref.current.offsetWidth*98/100}px) scale(1.2, 2)`
                    }}>
                    </span>
                }
                &nbsp;
            </>
        );
    }
}

export default WdToken;