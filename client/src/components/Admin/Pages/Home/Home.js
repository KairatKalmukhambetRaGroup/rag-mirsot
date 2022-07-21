import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageByName } from "../../../../actions/page";
import Edit from "../../Edit/Edit";

const Home = () => {
    const {page} = useSelector((state)=>state.pages);
    const {lang} = useSelector((state)=>state.global);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(!page){
            dispatch(getPageByName('home'));
        }else{
            console.log(page)
        }
    },[dispatch, page]);

    return page && (
        <div id="home">
            <div className="block">
                <div className="block-title">
                    Текст главного блока
                </div>
                <Edit type="text" text={page.home_heading} className="bold-48-56 color-black" />
                <Edit type="text" text={page.home_subheading} className="regular-24-30 color-darkgrey" />
            </div>
            <hr />
            <div className="block">
                <div className="block-title">
                    Текст направления
                </div>
                <Edit type="text" text={page.home_directions_heading} className="semibold-32-48 color-black" />
                <Edit type="text" text={page.home_directions_subheading} className="regular-22-28 color-black" />
            </div>
            <hr />
            <div className="block">
                <div className="block-title">
                    Текст услуг
                </div>
                <Edit type="text" text={page.home_services_heading} className="semibold-32-48 color-black" />
                <Edit type="text" text={page.home_services_subheading} className="regular-22-28 color-black" />
            </div>
            <hr />
            <div className="block">
                <div className="block-title">
                    Консультация
                </div>
                <Edit type="text" text={page.home_consulting_title} className="bold-48-56 color-darkblue" />
                <Edit type="text" text={page.home_consulting_heading} className="semibold-32-48 color-yellow" />
                <Edit type="text" text={page.home_consulting_subheading} className="regular-24-30 color-darkgrey" />
            </div>
        </div>
    );
};

export default Home;