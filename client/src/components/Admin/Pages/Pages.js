import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getPageByName } from "../../../actions/page";
import Block from "../../subcomponents/Block/Block";

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

    return (
        <div id="pages">
            {page && (
                page.blocks.map((block, key) => (
                    <Block block={block} key={key} editableonly={true} />
                ))
            )}
        </div>
    )
}

export default Pages;