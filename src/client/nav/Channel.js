import React, {useState, useEffect} from 'react';
import './channel.css';

export default function Channel(props) {
    useEffect( () => {
        async function func() {
            function toArrayBuffer(buf) {
                var ab = new ArrayBuffer(buf.length);
                var view = new Uint8Array(ab);
                for (var i = 0; i < buf.length; ++i) {
                    view[i] = buf[i];
                }
                return ab;
            };

            // someday later, there will be needs to the fetch requests being limited.
            for (let i = 0; i < props.nav.channel.selected.lk.length; ++i) {
                let lk = props.nav.channel.selected.lk[i];

                if (props.nav.channel.selected.t === undefined) { // wd
                    const response = await fetch(`/api/getWdChunkInVideo?vid=${encodeURIComponent(lk.vid)}&c=${lk.c}
                                                    &stc=${lk.stc}&wd=${lk.wd}`);
                    const json = await response.json();
                    
                    if (json.res !== undefined) {
                        console.log('error occured : ', json.res);
                    } else {
                        json.vid = lk.vid;
                        json.pos = {
                            c: lk.c,
                            stc: lk.stc,
                            wd: lk.wd
                        }

                        let buffer = toArrayBuffer(json.ib.data);
                        json.ib = new Blob([buffer], {type:"image/jpeg"});

                        let lkList = [...props.nav.channel.list];

                        lkList.push(json);

                        props.nav.channel.setList(lkList);
                    }
                } else { // strt
                    const response = await fetch(`/api/getStrtChunkInVideo?vid=${encodeURIComponent(lk.vid)}&c=${lk.c}
                                                    &stc=${lk.stc}&strt=${lk.strt}`);
                    const json = await response.json();

                    if (json.res !== undefined) {
                        console.log('error occured : ', json.res);
                    } else {
                        json.vid = lk.vid;
                        json.pos = {
                            c: lk.c,
                            stc: lk.stc,
                            strt: lk.strt
                        }

                        let buffer = toArrayBuffer(json.ib.data);
                        json.ib = new Blob([buffer], {type:"image/jpeg"});

                        let lkList = [...props.nav.channel.list];

                        lkList.push(json);

                        props.nav.channel.setList(lkList);
                    }
                }
            }
        };

        if (props.nav.channel.selected === null) return;
        
        func();
    }, [props.nav.channel.selected]);

    function handlerClickChunk(data) {
        props.nav.channel.setList([]);
        props.nav.channel.setSelected(data);
    };

    function handleClickCard(vid, st) {
        props.route.set(vid, st);
    }

    return (
        <>
            <div className="Channel" style={props.nav.channel.channelStyle()}>
                <div className="ResultsContainer">
                    <div className="Words">
                        <p>{props.nav.channel.value.rt} 단어 검색 결과({props.nav.channel.value.wd_m.length})</p>
                        {props.nav.channel.value.wd_m.map((wd, idx) =>
                            <span className="Card" key={idx} onClick={()=>handlerClickChunk(wd)}>
                                {wd.lt} <br></br>
                            </span>
                        )}
                    </div>
                    <div className="Usages">
                        <p>{props.nav.channel.value.rt} 용법 검색 결과({props.nav.channel.value.strt_m.length})</p>
                        {props.nav.channel.value.strt_m.map((strt, idx) =>
                            <span className="Card" key={idx} onClick={()=>handlerClickChunk(strt)}>
                                {strt.t} <br></br>
                            </span>
                        )}
                    </div>
                    <div className="Dp02"></div>
                </div>
            </div>
            <div className="ShowWindow" style={props.nav.channel.showWindowStyle()}>
                {props.nav.channel.list.map((data, idx) =>
                    <span className="Card" key={idx} onClick={(e)=>handleClickCard(data.vid, data.st)}>
                        <img src={window.URL.createObjectURL(data.ib)}/>
                        <div className="Source">{data.source}</div>
                        <div className="Stc">{data.stc}</div>
                    </span>
                )}
                <div className="Dp01"></div>
            </div>
        </>
    ); 
}