import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPages } from "../../../actions/page";

import "./styles.scss";
const Menu = () => {
    const dispatch = useDispatch();
    const {pages} = useSelector((state) => state.pages);
    const {lang} = useSelector((state) => state.global);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!pages){
            dispatch(getPages());
        }
    }, [pages]);

    
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
                    <a href="/admin">
                        Основное
                    </a>
                </li>
                <li>
                    <a href="/admin/home">
                        Главная страница
                    </a>
                </li>
                {pages ? pages.map((page, key)=>{
                    if(page.subpages.length > 0) 
                        return (
                            <li className="dropdown" key={key}>
                                <a className="dropbtn">
                                    {page.title[lang]}
                                </a>
                                <ul className="dropcontent">
                                    {page.subpages.map((subpage, subkey) => (
                                        <li key={`${key}-${subkey}`}>
                                            <a href={subpage.name}>{subpage.title[lang]}</a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    return (
                        <li key={key}>
                            <a href={page.name}>
                                {page.title[lang]}
                            </a>
                        </li>
                    )
                }) : (
                    <>
                        <li>
                            <a href="directions">
                                Направления
                            </a>
                        </li>
                        <li>
                            <a href="services">
                                Услуги
                            </a>
                        </li>
                        <li>
                            <a href="about">
                                О нас
                            </a>
                        </li>
                        <li>
                            <a href="contacts">
                                Контакты и языки
                            </a>
                        </li>
                    </>
                )}
                <li onClick={logout}>Выйти</li>
            </ul>
        </div>
    );
};

export default Menu;