import React from 'react';
import './loader.css'

function Loader() {
    return (
        <div className="Loader"/>
    );
}

function LoaderFull() {
    return (
        <div className="LoaderFull">
            <div className="OnlyCircle"/>
        </div>
    );
}

export {
    Loader as default,
    LoaderFull
}