import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getPageByName } from '../../actions/page';

import Breadcrumb from '../subcomponents/Breadcrumb/Breadcrumb';

import './styles.scss';

const About = () => {
    const dispatch = useDispatch();
    const {page} = useSelector((state) => state.pages);
    // const page = null;
    const {lang, link} = useSelector((state) => state.global);

    useEffect(()=>{
        dispatch(getPageByName('about'));
    }, [dispatch])

    const calcMargin = (e) =>{
        e.preventDefault();
        const containerEl = document.getElementById('container');
        const margin = window.getComputedStyle(containerEl).marginLeft;
        const lastcard = document.getElementById('lastcard');
        lastcard.style.marginRight = margin;
    }

    return (
        <div id="about">
            <Breadcrumb color="dark" page="about" />
            <div className='block' id="about-heading">
                <div className='container'>
                    <div className='row-1 row-lg-2 h-100'>
                        <div className='col h-100'>
                            <div className='d-flex h-100'>
                                <div className='text mv-auto d-flex flex-column gap-2 w-100'>
                                    <div className='bold-40-48 bold-lg-48-56 color-white w-50'>
                                        {page ? page.about_heading[lang] : (
                                            <div className='skeleton skeleton-text' />
                                        )}
                                    </div>
                                    <div className='regular-16-24 regular-lg-22-28 color-lightgrey w-100'>
                                        {page ? page.about_subheading[lang] : (
                                            <>
                                                <div className='skeleton skeleton-text' />
                                                <div className='skeleton skeleton-text' />
                                                <div className='skeleton skeleton-text' />
                                                <div className='skeleton skeleton-text w-70' />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='d-flex h-100'>
                                <div id="about-symbol" className='m-auto'>
                                    <i></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='block' id="about-cards"  onScroll={calcMargin}>
                <div className='container' id="container">
                    <div className='d-flex flex-row flex-lg-nowrap'>
                        <div className='cards'>
                            {page ? page.cards.map((card, key)=>(
                                <div className='card' key={key} id={key === page.cards.length-1 ? 'lastcard' : null}>
                                    <div className='card-title semibold-24-32 semibold-lg-32-48'>{card.title[lang]}</div>
                                    <div className='card-text regular-16-24 regular-lg-22-28'>{card.subtitle[lang]}</div>
                                </div>
                            )) : (
                                <>
                                    <div className='card'>
                                        <div className='card-title semibold-24-32 semibold-lg-32-48'>
                                            <div className='skeleton skeleton-text w-70' />
                                        </div>
                                        <div className='card-text regular-16-24 regular-lg-22-28'>
                                            <div className='skeleton skeleton-text' />
                                            <div className='skeleton skeleton-text' />
                                            <div className='skeleton skeleton-text' />
                                            <div className='skeleton skeleton-text w-70' />
                                        </div>
                                    </div>
                                    <div className='card'>
                                        <div className='card-title semibold-24-32 semibold-lg-32-48'>
                                            <div className='skeleton skeleton-text w-70' />
                                        </div>
                                        <div className='card-text regular-16-24 regular-lg-22-28'>
                                            <div className='skeleton skeleton-text' />
                                            <div className='skeleton skeleton-text' />
                                            <div className='skeleton skeleton-text' />
                                            <div className='skeleton skeleton-text w-70' />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className='block' id="about-staff">
                <div className='container'>
                    <div className='semibold-24-32 semibold-lg-32-48 color-black mb-8'>Команда Mirsot</div>
                    <div className='staff-container'>
                        <div className='staff'>
                            <div className='staff-image'>
                                <div className='bg'></div>
                                <div className='profile-image'>
                                    <img src={page && `${link}images/${page.images[0].src}`} className={`${!page && 'skeleton'}`} alt={page && page.about_staff_ceo_name[lang]} />
                                </div>
                            </div>
                            <div className='staff-text d-flex flex-column gap-2'>
                                <div className='semibold-32-48 bold-lg-40-48 color-oceanblue w-100'> 
                                    {page ? page.about_staff_ceo_name[lang] : (<div className='skeleton skeleton-text w-50' />)}
                                </div>
                                <div className='d-flex flex-column gap-2 w-100'>
                                    <div className='d-flex flex-column gap-1 w-100'>
                                        <div className='staff-position semibold-16-24 semibold-lg-24-32 color-darkblue w-100'>
                                            {page ? page.about_staff_ceo_position[lang] : (<div className='skeleton skeleton-text w-70' />)}
                                        </div>
                                        <div className='staff-about regular-16-24 regular-lg-20-28 color-darkgrey w-100'>
                                            {page ? page.about_staff_ceo_about[lang] : (
                                                <>
                                                    <div className='skeleton skeleton-text' />
                                                    <div className='skeleton skeleton-text' />
                                                    <div className='skeleton skeleton-text' />
                                                    <div className='skeleton skeleton-text' />
                                                    <div className='skeleton skeleton-text w-70' />
                                                </>
                                            )}                                            
                                        </div>
                                    </div>
                                    <div className='staff-mail d-flex gap-1 color-oceanblue w-100'>
                                        {page ? (
                                            <>
                                                <i></i>
                                                <a href={`mailto:${page.about_staff_ceo_mail[lang]}`} className='regular-16-24 regular-lg-20-28'>{page.about_staff_ceo_mail[lang]}</a>
                                            </>
                                        ) : (<div className='skeleton skeleton-text w-70' />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='staff'>
                            <div className='staff-image'>
                                <div className='bg'></div>
                                <div className='profile-image'>
                                    <img src={page && `${link}images/${page.images[1].src}`} className={`${!page && 'skeleton'}`} alt={page && page.about_staff_cto_name[lang]} />
                                </div>
                            </div>
                            <div className='staff-text d-flex flex-column gap-2'>
                                <div className='semibold-32-48 bold-lg-40-48 color-oceanblue w-100'> 
                                    {page ? page.about_staff_cto_name[lang] : (<div className='skeleton skeleton-text w-50' />)}

                                </div>
                                <div className='d-flex flex-column gap-2 w-100'>
                                    <div className='d-flex flex-column gap-1 w-100'>
                                        <div className='staff-position semibold-16-24 semibold-lg-24-32 color-darkblue w-100'>
                                            {page ? page.about_staff_cto_position[lang] : (<div className='skeleton skeleton-text w-70' />)}
                                        </div>
                                        <div className='staff-about regular-16-24 regular-lg-20-28 color-darkgrey w-100'>
                                            {page ? page.about_staff_cto_about[lang] : (
                                                <>
                                                    <div className='skeleton skeleton-text' />
                                                    <div className='skeleton skeleton-text' />
                                                    <div className='skeleton skeleton-text' />
                                                    <div className='skeleton skeleton-text' />
                                                    <div className='skeleton skeleton-text w-70' />
                                                </>
                                            )}                                
                                        </div>
                                    </div>
                                    <div className='staff-mail d-flex gap-1 color-oceanblue w-100'>
                                        {page ? (
                                            <>
                                                <i></i>
                                                <a href={`mailto:${page.about_staff_cto_mail[lang]}`} className='regular-16-24 regular-lg-20-28'>{page.about_staff_cto_mail[lang]}</a>
                                            </>
                                        ) : (<div className='skeleton skeleton-text w-70' />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='block' id="about-certificates">
                <div className='container'>
                    <div className='semibold-24-32 semibold-lg-32-48 color-white'>Сертификаты</div>
                    <div className='images mt-6'>
                        {page && page.images.map((image,key)=> key>1 && (
                            <div className='image-container' key={key}>
                                <img src={`${link}images/${image.src}`} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;