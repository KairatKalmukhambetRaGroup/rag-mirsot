import React from "react";
import { useSelector } from "react-redux";

import './styles.scss';

const pages = {
    home: {ru: 'Главная страница', en: 'Main page', kz: 'Басты бет'},
    directions: {ru: 'Направления', en: 'Directions', kz: 'Бағыттар'},
    services: {ru: 'Услуги', en: 'Services', kz: 'Қызметтер'},
    about: {ru: 'О нас', en: 'About us', kz: 'Біз туралы'}
};

const Footer = () => {
    const {lang} = useSelector((state) => state.global);
    return (
        <div id="footer">
            <div className="container">
                <div className="row-1 row-lg-3">
                    <div className="col">
                        <a className="brand" href="/">
                            <i className="logo"></i>
                        </a>
                        <ul className="additional-links">
                            <li>
                                <a>FAQ</a>
                            </li>
                            <li>
                                <a>Пользовательское соглашение</a>
                            </li>
                            <li>
                                <a>Политика конфиденциальности</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul className="sitemap">
                            <li> 
                                <a href='/'>
                                    {pages.home[lang]}
                                </a>
                            </li>
                            <li> 
                                <a href='/#directions'>
                                    {pages.directions[lang]}
                                </a>
                            </li>
                            <li> 
                                <a href='/#services'>
                                    {pages.services[lang]}
                                </a>
                            </li>
                            <li> 
                                <a href='/about'>
                                    {pages.about[lang]}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col">
                        <div className="d-flex flex-column flex-lg-column-reverse">
                            <div className="social_media">
                                <a className="social" href="/">
                                    <i className="whatsapp-icon"></i>
                                </a>
                                <a className="social" href="/">
                                    <i className="instagram-icon"></i>
                                </a>
                                <a className="social" href="/">
                                    <i className="facebook-icon"></i>
                                </a>
                            </div>
                            <div className="contacts">
                                <p className="regular-16-28">По всем вопросам:</p>
                                <a className="regular-22-28" href="tel:+971561938489">+971 56 193 8480</a>
                                <a className="regular-18-28" href="mailto:info@ragmirsot.org">info@ragmirsot.org</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Footer;