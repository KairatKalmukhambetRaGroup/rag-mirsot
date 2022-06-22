import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getPageByName } from '../../actions/page';
import Block from '../subcomponents/Block/Block';

const About = () => {
    const dispatch = useDispatch();
    const {page} = useSelector((state) => state.pages);
    useEffect(()=>{
        dispatch(getPageByName('about'));
    }, [dispatch])

    return (
        <div id="about">
            {(!page) ? (
                <>
                
                </>
            ) : 
                page.blocks.map((block) => (
                    <div key={block._id} className={`block ${block.name === 'staff-block' ? 'bg-lightblue' : 'bg-darkblue'}`}>
                        <Block block={block}/>
                    </div>
                ))}
        </div>
    );
};

export default About;