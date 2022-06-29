import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
import {useLocation} from 'react-router-dom';

import './styles.scss';
import { LANG } from "../../../constants/actionTypes";
import { addVisitor } from "../../../actions/visitor";
import { getPages } from "../../../actions/page";

const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    
    const {pages} = useSelector((state) => state.pages);
    const {lang} = useSelector((state) => state.global);
    
    const [blocks, setBlocks] = useState([]);
    const [theme, setTheme] = useState('light');
    
    const visitor = JSON.parse(localStorage.getItem('visitor'));

    useEffect(()=>{
        if(!lang)
            dispatch({type: LANG, lang: 'ru'});
    }, [lang]);
    useEffect(()=>{dispatch(getPages())}, [dispatch]);

    // CHANGE HEADER STYLING
    const handleScroll = () => {
        const y = window.scrollY + 60;
        if(blocks.length>0){
            for (let index = 0; index < blocks.length; index++) {
                const block = blocks[index];
                if(block.y <= y && (block.h+block.y) >= y){
                    let thm = 'light'
                    if(block.grey >= 128)
                        thm = 'dark';
                    if(theme !== thm)
                        setTheme(thm);
                    break;
                }
            }
        }
    }
    window.addEventListener('scroll', handleScroll)
    useEffect(()=>{
        if(blocks.length === 0){
            const elBlocks = document.getElementsByClassName('block');
            const newBlocks = [];

            for (let index = 0; index < elBlocks.length; index++) {
                const block = elBlocks[index];
                var h = Math.round(block.getBoundingClientRect().height);
                var y = block.offsetTop; 
                const rgb = (window.getComputedStyle(block).backgroundColor).split('(')[1].split(')')[0].replace(/ /g, '').split(',');   
                const grey = Math.round((Number(rgb[0]) + Number(rgb[1]) + Number(rgb[2]))/3); 
                newBlocks.push({y, h, grey});
            }
            setBlocks(newBlocks);
        }
    }, [blocks])
    //CHANGE LANGUAGE 
    const changeLanguage = (e) => {
        e.preventDefault();
        dispatch({type: LANG, lang: e.target.dataset.lang});
    };

    // VISITOR

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
        <div id="header" className={`theme-${theme}`}>
            <div className="container">
                <div>
                    <a className="brand" href="/"><i className="logo"></i></a>
                    <div className="collapse">
                        <ul id="page_titles">
                            {pages ? pages.map((page, key)=>{
                                if(page.showOnHeader === true){
                                    if(page.subpages.length > 0) 
                                        return (
                                            <li className="dropdown" key={key}>
                                                <a className="dropbtn">{page.title[lang]}</a>
                                                <ul className="dropcontent">
                                                    {page.subpages.map((subpage, subkey) => (
                                                        <li key={`${key}-${subkey}`}>
                                                            <a href={`/${subpage.name}`}>{subpage.title[lang]}</a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        );
                                    return (
                                        <li key={key}>
                                            <a href={`/${page.name}`}>{page.title[lang]}</a>
                                        </li>
                                    )
                                }
                            }) : (
                                <>
                                    <li><div className="skeleton skeleton-text"/></li>
                                    <li><div className="skeleton skeleton-text"/></li>
                                    <li><div className="skeleton skeleton-text"/></li>                           
                                    <li><div className="skeleton skeleton-text"/></li>
                                </>
                            )}
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
                                        <i data-lang="en" className="lang-en"></i> EN
                                    </li>
                                    <li data-lang="ru" className={(!lang || lang === 'ru') ? 'hidden' : ''} onClick={changeLanguage}>
                                        <i data-lang="ru" className="lang-ru"></i> RU
                                    </li>
                                    <li data-lang="kz" className={lang === 'kz' ? 'hidden' : ''} onClick={changeLanguage}>
                                        <i data-lang="kz" className="lang-kz"></i> ҚАЗ
                                    </li>
                                </ul>
                        </div>
                    </div>
                    <div id="menu-hamburger"><i></i></div>
                </div>
            </div>
        </div>
    );
}

export default Header;