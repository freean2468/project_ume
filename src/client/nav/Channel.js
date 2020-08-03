import React, {useEffect, Suspense, lazy} from 'react';
import './channel.css';
import Loader from '../common/Loader';

export default function Channel(props) {
    function handlerClickChunk(data) {
        props.nav.channel.beforeSetSelected(data);
    };

    function handleClickCard(data) {
        props.route.set(data.vid, data.st);
    }

    return (
        <>
            <div className="Channel" style={props.nav.channel.channelStyle()}>
                <div className="ResultsContainer">
                    <div className="Words">
                        {props.nav.channel.value ?
                            <>
                                <p>{props.nav.channel.value.rt} 단어 검색 결과({props.nav.channel.value.wd_m.length})</p>
                                {props.nav.channel.value.wd_m.map((wd, idx) =>
                                    <span className="Card" key={idx} onClick={()=>handlerClickChunk(wd)}>
                                        {wd.lt} <br></br>
                                    </span>
                                )}
                            </>
                        :
                            props.nav.channel.isLoading &&
                                <Loader/>
                        }
                    </div>
                    <div className="Usages">
                        {props.nav.channel.value ?
                            <>
                                <p>{props.nav.channel.value.rt} 용법 검색 결과({props.nav.channel.value.strt_m.length})</p>
                                {props.nav.channel.value.strt_m.map((strt, idx) =>
                                    <span className="Card" key={idx} onClick={()=>handlerClickChunk(strt)}>
                                        {strt.t} <br></br>
                                    </span>
                                )}
                            </>
                        :
                            props.nav.channel.isLoading &&
                                <Loader/>
                        }
                    </div>
                    <div className="Dp02"></div>
                </div>
            </div>
            <div className="ShowWindow" style={props.nav.channel.showWindowStyle()}>
                {props.nav.channel.list.length > 0 ?
                    props.nav.channel.list.map((data, idx) =>
                        <span className="Card" key={idx} onClick={(e)=>handleClickCard(data)}>
                            {data.isCardImageLoading ?
                                <div className="Loader"/>
                            :
                                <img src={window.URL.createObjectURL(data.ib)}/>
                            }
                            <div className="Source">{data.source}</div>
                            <div className="Stc">{data.stc}</div>
                        </span>
                    )
                :
                    props.nav.channel.isCardLoading &&
                        <Loader/>
                }
                <div className="Dp01"></div>
            </div>
        </>
    ); 
}