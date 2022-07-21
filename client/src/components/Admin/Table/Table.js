import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './styles.scss';

const words = {
    name: {ru: 'Имя', en: 'Name', kz: 'Аты-жөні'},
    email: {ru: 'Электронная почта', en: 'Email', kz: 'Электрондық пошта'},
    direction: {ru: 'Направление', en: 'Direction', kz: 'Бағыт'},
    service: {ru: 'Услуга', en: 'Service', kz: 'Қызмет'},
    lang: {ru: 'Язык', en: 'Language', kz: 'Тіл'},
}

const Table = ({title, data}) => {
    const {lang} = useSelector((state)=>state.global)
    const [keys, setKeys] = useState([]);
    useEffect(()=>{
        if(data && data.length > 0){
            let keyArr = []
            Object.keys(data[0]).map((key) => {
                if(key !==  '_id' && key !== 'status' && key !== 'createdAt' && key !== 'updatedAt' && key !== '__v'){
                    keyArr.push(key);
                }
            });
            setKeys(keyArr);
        }
    }, [data]);
    return (
        <div className='table-container'>
            <h4 className='title-semibold-24-32 mb-2'>{title}</h4>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        {keys && keys.length>0 && keys.map((k, i) => (
                            <th key={i}>{words[k][lang]}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 && data.map((el, key) => (
                        <tr key={key}>
                            <td>{key+1}</td>
                            {keys && keys.length>0 && keys.map((k, i) => (
                                <td key={i}>
                                    {(typeof el[k] === 'string' || el[k] instanceof String) ? el[k] : el[k].name_ru}
                                </td>
                            ))} 
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;