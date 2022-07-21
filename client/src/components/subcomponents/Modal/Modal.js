import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './styles.scss';

const words = {
        close: { ru: 'Закрыть', en: 'Close', kz: 'Жабу'},
    };

const Modal = ({show, setShow,heading=null,message=null}) => {
    const {lang} = useSelector((state)=>state.global);

    const close = () => {
        setShow(false);
    }

    return (
        <div className={`modal-overlay ${show ? '' : 'hide'}`} onClick={close}>
            {heading ? (
                <div className='modal'>
                    <div className='modal-body'>
                        <div className='modal-header'>
                            <div className='semibold-24-32'>
                                {heading[lang]}
                            </div>
                            <span className='modal-close'></span>
                        </div>
                        <div className='modal-content'>
                            <div className='regular-20-28'>
                                {message[lang]}
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <div className='modal-btn close' onClick={close}>{words.close[lang]}</div>
                            {/* <div className='modal-btn success' onClick={close}>{words.close[lang]}</div> */}
                        </div>
                    </div>
                </div>
            ) : (
                <div className='modal-loading'>loading</div>
            )}
        </div>
    );
};

export default Modal;