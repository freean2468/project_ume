import React, { Component } from '../../../node_modules/react';
import './wdtoken.css';

class WdToken extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isActive : false,
            isSelected : false
        }
        this.ref = React.createRef();
        this.tokenInfoRef = React.createRef();

        this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
        this.onMouseoutOutsideHandler = this.onMouseoutOutsideHandler.bind(this);

        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
    }

    componentDidMount() {
        window.addEventListener('click', this.onClickOutsideHandler);
        window.addEventListener('mouseout', this.onMouseoutOutsideHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onClickOutsideHandler);
        window.removeEventListener('mouseout', this.onMouseoutOutsideHandler);
    }

    onMouseoutOutsideHandler(e) {
        if (this.state.isSelected && !this.ref.current.contains(e.target)) {
            this.setState({ isSelected: false});
        }
    }

    onClickOutsideHandler(event) {
        if (this.state.isSelected && !this.ref.current.contains(event.target)) {
          this.setState({ isSelected: false });
        }
    }

    onMouseEnterHandler(e) {
        this.setState({isActive:true});
    }

    render() {
        return (
            <>
                <span className="WdToken"
                    onMouseEnter={this.onMouseEnterHandler}
                    onMouseLeave={() => this.setState({isActive:false})}
                    onClick={() => this.setState({isSelected:!this.state.isSelected})}
                    ref={this.ref}
                >
                    {this.props.token}
                </span>
                {(this.state.isActive || this.state.isSelected) && 
                    <span className="WdToken Active" style={{
                        width: `${this.ref.current.offsetWidth}px`,
                        transform:`translateX(-${this.ref.current.offsetWidth*98/100}px) 
                                translateY(${this.ref.current.offsetHeight*20/100}px)
                                scale(1.2, 1.8)`
                    }}>
                    </span>
                }
                {this.props.isSpace &&
                    <span>&nbsp;</span>
                }
                {(this.state.isActive || this.state.isSelected) &&
                    <div className="TokenInfo">
                        <table>
                            <tbody>
                                {(this.props.strt !== null) ?
                                    <tr>
                                        <td>
                                            <table className="StrtInfo">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            문장구조
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {this.props.strt.t.split(' ').map((token, idx)=>
                                                                <table key={idx} className="StrtToken">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td colSpan={42}>
                                                                                {(this.props.strt.valInfo[idx].idxS <= this.props.idx && this.props.strt.valInfo[idx].idxE >= this.props.idx) ?
                                                                                    <b>{token}</b> : <>{token}</>}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                {this.props.dpList.map((dp, _idx)=>
                                                                                    (this.props.strt.valInfo[idx].idxS <= _idx && this.props.strt.valInfo[idx].idxE >= _idx) &&
                                                                                    <span key={_idx}>
                                                                                        {this.props.idx === _idx ? 
                                                                                        <b>{dp}</b> : <>{dp}</>}
                                                                                        {(this.props.strt.valInfo[idx].idxS < this.props.strt.valInfo[idx].idxE &&
                                                                                            this.props.strt.valInfo[idx].idxE > _idx) &&
                                                                                                <>&nbsp;</>}
                                                                                    </span>
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td className="Indicator">
                                            <br></br>
                                            {this.props.strt.usg !== '' ? <div>={'>'}</div> : <div style={{opacity:0}}>={'>'}</div>}
                                            {this.props.strt.cmt !== '' ? <div>={'>'}</div> : <div style={{opacity:0}}>={'>'}</div>}
                                        </td>
                                        <td className="CmtContainer">
                                            {this.props.strt.usg !== '' ? <div className="Cmt">{this.props.strt.usg}</div> : <div style={{opacity:0}}>blank</div>}
                                            {this.props.strt.cmt !== '' ? <div className="Cmt">{this.props.strt.cmt}</div> : <div style={{opacity:0}}>blank</div>}
                                        </td>
                                    </tr>
                                :
                                    <tr  style={{opacity:0}}>
                                        <td>
                                            <table className="StrtInfo">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            blank
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            {'blank'.split(' ').map((token, idx)=>
                                                                <table key={idx} className="StrtToken">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td colSpan={42}>
                                                                                blank
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                <span>
                                                                                    blank
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td className="Indicator">
                                            <br></br>
                                            blank <br></br>
                                            blank
                                        </td>
                                        <td className="CmtContainer">
                                            <div className="Cmt">blank</div>
                                            <div className="Cmt">blank</div>
                                        </td>
                                    </tr>
                                }

                                <tr ref={this.tokenInfoRef}>
                                    <td colSpan={42}>
                                        <div className="TrstInfoContainer">
                                            <table className="TrstInfo">
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