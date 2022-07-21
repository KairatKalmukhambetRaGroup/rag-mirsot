import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';
import {useLocation} from 'react-router-dom';

import './styles.scss';
import { LANG } from "../../../constants/actionTypes";
import { addVisitor } from "../../../actions/visitor";
import { getPages } from "../../../actions/page";

const pages = {
    directions: {ru: 'Направления', en: 'Directions', kz: 'Бағыттар'},
    services: {ru: 'Услуги', en: 'Services', kz: 'Қызметтер'},
    about: {ru: 'О нас', en: 'About us', kz: 'Біз туралы'},
    contacts: {ru: 'Контакты', en: 'Contacts', kz: 'Байланыстар'},
};

const Header = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    
    const {pages:pgs} = useSelector((state) => state.pages);
    const {lang} = useSelector((state) => state.global);
    
    const [blocks, setBlocks] = useState([]);
    const [currentBlock, setCurrentBlock] = useState({i: NaN, y: NaN, h: NaN, theme: 'dark'});
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
            if(y < currentBlock.y && currentBlock.i > 0){
                const newBlock = blocks[currentBlock.i-1];
                setCurrentBlock(newBlock);
                setTheme(newBlock.theme);
            }else if(y > currentBlock.h+currentBlock.y && currentBlock.i < blocks.length-1){
                const newBlock = blocks[currentBlock.i+1];
                setCurrentBlock(newBlock);
                setTheme(newBlock.theme);
            }
        }
    }
    window.addEventListener('scroll', handleScroll)
    useEffect(()=>{
        if(!blocks || blocks.length === 0){
            const elBlocks = document.getElementsByClassName('block');
            const newBlocks = [];

            for (let index = 0; index < elBlocks.length; index++) {
                const block = elBlocks[index];
                var h = Math.round(block.getBoundingClientRect().height);
                var y = block.offsetTop; 
                const rgb = (window.getComputedStyle(block).backgroundColor).split('(')[1].split(')')[0].replace(/ /g, '').split(',');   
                const grey = Math.round((Number(rgb[0]) + Number(rgb[1]) + Number(rgb[2]))/3); 
                const theme = (grey >= 128) ? 'dark' : 'light';
                newBlocks.push({y, h, theme, i: index});
            }
            setBlocks(newBlocks);
            y = window.scrollY + 60;

            if(newBlocks.length>0){
                for (let index = 0; index < newBlocks.length; index++) {
                    const block = newBlocks[index];
                    if(block.y <= y && (block.h+block.y) >= y){
                        setCurrentBlock(block);
                        if(theme !== block.theme){
                            setTheme(block.theme);
                        }
                        break;
                    }
                }
            }
        }
    }, [])
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
                            <li className="dropdown">
                                <a className="dropbtn">{pages.directions[lang]}</a>
                                    {pgs && pgs.map((pg, i)=>{
                                        if(pg.subpages.length > 0 && pg.name === 'directions')
                                            return ( 
                                                <ul className="dropcontent" key={i}>
                                                    {pg.subpages.map((subpage, j) => (
                                                        <li key={`${j}`}>
                                                            <a href={`/${pg.name}/${subpage.name}`}>{subpage.title[lang]}</a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )
                                        
                                    })}
                            </li>
                            <li className="dropdown">
                                <a className="dropbtn">{pages.services[lang]}</a>
                                    {pgs && pgs.map((pg, i)=>{
                                        if(pg.subpages.length > 0 && pg.name === 'services')
                                            return ( 
                                                <ul className="dropcontent" key={i}>
                                                    {pg.subpages.map((subpage, j) => (
                                                        <li key={`${j}`}>
                                                            <a href={`/${pg.name}/${subpage.name}`}>{subpage.title[lang]}</a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )
                                        
                                    })}
                            </li>
                            <li>
                                <a href='/about'>{pages.about[lang]}</a>
                            </li>
                            <li>
                                <a href='#footer'>{pages.contacts[lang]}</a>
                            </li>
                        </ul>
                        <div id="language" className="dropdown">
                                <a className="dropbtn">
                                    {((!lang || lang==='ru') && (<>
                                        <i className="lang-ru"></i>RU
                                    </>)) || (lang==='en' && (<>
                                        <i className="lang-en"></i>EN
                                    </>)) || (lang==='kz' && (<>
                                        <i className="lang-kz"></i>ҚАЗ
                                    </>))}
                                </a>
                                <ul className="dropcontent">
                                    <li data-lang="en" className={lang === 'en' ? 'hidden' : ''} onClick={changeLanguage}>
                                        <i data-lang="en" className="lang-en"></i>EN
                                    </li>
                                    <li data-lang="ru" className={(!lang || lang === 'ru') ? 'hidden' : ''} onClick={changeLanguage}>
                                        <i data-lang="ru" className="lang-ru"></i>RU
                                    </li>
                                    <li data-lang="kz" className={lang === 'kz' ? 'hidden' : ''} onClick={changeLanguage}>
                                        <i data-lang="kz" className="lang-kz"></i>ҚАЗ
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