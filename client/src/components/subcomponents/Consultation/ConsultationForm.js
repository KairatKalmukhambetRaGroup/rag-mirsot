import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./styles.scss";

const initialState = {name: '', email: '', direction: '', service:''};

const placeholders = {
    name: {ru: 'Напишите своё имя'},
    email: {ru: 'Например, namesurname.@gmail.com'},
    direction: {ru: 'Укажите отрасль'},
    service: {ru: 'Укажите услугу'}
};
const labels = {
    name: {ru: 'Имя'},
    email: {ru: 'Электронная почта'},
    direction: {ru: 'Отрасль'},
    service: {ru: 'Услуга'}
};

const heading = {
    ru: 'Записаться на консультацию',
}
const btn = {
    ru: 'Записаться',
}

const ConsultationForm = ({size}) => {
    const [formData, setFormData] = useState(initialState);
    const {lang} = useSelector((state)=>state.global);
    const {pages} = useSelector((state)=>state.pages);

    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        let value = e.target.value;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form id="consultation-form" onSubmit={handleSubmit}>
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
                            <select required name="direction"  value={formData.direction} onChange={handleChange}>
                                <option value='' disabled hidden>{placeholders.direction[lang]}</option>
                                {pages && pages.map((pg, key) => {
                                    if(pg.name === 'directions' && pg.subpages.length > 0){
                                        return pg.subpages.map((sp, i)=>(
                                            <option value={sp.name} key={i}>
                                                {sp.title[lang]}
                                            </option>
                                        ));
                                    }
                                })}
                            </select>
                        </div>
                        <div className="textfields-48px w-100">
                            <label>{labels.service[lang]}</label>
                            <select required name="service"  value={formData.service} onChange={handleChange}>
                                <option value='' disabled hidden>{placeholders.service[lang]}</option>
                                {pages && pages.map((pg, key) => {
                                    if(pg.name === 'services' && pg.subpages.length > 0){
                                        return pg.subpages.map((sp, i)=>(
                                            <option value={sp.name} key={i}>
                                                {sp.title[lang]}
                                            </option>
                                        ));
                                    }
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <button type="submit" className="button-48 regular-16-16">{btn[lang]}</button>
        </form>
    )
};

export default ConsultationForm;