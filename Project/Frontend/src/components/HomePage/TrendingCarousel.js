import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"

// const tickers = ["AAPL", "MSFT", "TSLA", "GE", "SHOP"]

import "./TrendingCarousel.css"

function TrendingCarousel({ data }) {

    const [count, setCount] = useState(1);
    const navigate = useNavigate()

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCount(count + 1);
        }, 2000);
    
        return () => {
          clearTimeout(timeout);
        };
      }, [count]);

    const handleClick = (event) => {
        event.preventDefault()
        navigate(`/${event.target.innerText}`)
    }

    return (
        <div className='TrendingCarousel'>
            <h1 className='text-3xl'>Trending Tickers</h1>
            <div className='container'>
                <div className='left' onClick={handleClick}>{data[(count - 1) % data.length]}</div>
                <div className='middle' onClick={handleClick}>{data[(count) % data.length]}</div>
                <div className='right' onClick={handleClick}>{data[(count + 1) % data.length]}</div>
            </div>
        </div>
    )

    
}

export default TrendingCarousel