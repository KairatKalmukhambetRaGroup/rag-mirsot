import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getConsultationRequests } from '../../../actions/consultation';
import { getVisitors } from '../../../actions/visitor';

import Chart from '../Chart/Chart';
import Table from '../Table/Table';


const Dashboard = () => {
    const {visitors, consultations} = useSelector((state) => state.admin);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVisitors());
        dispatch(getConsultationRequests());
    }, [dispatch])

    var rearange = (data) => { 
        if(data){
            let c = 0;
            let date = null;
            const arr = [];
            data.forEach(element => {
                const elDate = new Date(element.createdAt).setHours(0,0,0,0);
                if(date){
                    if(date === elDate){
                        c++;
                    }else{
                        arr.push({total: c, _id: date});
                        c = 1;
                        date = elDate;
                    }
                }else{
                    c = 1;
                    date = elDate
                }   
            });
            arr.push({total: c, _id: date});
            return arr.reverse();
        }
        return [];
    }

    return (
        <div id="dashboard">
            <div className='charts mb-5'>
                <h4 className='title-semibold-24-32 mb-2'>Информация</h4>
                <div className='row-2'>
                    <div className='col'>
                        <Chart data={visitors} id="visitorslinechart" title="Посетителей сегодня" label="Посетители"/>
                    </div>
                    <div className='col'>
                        <Chart data={rearange(consultations)} id="consultationslinechart" title="Заявок на консультацию" label="Заявки"/>
                    </div>
                </div>
            </div>
            <Table title="Заявки на консультацию" data={consultations} />
        </div>
    );
};

export default Dashboard;