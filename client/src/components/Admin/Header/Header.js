import React from "react";

import './styles.scss';

const Header = () => {
    return (
        <div id="adminheader">
            <a className="brand" href="/">
                <i className="logotype"></i>
            </a>
            <div className="buttons">
                <a className="button-48px show-prototype">Показать прототип</a>
                <a className="button-48px cabinet">Личный кабинет</a>
            </div>
        </div>
    );
};

export default Header;