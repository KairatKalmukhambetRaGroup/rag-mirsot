import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import decode from 'jwt-decode';

import { login } from '../../../actions/user';

import './styles.scss';

const Login = () => {
    const [email, setEmail] = useState({value: '', valid: false, error: ''});
    const [password, setPassword] = useState({value: '', valid: false, error: ''});
    const [remember, setRemember] = useState(false);
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(profile && profile.user && profile.token){
            const token = profile.token;
            if (token) {
                const decodedToken = decode(token);
          
                if (decodedToken.exp * 1000 > new Date().getTime()) 
                    navigate('/admin')
            }
            setProfile(JSON.parse(localStorage.getItem('profile')));
        }
    }, [profile, dispatch]);


    const handleEmailChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const regex = /^[a-zA-Z0-9.]+@ragmirsot.org+$/;
        const valid = regex.test(value);

        setEmail({...email, value: value, valid: valid});
    }
    const handlePassChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        const valid = (value.length > 7);
        setPassword({...password, value: value, valid: valid});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {email: email.value, password: password.value, remember: remember};
        dispatch(login(formData, navigate));
    }

    return(
        <div id="login" className='bg-lightblue'>
            <form className='bg-white' onSubmit={handleSubmit}>
                <div className='log-in-content'>
                    <h4 className='title-semibold-24-32 text-center'>Вход</h4>
                    <div className='buttons'>
                        <div className='textfield-container'>
                            <div className='textfields-48px'>
                                <label className='title button-regular-16-16 color-black'>Почта</label>
                                <input className='input' type="text" name="email" placeholder="Введите корпоративную почту" value={email.value} onChange={handleEmailChange} />
                            </div>
                            <div className='textfields-48px'>
                                <label className='title button-regular-16-16 color-black'>Пароль</label>
                                <input className='input button-regular-16-16' type="password" name="password" placeholder="Введите пароль" value={password.value} onChange={handlePassChange} />
                            </div>
                        </div>
                        <div className='more body-regular-16-20'>
                            <label className='checkbox remember'>
                                <input type="checkbox" checked={remember} onChange={(e)=>{setRemember(e.target.checked)}} />
                                запомнить меня
                            </label>
                            <a>Забыли пароль?</a>
                        </div>
                        <button type="submit" className="button-48px button-regular-16-16" disabled={!email.valid || !password.valid} >Войти</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;