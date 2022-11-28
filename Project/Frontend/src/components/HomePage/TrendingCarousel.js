import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

const tickers = ["AAPL", "MSFT", "TSLA", "GE", "SHOP"]

import "./TrendingCarousel.css"

function TrendingCarousel() {

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
                <div className='left' onClick={handleClick}>{tickers[(count - 1) % tickers.length]}</div>
                <div className='middle' onClick={handleClick}>{tickers[(count) % tickers.length]}</div>
                <div className='right' onClick={handleClick}>{tickers[(count + 1) % tickers.length]}</div>
            </div>
        </div>
    )
}

export default TrendingCarousel