import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestConsultation } from "../../../actions/consultation";
import Modal from "../Modal/Modal";
import SelectInput from "./SelectInput";

import "./styles.scss";

const initialState = {name: '', email: '', direction: {ru:'', kz: '', en: ''}, service:{ru:'', kz: '', en: ''}};

const placeholders = {
    name: {ru: 'Напишите своё имя', en: 'Write your name', kz: 'Атыңызды жазыңыз'},
    email: {ru: 'Например, namesurname@gmail.com', en: 'For example namesurname@gmail.com', kz: 'Мысалы namesurname@gmail.com'},
    direction: {ru: 'Укажите направление', en: 'Specify a direction', kz: 'Бағытты танданыз'},
    service: {ru: 'Укажите услугу', en: 'Specify a service', kz: 'Қызметті танданыз'}
};
const labels = {
    name: {ru: 'Имя', en: 'Name', kz: 'Аты-жөні'},
    email: {ru: 'Электронная почта', en: 'Email', kz: 'Электрондық пошта'},
    direction: {ru: 'Направление', en: 'Direction', kz: 'Бағыт'},
    service: {ru: 'Услуга', en: 'Service', kz: 'Қызмет'}
};

const heading = {
    ru: 'Записаться на консультацию',
    en: 'Book a consultation',
    kz: 'Кеңес алу үшін жазылыңыз'
}
const btn = {
    ru: 'Записаться',
    en: 'Enroll',
    kz: 'Жазылу'
}

const ConsultationForm = ({size}) => {
    const [formData, setFormData] = useState(initialState);
    const {lang, consultation_status} = useSelector((state)=>state.global);
    const {pages} = useSelector((state)=>state.pages);

    const [directionOptions, setDirectionOptions] = useState([]);
    const [serviceOptions, setServiceOptions] = useState([]);
    const [show, setShow] = useState(false);
    const [modalHeading, setModalHeading] = useState(null);
    const [modalMessage, setModalMessage] = useState(null);
    
    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        setFormData({...formData, [name]: value});
    }
    const handleSelect = (name, value) => {   
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(requestConsultation({...formData, direction: formData.direction.name, service: formData.service.name, lang}));
        setShow(true);
    }

    useEffect(()=>{
        if(consultation_status){
            switch(consultation_status){
                case 201: 
                    setModalHeading({ru: 'Вы записаны'});
                    setModalMessage({ru: 'Вы записаны на консультацию. '});
            }
        }
    }, [consultation_status])


    useEffect(()=>{
        if(pages){
            let dirArr = [];
            let servArr = [];
            for (let index = 0; index < pages.length; index++) {
                const pg = pages[index];
                if((pg.name === 'directions' || pg.name === 'services') && pg.subpages.length > 0){
                    for (let index = 0; index < pg.subpages.length; index++) {
                        const sp = pg.subpages[index];
                        if(pg.name === 'directions')
                            dirArr.push({name: sp.name, ru:sp.title.ru, en:sp.title.en, kz:sp.title.kz});
                        else
                            servArr.push({name: sp.name, ru:sp.title.ru, en:sp.title.en, kz:sp.title.kz});
                    }
                }
            }
            setServiceOptions(servArr);
            setDirectionOptions(dirArr);
        }
    },[pages])

    

    return (
        <form id="consultation-form" autoComplete="off" onSubmit={handleSubmit}>
            <Modal show={show} setShow={setShow} heading={modalHeading} message={modalMessage} />
            <div className="semibold-24-32 mb-3">
                {heading[lang]}
            </div>
            <div className={`gap-3 mb-4 row-1  ${size === 'sm' ? '' : 'row-lg-2'}`}>
                <div className="col">
                    <div className="d-flex flex-column gap-3 w-100">
                        <div className="textfields-48px w-100">
                            <label>{labels.name[lang]}</label>
                            <input type="text" name="name" placeholder={placeholders.name[lang]} value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="textfields-48px w-100">
                            <label>{labels.email[lang]}</label>
                            <input type="text" name="email" placeholder={placeholders.email[lang]} value={formData.email} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="d-flex flex-column gap-3 w-100">
                        <div className="textfields-48px w-100">
                            <label>{labels.direction[lang]}</label>
                            <SelectInput handleSelect={handleSelect} name="direction" placeholder={placeholders.direction[lang]} value={formData.direction} options={directionOptions} />
                        </div>
                        <div className="textfields-48px w-100">
                            <label>{labels.service[lang]}</label>

                            <SelectInput handleSelect={handleSelect} name="service" placeholder={placeholders.service[lang]} value={formData.service} options={serviceOptions} />
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" className="button-48 regular-16-16">{btn[lang]}</button>
        </form>
    )
};

export default ConsultationForm;