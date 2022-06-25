import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPageByName } from "../../actions/page";
import Block from "../subcomponents/Block/Block";

import './styles.scss';

const Home = () => {
    const { page } = useSelector((state) => state.pages);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPageByName('home'));
    }, [dispatch]);

    useEffect(()=>{
        console.log(page)
    }, [page]);

    return (
        <div id="home">
            {page && (
                page.blocks.map((block, key) => (
                    <Block block={block} key={key} />
                ))
            )}
        </div>
    )
}

export default Home;