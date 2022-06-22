import React from "react";

import './styles.scss';
const Block = ({block}) => {
    switch(block.block_type){
        case 'div':
            return (
                <div className={block.name + ' ' + block?.classname}>
                    {block.subblocks.length > 0 && block.subblocks.map((subblock) => (<Block key={subblock._id} block={subblock} /> ))}
                </div>
            );
        case 'h1':
            return (
                <h1 className={block.name + ' ' + block?.classname}>
                    {block.text_ru}
                </h1>  
            );
        case 'h2':
            return (
                <h2 className={block.name + ' ' + block?.classname}>
                    {block.text_ru}
                </h2>  
            );
        case 'h3':
        case 'h-3':
            return (
                <h3 className={block.name + ' ' + block?.classname}>
                    {block.text_ru}
                </h3>  
            );
        case 'h4':
            return (
                <h4 className={block.name + ' ' + block?.classname}>
                    {block.text_ru}
                </h4>  
            );
        case 'h5':
            return (
                <h5 className={block.name + ' ' + block?.classname}>
                    {block.text_ru}
                </h5>  
            );
        case 'p':
            return (
                <p className={block.name + ' ' + block.classname}>
                    {block.text_ru}
                </p>  
            );
        case 'a':
            return (
                <a href={block.href} className={block.name + ' ' + block.classname}>
                    {block.text_ru}
                </a>  
            );
        case 'img': 
            return (
                <div className="image">
                    <img src={block.src} className={block.classname} />
                </div>
            )
        default:
            return (
                <>
                </>
            )
    }
}

export default Block;