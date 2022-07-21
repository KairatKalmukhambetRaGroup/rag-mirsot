import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageByName } from "../../../../actions/page";
import Edit from "../../Edit/Edit";

const About = () => {
    const {page} = useSelector((state)=>state.pages);
    const {lang} = useSelector((state)=>state.global);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(!page){
            dispatch(getPageByName('about'));
        }else{
            console.log(page)
        }
    },[dispatch, page]);

    return page && (
        <div id="about">
            <div className="block">
                <div className="block-title">
                    Текст о нас
                </div>
                <Edit type="text" text={page.about_heading} className="bold-48-56 color-black" />
                <Edit type="text" text={page.about_subheading} className="regular-24-30 color-darkgrey" />
            </div>
            <hr />
            <div className="block">
                <div className="block-title">
                    Текста карточек
                </div>
                {page.cards.map((card, key)=>(
                    <Edit type="card" card={card} key={key}/>
                ))}
            </div>
            <hr />
            <div className="block">
                <div className="block-title">
                    Текст “Команда Mirsot”
                </div>
                <div>
                    <Edit type="image" image={page.images[0]} />
                    <Edit type="text" text={page.about_staff_ceo_name} className="bold-40-48 color-black" />
                    <Edit type="text" text={page.about_staff_ceo_position} className="semibold-24-32 color-black" />
                    <Edit type="text" text={page.about_staff_ceo_about} className="regular-20-28 color-darkgrey" />
                    <Edit type="text" text={page.about_staff_ceo_mail} className="regular-20-28 color-darkgrey" />
                </div>
                <hr/>
                <div className="mt-8">
                    <Edit type="image" image={page.images[1]} />
                    <Edit type="text" text={page.about_staff_cto_name} className="bold-40-48 color-black" />
                    <Edit type="text" text={page.about_staff_cto_position} className="semibold-24-32 color-black" />
                    <Edit type="text" text={page.about_staff_cto_about} className="regular-20-28 color-darkgrey" />
                    <Edit type="text" text={page.about_staff_cto_mail} className="regular-20-28 color-darkgrey" />
                </div>
            </div>
            <hr />
            <div className="block">
                <div className="block-title">
                    Сертификаты
                </div>
                
            </div>
        </div>
    );
}

export default About;