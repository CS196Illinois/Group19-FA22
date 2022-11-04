import React, { useEffect } from 'react'

import './SentimentBarChart.css'

import BarChart from './BarChart';

function SentimentLineGraph() {

    const getItemOffset = item => {
        return item.offsetLeft;
    };
    
    const moveMarker = offset => {
        const marker = document.querySelector('.sentiment__bar__chart__marker');
        marker.style.transform = `translateX(${offset}px)`;
    };

    const setMarkerWidth = item => {
        const marker = document.querySelector('.sentiment__bar__chart__marker');
        marker.style.width = `${item.offsetWidth}px`;
    }

    const toggleActive = event => {

        // Remove any existing active classes
        const periods = document.querySelectorAll('.sentiment__bar__chart__period');
        periods.forEach((period => period.classList.remove('sentiment__bar__chart__period__active')));
        
        // Add class to active link
        const activeItem = event.target;
        activeItem.classList.toggle('sentiment__bar__chart__period__active');
        const offset = getItemOffset(activeItem);
        moveMarker(offset);

    }

    useEffect(() => {
        
        const periods = document.querySelectorAll('.sentiment__bar__chart__period');
        periods.forEach(period => {
            if (period.classList.contains("sentiment__bar__chart__period__active")) {
                const offset = getItemOffset(period);
                setMarkerWidth(period);
                moveMarker(offset);
            }
        });

    }, []);

    return (
        <div className="sentiment__bar__chart">
            <div className="sentiment__chart">
                <BarChart />
            </div>
            <div className="chart__period__wrapper">
                <div className="chart__period">
                    <div id="1D" className="sentiment__bar__chart__period sentiment__bar__chart__period__active" onClick={toggleActive}>1D</div>
                    <div id="5D" className="sentiment__bar__chart__period" onClick={toggleActive}>5D</div>
                    <div id="1M" className="sentiment__bar__chart__period" onClick={toggleActive}>1M</div>
                    <div id="6M" className="sentiment__bar__chart__period" onClick={toggleActive}>6M</div>
                    <div id="1Y" className="sentiment__bar__chart__period" onClick={toggleActive}>1Y</div>
                    <span className="sentiment__bar__chart__marker"></span>
                </div>
            </div>
        </div>
    )

}

export default SentimentLineGraph