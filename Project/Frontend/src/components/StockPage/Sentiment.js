import React from "react"

import "./Sentiment.css"

import SentimentLineGraph from "./Sentiment/SentimentLineGraph"
import SentimentBarChart from "./Sentiment/SentimentBarChart"

function Sentiment({ twitterSentiment, twitterVolume, redditSentiment, price }) {
	return (
		<div className="sentiment">
			<div className="sentiment__wrapper">
				<div className="line__graph__wrapper">
					<div className="sentiment__header">
						<h1 className="text-3xl">Market Sentiment</h1>
					</div>
					<SentimentLineGraph twitterSentiment={twitterSentiment} price={price} />
				</div>
				<div className="bar__chart__wrapper">
					<div className="sentiment__header">
						<h1 className="text-3xl">Tweet Volume</h1>
					</div>
					<SentimentBarChart twitterVolume={twitterVolume} />
				</div>
			</div>
		</div>
	)
}

export default Sentiment
