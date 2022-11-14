import React from "react"

import Header from "./StockPage/Header"
import Sentiment from "./StockPage/Sentiment"
import News from "./StockPage/News"
import { useParams } from "react-router-dom"
import axios from "axios"

function StockPage() {
	const { ticker } = useParams()

	return (
		<div className="StockPage">
			<Header ticker={ticker} />
			<Sentiment />
			<News />
		</div>
	)
}

export default StockPage
