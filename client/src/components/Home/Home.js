import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPageByName } from "../../actions/page";
import ConsultationForm from "../subcomponents/Consultation/ConsultationForm";

import './styles.scss';

const Home = () => {
    const { page } = useSelector((state) => state.pages);
    const { lang } = useSelector((state) => state.global);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPageByName('home'));
    }, [dispatch]);

    return (
        <div id="home">
            <div className="block" id="home-heading">
                <div className="container">
                    <div className="slideshow background pos-abs w-100 h-100 ">
                        <div className="slideshow-container">
                            {page && page.images && page.images.map((img, key)=>(
                                <div className="slide" key={key}>
                                    <div className="image-container">
                                        <img src={'http://localhost:5000/images/' + img.src} />
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
                    <div className="mb-12 mt-auto">
                        <div className="d-flex flex-column gap-1 mb-3">
                            <div className={`bold-48-56 color-white ${!page && 'skeleton skeleton-text'}`}>
                                {page && page.home_heading[lang]}
                            </div>
                            <div className={`regular-24-30 color-lightgrey ${!page && 'skeleton skeleton-text'}`}>
                                {page && page.home_subheading[lang]}
                            </div>
                        </div>
                        <a href="#consulting" className="button-48 bg-oceanblue color-white regular-16-16">
                            Проконсультироваться
                        </a>
                    </div>
                </div>
            </div>
            <div className="block" id="home-directions">
                <div className="container">
                    <div className="d-flex flex-column gap-1 mb-5">
                        <div className={`semibold-32-48 color-white pb-8 ${!page && 'skeleton skeleton-text'}`}>
                            {page && page.home_directions_heading[lang]}
                        </div>
                        <div className={`regular-22-28 color-lightgrey ${!page && 'skeleton skeleton-text'}`}>
                            {page && page.home_directions_subheading[lang]}
                        </div>
                    </div>
                    <div className="row-2 row-lg-4">
                        {page && page.directions.map((sub)=>(
                            <div className="col" key={sub._id}>
                                <div className="icon-card directions color-lightblue">
                                    <div className="d-flex">
                                        <div className="icon-cardimage">
                                            <img src={`http://localhost:5000/images/${sub.image}`} />
                                        </div>
                                    </div>
                                    <div className="icon-cardtitle color-lightblue">
                                        {sub.title[lang]}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="block" id="home-services">
                <div className="container">
                    <div className="d-flex flex-column gap-1 mb-5">
                        <div className={`semibold-32-48 color-black pb-8 ${!page && 'skeleton skeleton-text'}`}>
                            {page && page.home_services_heading[lang]}
                        </div>
                        <div className={`regular-22-28 color-darkgrey ${!page && 'skeleton skeleton-text'}`}>
                            {page && page.home_services_subheading[lang]}
                        </div>
                    </div>
                    <div className="row-2 row-lg-4">
                        <div className="col">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="block" id="home-consulting">
                <div className="container">
                    <div className="semibold-32-48 color-darkblue">
                        Консультация
                    </div>
                    <div className="row-1 row-lg-2">
                        <div className="col">
                            <div className="symbols-visual">
                                <i></i>
                            </div>
                            <div className="text">
                                <div className="mb-3 color-darkblue bold-48-56">
                                    RAG Mirsot
                                </div>
                                <div className={`color-yellow mb-2 semibold-32-48 ${!page && 'skeleton skeleton-text'}`}>
                                    {page && page.home_consulting_heading[lang]}
                                </div>
                                <div className={`color-darkgrey regular-24-30 ${!page && 'skeleton skeleton-text'}`}>
                                    {page && page.home_consulting_subheading[lang]}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <ConsultationForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;