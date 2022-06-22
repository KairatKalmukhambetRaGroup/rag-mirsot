import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getVisitors } from '../../../actions/visitor';

import Chart from '../Chart/Chart';


const Dashboard = () => {
    const {visitors} = useSelector((state) => state.global);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVisitors());
    }, [dispatch])

    return (
        <div id="dashboard">
            <div className='charts'>
                <h4 className='title-semibold-24-32'>Информация</h4>
                <div className='row row-2'>
                    <div className='col'>
                        <Chart data={visitors} id="visitorslinechart" label="Посетители"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;