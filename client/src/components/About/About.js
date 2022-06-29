import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getPageByName } from '../../actions/page';

import Breadcrumb from '../subcomponents/Breadcrumb/Breadcrumb';

import './styles.scss';

const About = () => {
    const dispatch = useDispatch();
    const {page} = useSelector((state) => state.pages);
    const {lang} = useSelector((state) => state.global);

    useEffect(()=>{
        dispatch(getPageByName('about'));
    }, [dispatch])

    return (
        <div id="about">
            <Breadcrumb color="dark" />
            <div className='block' id="about-heading">
                <div className='container'>
                    <div className='row-1 row-lg-2 h-100'>
                        <div className='col h-100'>
                            <div className='d-flex h-100'>
                                <div className='text mv-auto d-flex flex-column gap-2'>
                                    <div className={`bold-48-56 color-white ${!page && 'skeleton skeleton-text'}`}>
                                        {page && page.about_heading[lang]}
                                    </div>
                                    <div className={`regular-22-28 color-lightgrey ${!page && 'skeleton skeleton-text'}`}>
                                        {page && page.about_subheading[lang]}
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
            <div className='block' id="about-cards">
                <div className='container'>
                    <div className='d-flex flex-row flex-lg-nowrap cards'>
                        
                    </div>
                </div>
            </div>
            <div className='block' id="about-staff">
                <div className='container'>
                    <div className='semibold-32-48 color-black mb-8'>Команда Mirsot</div>
                    <div className='staff-container'>
                        <div className='staff'>
                            <div className='staff-image'>
                                <div className='bg'></div>
                                <div className='profile-image'>
                                    <img src={page && `http://localhost:5000/images/${page.images[0].src}`} className={`${!page && 'skeleton'}`} />
                                </div>
                            </div>
                            <div className='staff-text d-flex flex-column gap-2'>
                                <div className='bold-40-48 color-oceanblue'> 
                                    {page && page.about_staff_ceo_name[lang]}
                                </div>
                                <div className='d-flex flex-column gap-2'>
                                    <div className='d-flex flex-column gap-1'>
                                        <div className='staff-position semibold-24-32 color-darkblue'>
                                            {page && page.about_staff_ceo_position[lang]}
                                        </div>
                                        <div className='staff-about regular-20-28 color-darkgrey'>
                                            {page && page.about_staff_ceo_about[lang]}                                            
                                        </div>
                                    </div>
                                    <div className='staff-mail d-flex gap-1 color-oceanblue'>
                                        <i></i>
                                        <a href={`mailto:${page && page.about_staff_ceo_mail[lang]}`} className='regular-20-28'>{page && page.about_staff_ceo_mail[lang]}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='staff'>
                            <div className='staff-image'>
                                <div className='profile-image'>
                                    <img src={page && `http://localhost:5000/images/${page.images[1].src}`} className={`${!page && 'skeleton'}`} />
                                </div>
                                <div className='bg'></div>
                            </div>
                            <div className='staff-text d-flex flex-column gap-2'>
                                <div className='bold-40-48 color-oceanblue'> 
                                    {page && page.about_staff_cto_name[lang]}                                            
                                </div>
                                <div className='d-flex flex-column gap-2'>
                                    <div className='d-flex flex-column gap-1'>
                                        <div className='staff-position semibold-24-32 color-darkblue'>
                                            {page && page.about_staff_cto_position[lang]}                                            
                                        </div>
                                        <div className='staff-about regular-20-28 color-darkgrey'>
                                            {page && page.about_staff_cto_about[lang]}                                            
                                        </div>
                                    </div>
                                    <div className='staff-mail d-flex gap-1 color-oceanblue'>
                                        <i></i>
                                        <a href={`mailto:${page && page.about_staff_cto_mail[lang]}`} className='regular-20-28'>{page && page.about_staff_cto_mail[lang]}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;