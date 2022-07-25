import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPageByName } from "../../actions/page";
import { useLocation } from 'react-router-dom';

import ConsultationForm from "../subcomponents/Consultation/ConsultationForm";

import './styles.scss';
import { Helmet } from "react-helmet-async";

const words = {
    consult: {ru: 'Проконсультироваться', en: 'Consult', kz: 'Кеңесу'}
}

const Home = () => {
    const { page } = useSelector((state) => state.pages);
    const { lang, link } = useSelector((state) => state.global);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPageByName('home'));
    }, [dispatch]);

    const directionsRef = useRef(null);
    const servicesRef = useRef(null);

    const location = useLocation();

    useEffect(() => {
        if(location.hash){
            switch(location.hash){
                case '#directions':
                    scroll(directionsRef);
                    break;
                case '#services':
                    scroll(servicesRef);
                    break;
                default:
                    break;
            }
        }
    }, [location]);

    const scroll = (element) => {
        element.current.scrollIntoView();
    }

    return (
        <div id="home">
            <Helmet>
                <title>Rag Mirsot</title>
                <meta name="description" content={page ? page.home_subheading[lang] : ''} />
                <link rel="canonical" href="/" />
            </Helmet>
            <div className="block" id="home-heading">
                <div className="container">
                    <div className="slideshow background pos-abs w-100 h-100 ">
                        <div className="slideshow-container">
                            {page && page.images && page.images.map((img, key)=>(
                                <div className="slide" key={key}>
                                    <div className="image-container">
                                        <img src={`${link}images/${img.src}`} alt="" loading="eager" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="slideshow-dots">
                            {page && page.images && page.images.map((sub, key) => (
                                <span className="dot" key={key} ></span>
                            ))}
                        </div>
                    </div>
                    <div className="mb-7 mb-lg-12 mt-auto">
                        <div className="d-flex flex-column gap-1 mb-3">
                            <div className='bold-24-28 bold-lg-48-56 color-white w-100'>
                                {page ? page.home_heading[lang] : (<div className="skeleton skeleton-text w-70"/>)}
                            </div>
                            <div className='regular-16-20 regular-lg-24-30 color-lightgrey w-100'>
                                {page ? page.home_subheading[lang] : (<div className="skeleton skeleton-text"/>) }
                            </div>
                        </div>
                        <a href="#consulting" className='button-48 bg-oceanblue color-white regular-16-16'>
                            {words.consult[lang]}
                        </a>
                    </div>
                </div>
            </div>
            <div className="block" id="home-directions" ref={directionsRef}>
                <div className="container">
                    <div className="d-flex flex-column gap-1 mb-5">
                        <div className='semibold-24-32 semibold-lg-32-48 color-white pb-8 w-100'>
                            {page ? page.home_directions_heading[lang] : (<div className="skeleton skeleton-text w-30" />)}
                        </div>
                        <div className='regular-16-20 regular-lg-22-28 color-lightgrey w-100'>
                            {page ? page.home_directions_subheading[lang] : (
                                <>
                                <div className="skeleton skeleton-text"/>
                                    <div className="skeleton skeleton-text w-70"/>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="row-2 row-lg-4" >
                        {page ? page.directions.map((sub)=>(
                            <div className="col" key={sub._id}>
                                <div className="icon-card directions color-lightblue">
                                    <div className="d-flex">
                                        <div className="icon-cardimage">
                                            <img src={`${link}images/${sub.image}`} alt={sub.title[lang]} />
                                        </div>
                                    </div>
                                    <div className="icon-cardtitle color-lightblue">
                                        <a href={`directions/${sub.name}`}>
                                            {sub.title[lang]}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <>
                                <div className="col">
                                    <div className="icon-card directions color-lightblue">
                                        <div className="d-flex">
                                            <div className="icon-cardimage skeleton" />
                                        </div>
                                        <div className="icon-cardtitle color-darkblue semibold-24-32 w-70">
                                            <div className="skeleton skeleton-text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="icon-card directions color-lightblue">
                                        <div className="d-flex">
                                            <div className="icon-cardimage skeleton" />
                                        </div>
                                        <div className="icon-cardtitle color-darkblue semibold-24-32 w-70">
                                            <div className="skeleton skeleton-text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="icon-card directions color-lightblue">
                                        <div className="d-flex">
                                            <div className="icon-cardimage skeleton" />
                                        </div>
                                        <div className="icon-cardtitle color-darkblue semibold-24-32 w-70">
                                            <div className="skeleton skeleton-text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="icon-card directions color-lightblue">
                                        <div className="d-flex">
                                            <div className="icon-cardimage skeleton" />
                                        </div>
                                        <div className="icon-cardtitle color-darkblue semibold-24-32 w-70">
                                            <div className="skeleton skeleton-text" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )} 
                    </div>
                </div>
            </div>
            <div className="block" id="home-services" ref={servicesRef}>
                <div className="container">
                    <div className="d-flex flex-column gap-1 mb-5">
                        <div className='semibold-24-32 semibold-lg-32-48 color-black pb-8 w-100'>
                            {page ? page.home_services_heading[lang] : (<div className="skeleton skeleton-text w-30" />)}
                        </div>
                        <div className='regular-16-20 regular-lg-22-28 color-darkgrey  w-100'>
                            {page ? page.home_services_subheading[lang] : (
                                <>
                                    <div className="skeleton skeleton-text"/>
                                    <div className="skeleton skeleton-text w-70"/>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="row-2 row-lg-4">
                        {page ? page.services.map((sub)=>(
                            <div className="col" key={sub._id}>
                                <div className="icon-card services color-lightblue">
                                    <div className="d-flex">
                                        <div className="icon-cardimage">
                                            <img src={`${link}images/${sub.image}`} alt={sub.title[lang]} />
                                        </div>
                                    </div>
                                    <div className="icon-cardtitle color-darkblue">
                                        <a href={`services/${sub.name}`}>
                                            {sub.title[lang]}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <>
                                <div className="col">
                                    <div className="icon-card directions color-lightblue">
                                        <div className="d-flex">
                                            <div className="icon-cardimage skeleton" />
                                        </div>
                                        <div className="icon-cardtitle color-darkblue semibold-24-32 w-70">
                                            <div className="skeleton skeleton-text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="icon-card directions color-lightblue">
                                        <div className="d-flex">
                                            <div className="icon-cardimage skeleton" />
                                        </div>
                                        <div className="icon-cardtitle color-darkblue semibold-24-32 w-70">
                                            <div className="skeleton skeleton-text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="icon-card directions color-lightblue">
                                        <div className="d-flex">
                                            <div className="icon-cardimage skeleton" />
                                        </div>
                                        <div className="icon-cardtitle color-darkblue semibold-24-32 w-70">
                                            <div className="skeleton skeleton-text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="icon-card directions color-lightblue">
                                        <div className="d-flex">
                                            <div className="icon-cardimage skeleton" />
                                        </div>
                                        <div className="icon-cardtitle color-darkblue semibold-24-32 w-70">
                                            <div className="skeleton skeleton-text" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )} 
                    </div>
                </div>
            </div>
            <div className="block" id="consulting">
                <div className="container">
                    <div className="semibold-24-32 semibold-lg-32-48 color-darkblue">
                        Консультация
                    </div>
                    <div className="row-1 row-lg-2">
                        <div className="col">
                            <div className="symbols-visual">
                                <i></i>
                            </div>
                            <div className="text w-100">
                                <div className="mb-3 color-darkblue bold-40-48 bold-lg-48-56">
                                {page ? page.home_consulting_title[lang] : (<div className="skeleton skeleton-text w-50"/>)}
                                </div>
                                <div className='color-yellow mb-2 semibold-24-32 semibold-lg-32-48 w-100'>
                                    {page ? page.home_consulting_heading[lang] : (<div className="skeleton skeleton-text w-50"/>)}
                                </div>
                                <div className='color-darkgrey regular-16-20 regular-lg-24-30 w-100'>
                                    {page ? page.home_consulting_subheading[lang] : (
                                        <>
                                            <div className="skeleton skeleton-text"/>
                                            <div className="skeleton skeleton-text w-70"/>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <ConsultationForm size="sm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;