import React from 'react'

import "./Sentiment.css"

import SentimentLineGraph from './Sentiment/SentimentLineGraph'
import SentimentBarChart from './Sentiment/SentimentBarChart'

function Sentiment() {
    
    return (
        <div className="sentiment">
            <div className="sentiment__wrapper">
                <div className="line__graph__wrapper">
                    <div className="sentiment__header">
                        <h1>Market Sentiment</h1>
                    </div>
                    <SentimentLineGraph />
                </div>
                <div className="bar__chart__wrapper">
                    <div className="sentiment__header">
                        <h1>Tweet Volume</h1>
                    </div>
                    <SentimentBarChart />
                </div>
            </div>
        </div>
    )

}

export default Sentiment