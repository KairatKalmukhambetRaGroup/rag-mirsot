import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import './styles.scss';

const pages = {
    home: {ru: 'Главная страница', en: 'Main page', kz: 'Басты бет'},
    directions: {ru: 'Направления', en: 'Directions', kz: 'Бағыттар'},
    services: {ru: 'Услуги', en: 'Services', kz: 'Қызметтер'},
    about: {ru: 'О нас', en: 'About us', kz: 'Біз туралы'}
}

const Breadcrumb = ({color='white', page=null, subpage=null}) => {
    const {lang} = useSelector((state)=>state.global);

    useEffect(()=>{
        console.log(subpage)
    },[subpage])

    return (
        <div id="breadcrumb" className={`block theme-${color}`}>
            <div className="top"></div>
            <div className="breadcrumbs">
                <div className="container">
                    <div className="breadcrumbs-content">
                        <div className="breadcrumb regular-16-16">
                            {pages.home[lang]}
                        </div>
                        {page && (
                            <>
                                <span>&nbsp;/&nbsp;</span>
                                <div className="breadcrumb regular-16-16">
                                   {pages[page][lang]}
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