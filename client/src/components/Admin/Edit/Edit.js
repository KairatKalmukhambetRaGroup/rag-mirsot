import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateText } from "../../../actions/page";

import './styles.scss';

const words = {
    russian: {ru: 'Русский',en: 'Russian',kz: 'Орысша'},
    english: {ru: 'Английский',en: 'English',kz: 'Ағылшынша'},
    kazakh: {ru: 'Казакский',en: 'Kazakh',kz: 'Қазақша'},
    save: {ru: 'Сохранить',en: 'Save',kz: 'Сақтау'},
}

const Edit = ({type=null, card, text={ru:'', kz: '', en: ''}, className=""}) => {
     
    const [tmpText, setTmpText] = useState(text); 

    const {lang} = useSelector((state) => state.global);
    const {newText} = useSelector((state) => state.pages);

    const dispatch = useDispatch();

    const handleTextChange = (e) => {
        e.preventDefault();
        e.target.style.height = "";
        e.target.style.height = e.target.scrollHeight + "px";
        const lang = e.target.dataset.lang;
        setTmpText({...tmpText, [lang]: e.target.value});
    }

    const saveText = (e) =>{
        e.preventDefault();
        dispatch(updateText(tmpText));
    }

    useEffect(()=>{
        if(newText && newText._id === text._id){
            setTmpText(newText);
        }
    },[newText]);

    switch (type) {
        case "text":
            return (
                <div className="text-edit">  
                    <div className="edit-subblock">
                        <div className="lang">{words.english[lang]}</div>
                        <textarea value={tmpText.en} data-lang="en" className={className} onChange={handleTextChange}  />
                    </div>
                    <div className="edit-subblock">
                        <div className="lang">{words.russian[lang]}</div>
                        <textarea value={tmpText.ru} data-lang="ru" className={className} onChange={handleTextChange}  />
                    </div>
                    <div className="edit-subblock">
                        <div className="lang">{words.kazakh[lang]}</div>
                        <textarea value={tmpText.kz} data-lang="kz" className={className} onChange={handleTextChange}  />
                    </div>
                    <div className="d-flex">
                        <button className="ml-auto save-text-btn button-48 regular-16-16" onClick={saveText}>{words.save[lang]}</button>
                    </div>
                </div>                
            );
        case "card": 
            return (
                <div className="card-edit">
                    <div className="edit-cards">
                        <div className="edit-cardsub">
                            <div className="lang">{words.english[lang]}</div>
                            <textarea value={card.title.en} data-lang="en" className={className} onChange={handleTextChange}  />
                            <textarea value={card.subtitle.en} data-lang="en" className={className} onChange={handleTextChange}  />
                        </div>
                        <div className="edit-cardsub">
                            <div className="lang">{words.russian[lang]}</div>
                            <textarea value={card.title.ru} data-lang="ru" className={className} onChange={handleTextChange}  />
                            <textarea value={card.subtitle.ru} data-lang="ru" className={className} onChange={handleTextChange}  />
                        </div>
                        <div className="edit-cardsub">
                            <div className="lang">{words.kazakh[lang]}</div>
                            <textarea value={card.title.kz} data-lang="kz" className={className} onChange={handleTextChange}  />
                            <textarea value={card.subtitle.kz} data-lang="kz" className={className} onChange={handleTextChange}  />
                        </div>
                    </div>
                    <div className="d-flex">
                        <button className="ml-auto save-text-btn button-48 regular-16-16" onClick={saveText}>{words.save[lang]}</button>
                    </div>
                </div>
            );
        case "image": 
            return (
                <div className="image-edit">

                </div>
            );
        default:
            return (<></>);
    }
};

export default Edit;