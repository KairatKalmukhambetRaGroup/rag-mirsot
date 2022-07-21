import React from "react";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';

import './styles.scss';
const Block = ({block, editableonly = false}) => {
    const {lang} = useSelector((state) => state.global);
    const navigate = useNavigate();

    switch(block.type){
        case 'cards': 
            return (
                <div className={block.classname}>
                    <div className="row">
                        {block.subblocks && block.subblocks.map((sub, key) => (
                            <div className="col" key={key} >
                                <Block block={sub} editableonly={editableonly}/>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'card':
            return (
                <div className={block.classname}>
                    {block.subblocks && block.subblocks.map((sub, key) => (
                        <Block block={sub} editableonly={editableonly}/>
                    ))}
                    <div>
                        {block.text[lang]}
                    </div>
                </div>
            )
        case 'slideshow': 
            if(!editableonly){
                return (
                    <div className={block.classname}>
                        <div className="slideshow-container">
                            {block.subblocks && block.subblocks.map((sub, key) => (
                                <div className="slide" key={key} >
                                    <Block block={sub} editableonly={editableonly}/>
                                </div>
                            ))}
                        </div>
    
                        <div className="slideshow-dots">
                            {block.subblocks && block.subblocks.map((sub, key) => (
                                <span className="dot" key={key} ></span>
                            ))}
                        </div>
                    </div>
                );
            }else if(block.editable === editableonly){
                return (
                    <div className="edit-slideshow">
                        {block.subblocks && block.subblocks.map((sub, key) => (
                            <div className="slide" key={key} >
                                <Block block={sub} editableonly={editableonly}/>
                            </div>
                        ))}
                    </div>
                )
            }else
                return;
        case 'image': 
            return (
                <div className="image-container">
                    <img src={`http://89.219.32.45:5000/images/${block.src}`} />
                </div>
            );
            
        case 'pageblock': 
            return (
                <div id={block.id} className={block.classname}>
                    <div className="container">
                        {block.subblocks && block.subblocks.map((sub, key) => (
                            <Block block={sub} key={key} editableonly={editableonly} />
                        ))}
                    </div>
                </div>
            );
        case 'div': 
            return (
                <div className={block.classname}>
                    {block.subblocks && block.subblocks.map((sub, key) => (
                        <Block block={sub} key={key} editableonly={editableonly} />
                    ))}
                </div>
            );
        case 'text':
            return ((!editableonly) || block.editable === editableonly) && (
                <div className={`text ${block.classname}`}>
                    {block.text[lang]}
                </div>
            )
        case 'button':
            const handleBtnClick = (e) =>{
                e.preventDefault();
                if(block.href && block.href.length > 0){
                    navigate(block.href);
                }
            }
            return ((!editableonly) || block.editable === editableonly) && (
                <button href={block.href} onClick={handleBtnClick} className={block.classname}>
                    {block.text[lang]}
                </button>
            )
    }
}

export default Block;