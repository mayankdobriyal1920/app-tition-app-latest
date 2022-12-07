import React from 'react';

export default function SpinnerLoader({message}){
    return(
        <div id="loading-bar-spinner" className="spinner">
            <div className="spinner-inner">
                <div className="spinner-icon"></div>
                {(message) ?
                    <div className="spinner-icon-message">{message}</div>
                    : ''
                }
            </div>
        </div>
    )
}