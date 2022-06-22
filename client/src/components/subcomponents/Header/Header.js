import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useTranslation } from "react-i18next";
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import moment from 'moment';

import './styles.scss';
import { LANG } from "../../../constants/actionTypes";
import { addVisitor } from "../../../actions/visitor";

const Header = () => {
    const { t, i18n } = useTranslation();
    const [visitor, setVisitor] = useState(JSON.parse(localStorage.getItem('visitor')));
    const dispatch = useDispatch();
    const location = useLocation();

    const {lang} = useSelector((state) => state.global);
    useEffect(()=>{
        if(lang){
            i18n.changeLanguage(lang);
        }else{
            i18n.changeLanguage('ru');
        }
    }, [lang]);

    const changeLanguage = (e) => {
        e.preventDefault();
        console.log(e.target.dataset)
        dispatch({type: LANG, lang: e.target.dataset.lang});
    };

    const saveVisitor = async () => {
        const res = await axios.get('https://geolocation-db.com/json/');
        const ip = res.data.IPv4;
        const date = new Date(new Date().setUTCHours(0,0,0,0));
        dispatch(addVisitor({ip, date}));
    }
    const compareVisitors = async (visitor) => {
        const res = await axios.get('https://geolocation-db.com/json/');
        const ip = res.data.IPv4;
        const date = new Date(new Date().setUTCHours(0,0,0,0));
    

        if(visitor.ip !== ip || new Date(visitor.data).setUTCHours(0,0,0,0) !== date){
            dispatch(addVisitor({ip, date}));
        }
    }

    useEffect(()=>{
        if(visitor && visitor.ip && visitor.date){
            compareVisitors(visitor);
        }else{
            saveVisitor();
        }
    }, [location])

    return (
        <div id="header" className="white">
            <div>
                <a className="brand" href="/">
                    <i className="logo"></i>
                </a>
                <ul id="page_titles">
                    <li className="dropdown">
                        <a className="dropbtn">
                            Направления
                        </a>
                        <ul className="dropcontent">
                            <li>
                                <a>Промышленность</a>
                            </li>
                            <li>
                                <a>Продовольствие</a>
                            </li>
                            <li>
                                <a>Торговля</a>
                            </li>
                            <li>
                                <a>Сельское хозяйство</a>
                            </li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropbtn">
                            Услуги
                        </a>
                        <ul className="dropcontent">
                            <li>
                                <a>Финансы</a>
                            </li>
                            <li>
                                <a>Юриспруденция</a>
                            </li>
                            <li>
                                <a>Менеджмент</a>
                            </li>
                            <li>
                                <a>IT технологии</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="/about">
                            {t("header.pagetitles.about")}
                        </a>
                    </li>
                    <li>
                        <a>
                            {t("header.pagetitles.contacts")}
                        </a>
                    </li>
                </ul>
                <div id="language" className="dropdown">
                        <a className="dropbtn">
                            {((!lang || lang==='ru') && (<>
                                <i className="lang-ru"></i> RU
                            </>)) || (lang==='en' && (<>
                                <i className="lang-en"></i> EN
                            </>)) || (lang==='kz' && (<>
                                <i className="lang-kz"></i> ҚАЗ
                            </>))}
                        </a>
                        <ul className="dropcontent">
                            <li data-lang="en" className={lang === 'en' ? 'hidden' : ''} onClick={changeLanguage}>
                                <i className="lang-en"></i> EN
                            </li>
                            <li data-lang="ru" className={(!lang || lang === 'ru') ? 'hidden' : ''} onClick={changeLanguage}>
                                <i className="lang-ru"></i> RU
                            </li>
                            <li data-lang="kz" className={lang === 'kz' ? 'hidden' : ''} onClick={changeLanguage}>
                                <i className="lang-kz"></i> ҚАЗ
                            </li>
                        </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;