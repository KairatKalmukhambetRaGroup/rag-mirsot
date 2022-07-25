import React from "react";
import { useSelector } from "react-redux";

import './styles.scss';

const pages = {
    home: {ru: 'Главная страница', en: 'Main page', kz: 'Басты бет', link: '/'},
    directions: {ru: 'Направления', en: 'Directions', kz: 'Бағыттар', link: '/#directions'},
    services: {ru: 'Услуги', en: 'Services', kz: 'Қызметтер', link: '/#services'},
    about: {ru: 'О нас', en: 'About us', kz: 'Біз туралы', link: '/about'}
}

const Breadcrumb = ({color='white', page=null, subpage=null}) => {
    const {lang} = useSelector((state)=>state.global);

    return (
        <div id="breadcrumb" className={`block theme-${color}`}>
            <div className="top"></div>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="breadcrumbs-content">
                        <div className="breadcrumb regular-16-16">
                            <a href="/">
                                {pages.home[lang]}
                            </a>
                        </div>
                        {page && (
                            <>
                                <span>&nbsp;/&nbsp;</span>
                                <div className="breadcrumb regular-16-16">
                                    <a href={pages[page].link}>
                                       {pages[page][lang]}
                                    </a>
                                </div>
                            </>
                        )}
                        {subpage && (
                            <>
                                <span>&nbsp;/&nbsp;</span>
                                <div className="breadcrumb regular-16-16">
                                    {subpage.title[lang]}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Breadcrumb;