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
                    <div className="TokenInfo">
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        본문
                                    </td>
                                    {
                                        this.props.dpList.map((dp, idx)=>
                                            <td key={idx}>
                                                {
                                                    this.props.idx === idx ?
                                                        <b>{dp}</b> : dp
                                                }
                                            </td>
                                        )
                                    }
                                </tr>
                                <tr>
                                    <td>
                                        직역
                                    </td>
                                    {
                                        this.props.ltList.map((lt, idx)=>
                                            <td key={idx}>
                                                {
                                                    this.props.idx === idx ?
                                                        <b>{lt}</b> : lt
                                                }
                                            </td>
                                        )
                                    }
                                </tr>
                                <tr>
                                    <td>
                                        의역
                                    </td>
                                    <td colSpan={42}>
                                        {this.props.pp}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
            </>
        );
    }
}

export default WdToken;