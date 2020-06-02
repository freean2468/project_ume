import React, { Component } from '../../../node_modules/react';
import './WdToken.css';

class WdToken extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isActive : false
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
                        transform:`translateX(-${this.ref.current.offsetWidth*98/100}px) scale(1.2, 1.8)`
                    }}>
                    </span>
                }
                {this.props.isSpace &&
                    <span>&nbsp;</span>
                }
                {this.state.isActive &&
                    <span className="TokenInfo" style={{

                    }}>
                        <div>
                            {this.props.ct}
                        </div>
                        <div>
                            {this.props.lt}
                        </div>
                        <div>
                            {this.props.pp}
                        </div>
                    </span>
                }
            </>
        );
    }
}

export default WdToken;