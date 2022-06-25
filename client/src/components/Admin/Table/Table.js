import React, { useEffect, useState } from 'react';
import './styles.scss';

const Table = ({title, data}) => {
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
                            <th key={i}>{k}</th>
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