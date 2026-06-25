import React from 'react';
import './Loader.css';

const Loader = () => {
    return (
        <>
            <div className="loader">
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                <div className="base">
                    <span></span>
                    <div className="face"></div>
                </div>
            </div>
            <div className="longFazers">
                <span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
        </>
    );
};

export default Loader;