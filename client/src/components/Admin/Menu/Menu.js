import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPages } from "../../../actions/page";

import "./styles.scss";

const menu = {
    main: {ru: 'Основное', en: 'General', kz: 'Негізгі'},
    home: {ru: 'Главная страница', en: 'Main page', kz: 'Басты бет'},
    directions: {ru: 'Направления', en: 'Directions', kz: 'Бағыттар'},
    services: {ru: 'Услуги', en: 'Services', kz: 'Қызметтер'},
    about: {ru: 'О нас', en: 'About us', kz: 'Біз туралы'},
    contacts: {ru: 'Контакты', en: 'Contacts', kz: 'Байланыстар'},
    logout: {ru: 'Выйти', en: 'Logout', kz: 'Шығу'}
};

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
                        {menu.main[lang]}
                    </a>
                </li>
                <li>
                    <a href="/admin/home">
                        {menu.home[lang]}
                    </a>
                </li>
                <li className="dropdown">
                    <a className="dropbtn">{menu.directions[lang]}</a>
                    {pages && pages.map((page, i)=>{
                        if(page.subpages.length > 0 && page.name === 'directions')
                            return ( 
                                <ul className="dropcontent" key={i}>
                                    {page.subpages.map((subpage, j) => (
                                        <li key={`${j}`}>
                                            <a href={`/admin/${page.name}/${subpage.name}`}>{subpage.title[lang]}</a>
                                        </li>
                                    ))}
                                </ul>
                            )
                    })}
                </li>
                <li className="dropdown">
                    <a className="dropbtn">{menu.services[lang]}</a>
                    {pages && pages.map((page, i)=>{
                        if(page.subpages.length > 0 && page.name === 'services')
                            return ( 
                                <ul className="dropcontent" key={i}>
                                    {page.subpages.map((subpage, j) => (
                                        <li key={`${j}`}>
                                            <a href={`/admin/${page.name}/${subpage.name}`}>{subpage.title[lang]}</a>
                                        </li>
                                    ))}
                                </ul>
                            )
                    })}
                </li>
                <li>
                    <a href="/admin/about">
                        {menu.about[lang]}
                    </a>
                </li>
                <li>
                    <a href="/admin/contacts">  
                        {menu.contacts[lang]}
                    </a>
                </li>
                <li onClick={logout}>{menu.logout[lang]}</li>
            </ul>
        </div>
    );
};

export default Menu;