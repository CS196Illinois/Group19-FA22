import React from "react"

import Header from "./StockPage/Header"
import Sentiment from "./StockPage/Sentiment"
import { useParams } from "react-router-dom"
import axios from "axios"

function StockPage() {
	const { ticker } = useParams()
	return (
		<div className="StockPage">
			<Header ticker={ticker} />
			<Sentiment />
			{/* <Historic /> */}
		</div>
	)
}

export default StockPage
