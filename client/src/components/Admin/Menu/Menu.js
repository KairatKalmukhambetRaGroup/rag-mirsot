import React from "react";
import { useNavigate } from "react-router-dom";

import "./styles.scss";
const Menu = () => {
    const navigate = useNavigate();
    const logout = (e) =>{
        e.preventDefault();
        console.log('logout')
        localStorage.clear('profile');
        navigate('/admin/login')
    }
    return (
        <div id="adminmenu">
            <ul className="subtitles">
                <li>
                    <a href="/">
                        Основное
                    </a>
                </li>
                <li>
                    <a>
                        Главная страница
                    </a>
                </li>
                <li>
                    <a>
                        Направления
                    </a>
                </li>
                <li>
                    <a>
                        Услуги
                    </a>
                </li>
                <li>
                    <a>
                        О нас
                    </a>
                </li>
                <li>
                    <a>
                        Контакты и языки
                    </a>
                </li>
                <li onClick={logout}>Выйти</li>
            </ul>
        </div>
    );
};

export default Menu;