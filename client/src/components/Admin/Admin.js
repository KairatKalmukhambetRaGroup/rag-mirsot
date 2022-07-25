import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Menu from "./Menu/Menu";
import {useNavigate} from 'react-router-dom';
import decode from 'jwt-decode';

import './styles.scss'
import { Helmet } from "react-helmet-async";

const Admin = () => {
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));

    const navigate = useNavigate();

    useEffect(() => {
        if(profile && profile.user && profile.token){
            const token = profile.token;
            if (token) {
                const decodedToken = decode(token);
          
                if (decodedToken.exp * 1000 < new Date().getTime()){
                    // localStorage.setItem('profile', JSON.stringify({...action.payload.data}));        
                    localStorage.clear('profile');
                    navigate('/admin/login');
                } 
            }else{
                localStorage.clear('profile');
                navigate('/admin/login');
            }          
        }else{
            localStorage.clear('profile');
            navigate('/admin/login');
        }
    }, [profile]);
    return (
        <div id="admin">
            <Helmet>
                <meta name="robots" content="noindex" />
            </Helmet>
            <Header />
            <Menu />
            <div id="content">
                <Outlet />
            </div>
        </div>
    );
};

export default Admin;