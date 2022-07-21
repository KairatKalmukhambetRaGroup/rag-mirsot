import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import './selectInput.scss';

const SelectInput = ({options=[], value={ru:'', kz: '', en: ''}, handleSelect, name, placeholder}) => {
    const {lang} = useSelector((state)=>state.global);

    const handleChoose = (e) =>{
        e.preventDefault();
        const index = e.target.dataset.value;
        const val = options[index];
        handleSelect(name, val);
    }


    return (
        <div className="custom-select">
            <input readOnly autoComplete="off"  name={name} placeholder={placeholder}  value={value[lang]} />
            <div className="options">
                {options && options.length>0 && options.map((option, key)=>(
                    <div className={`option ${value && value.name === option.name ? 'active' : ''}`} key={key} data-value={key} onClick={handleChoose}>{option[lang]}</div>
                    ))}
            </div>
            <span className="select-arrow-down" onClick={(e)=>{e.preventDefault(); e.target.classList.toggle('active')}}></span>
        </div>
    )
}

export default SelectInput;