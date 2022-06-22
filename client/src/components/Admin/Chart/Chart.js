import React, { useEffect, useState } from "react";
import moment from 'moment';

import './styles.scss';

import { LineChart } from "./LineChart";
const Chart = ({data, label, id}) => {
    function getCurvePoints(pts, tension, isClosed, numOfSegments) {

        // use input value if provided, or use a default value   
        tension = (typeof tension != 'undefined') ? tension : .5;
        isClosed = isClosed ? isClosed : false;
        numOfSegments = numOfSegments ? numOfSegments : 32;
    
        var _pts = [], res = [],    // clone array
            x, y,           // our x,y coords
            t1x, t2x, t1y, t2y, // tension vectors
            c1, c2, c3, c4,     // cardinal points
            st, t, i;       // steps based on num. of segments
    
        // clone array so we don't change the original
        //
        pts.forEach(pt => {
            _pts.push(pt.x);
            _pts.push(pt.y);
        });
        // _pts = pts.slice(0);
    
        // The algorithm require a previous and next point to the actual point array.
        // Check if we will draw closed or open curve.
        // If closed, copy end points to beginning and first points to end
        // If open, duplicate first points to befinning, end points to end
        if (isClosed) {
            _pts.unshift(pts[pts.length - 1].y);
            _pts.unshift(pts[pts.length - 1].x);
            _pts.unshift(pts[pts.length - 1].y);
            _pts.unshift(pts[pts.length - 1].x);
            _pts.push(pts[0].x);
            _pts.push(pts[0].y);
        }
        else {
            _pts.unshift(pts[0].y);   //copy 1. point and insert at beginning
            _pts.unshift(pts[0].x);
            _pts.push(pts[pts.length - 1].x); //copy last point and append
            _pts.push(pts[pts.length - 1].y);
        }


        // ok, lets start..
    
        // 1. loop goes through point array
        // 2. loop goes through each segment between the 2 pts + 1e point before and after
        for (i=2; i < (_pts.length - 4); i+=2) {
            for (t=0; t <= numOfSegments; t++) {
                
                // calc tension vectors
                t1x = (_pts[i+2] - _pts[i-2]) * tension;
                t2x = (_pts[i+4] - _pts[i]) * tension;
    
                t1y = (_pts[i+3] - _pts[i-1]) * tension;
                t2y = (_pts[i+5] - _pts[i+1]) * tension;
    
                // calc step
                st = t / numOfSegments;
    
                // calc cardinals
                c1 =   2 * Math.pow(st, 3)  - 3 * Math.pow(st, 2) + 1; 
                c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2); 
                c3 =       Math.pow(st, 3)  - 2 * Math.pow(st, 2) + st; 
                c4 =       Math.pow(st, 3)  -     Math.pow(st, 2);
    
                // calc x and y cords with common control vectors
                x = c1 * _pts[i]    + c2 * _pts[i+2] + c3 * t1x + c4 * t2x;
                y = c1 * _pts[i+1]  + c2 * _pts[i+3] + c3 * t1y + c4 * t2y;
        
                y = Math.max(1, y)

                //store points in array
                res.push(x);
                res.push(y);
    
            }
        }
        return res;
    }
    function createPoints(data){
        let max = 0;
        let min = 100000000;
        data.forEach(element => {
            max = Math.max(element.total, max);
            min = Math.min(element.total, min);
        });

        const canvas = document.getElementById(id);
        const stepX = canvas.offsetWidth / (data.length + 1);
        const stepY = Math.min((canvas.offsetHeight - 10) / max, 17);

        let points = [{x: 0, y: 0}];
        


        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const x = (index+1) * stepX;
            const y = element.total * stepY;
            if(index == 0 && x-100 > 0){
                points.push({x: x-100, y: 0});
            }

            points.push({x, y, title: moment(element._id).format('DD/MM/YYYY'), label, value: element.total});
        }
        if(points[points.length-1].x + 100 < canvas.offsetWidth){
            points.push({x: points[points.length-1].x + 100, y: 0});
        }

        points.push({x: canvas.offsetWidth, y: 0});
        return points;
    }

    const [today, setToday] = useState({count: 0, text: '. . .'});

    useEffect(()=>{
        if(data){
            const points = createPoints(data);
            const curvPoints = getCurvePoints(points);
            new LineChart(points, curvPoints, document.getElementById(id), id).create();
            const last = points[points.length-2];
            const today = moment(new Date().setUTCHours(0,0,0,0)).format('DD/MM/YYYY');
            let count = 0;
            for(let i= points.length-1; i>=0; i--){
                if(points[i] && points[i].title && points[i].title === today){
                    count = points[i].value;
                    break;
                }
            }
            setToday({count: count, text: label});
        }
    }, [data]);

    return (
        <div className="chart">
            <div className="count">
                <h3 className="title-semibold-32-48">{today.count}</h3>
                <p className="body-regular-16-20">{today.text}</p>
            </div>
            <div className="line-chart" id={id}>
            </div>
        </div>
    );
};

export default Chart;