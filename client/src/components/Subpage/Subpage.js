import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPageByName, getTexts } from "../../actions/page";
import Breadcrumb from "../subcomponents/Breadcrumb/Breadcrumb";
import ConsultationForm from "../subcomponents/Consultation/ConsultationForm";

import './styles.scss';

const Subpage = ({parent}) => {
    const dispatch = useDispatch();
    const {lang} = useSelector((state)=>state.global);
    const {page, texts} = useSelector((state)=>state.pages);
    const {pagename} = useParams();

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(()=>{
        if(pagename && !page){
            dispatch(getPageByName(pagename));
            dispatch(getTexts(['home_directions_heading', 'home_directions_subheading', 'home_services_heading', 'home_services_subheading']));
        }
    },[page])

    const setSlide = (key) => {
        if(page && page.images && page.images.length > 1){
            setCurrentSlide(((page.images.length-1) + key) % (page.images.length-1));
        }
    }
    
    return (
        <div id="subpage" className={parent}>
            <Breadcrumb color="white" />
            <div className="block" id="subpage-top">
                <div className="container">
                    <div className={`icon-container mb-4 ${!page && 'skeleton'}`}>
                        {(page && page.images) && (
                            <img src={`http://localhost:5000/images/${page.images[0].src}`} />
                        )}
                    </div>
                    <div className="d-flex flex-column gap-1 mb-6">
                        <div className="semibold-32-40 color-darkblue w-30">
                            {(page && page.title) ? page.title[lang] : (<div className="skeleton skeleton-text"/>)}
                        </div>
                        <div className="description regular-24-32 color-black w-100">
                            {(page && page.description) ? page.description[lang] : (
                                <>
                                    <div className="skeleton skeleton-text"/>
                                    <div className="skeleton skeleton-text"/>
                                    <div className="skeleton skeleton-text"/>
                                    <div className="skeleton w-70 skeleton-text"/>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="carousell">
                        {(page && page.images && page.images.length > 1) ? (
                            <>
                                {page.images.slice(1).map((image, key) => (
                                    <div key={key} className={`carousel-slide ${key === currentSlide ? 'active' : ''}`} > 
                                        <img src={`http://localhost:5000/images/${image.src}`} />
                                    </div>
                                ))}
                                <span id="carousel-left" onClick={(e)=>{e.preventDefault(); setSlide(currentSlide-1)}}/>
                                <span id="carousel-right" onClick={(e)=>{e.preventDefault(); setSlide(currentSlide+1)}}/>
                                <div className="dots">
                                    {page.images.slice(1).map((image, key) => (
                                        <span className={`dot ${key===currentSlide ? 'active' : ''}`} key={key} onClick={(e)=>{e.preventDefault(); setSlide(key)}} />
                                    ))} 
                                </div>
                            </>
                        )
                        : (
                            <div className="carousel-slide skeleton"/>
                        )}

                    </div>
                </div>
            </div>

            <div className="block" id="siblings">
                <div className="container">
                    <div className="d-flex flex-column gap-1 mb-5">
                        <div className='semibold-32-48 color-darkblue pb-8'>
                            {texts ? (parent === 'directions' ? texts.home_directions_heading[lang] : texts.home_services_heading[lang]) : (<div className="skeleton skeleton-text" />)}
                        </div>
                        <div className='regular-22-28 color-darkgrey'>
                            {texts ? (parent === 'directions' ? texts.home_directions_subheading[lang] : texts.home_services_subheading[lang]) : (<div className="skeleton skeleton-text" />)}
                        </div>
                    </div>
                    <div className="row-2 row-lg-4">
                        {(page && page.siblings) ? page.siblings.map((sub)=>(
                            <div className="col" key={sub._id}>
                                <div className="icon-card color-lightblue">
                                    <div className="d-flex">
                                        <div className="icon-cardimage">
                                            <img src={`http://localhost:5000/images/${sub.image}`} />
                                        </div>
                                    </div>
                                    <div className="icon-cardtitle color-darkblue semibold-24-32">
                                        {sub.title[lang]}
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
                                        <div className="icon-cardtitle color-darkblue semibold-24-32 w-100">
                                            <div className="skeleton skeleton-text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="icon-card directions color-lightblue">
                                        <div className="d-flex">
                                            <div className="icon-cardimage skeleton" />
                                        </div>
                                        <div className="icon-cardtitle color-darkblue semibold-24-32 w-100">
                                            <div className="skeleton skeleton-text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="icon-card directions color-lightblue">
                                        <div className="d-flex">
                                            <div className="icon-cardimage skeleton" />
                                        </div>
                                        <div className="icon-cardtitle color-darkblue semibold-24-32 w-100">
                                            <div className="skeleton skeleton-text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="icon-card directions color-lightblue">
                                        <div className="d-flex">
                                            <div className="icon-cardimage skeleton" />
                                        </div>
                                        <div className="icon-cardtitle color-darkblue semibold-24-32 w-100">
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
                    <ConsultationForm />
                </div>
            </div>
        </div>
    )
};

export default Subpage;