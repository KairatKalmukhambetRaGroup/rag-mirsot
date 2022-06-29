import React from "react";

import './styles.scss';

const Breadcrumb = ({ color='white'}) => {
    return (
        <div id="breadcrumb" className={`block theme-${color}`}>
            <div className="top"></div>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="breadcrumbs-content">
                        <div className="breadcrumb regular-16-16">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Breadcrumb;