import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getPageByName } from "../../../actions/page";

import './styles.scss';

const Pages = () => {
    const {pagename} = useParams();
    const { page } = useSelector((state) => state.pages);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(pagename){
            dispatch(getPageByName(pagename));
        }
    }, [pagename]);

    useEffect(()=>{
        console.log(page);
    },[page])

    return (
        <div id="pages">
        </div>
    )
}

export default Pages;