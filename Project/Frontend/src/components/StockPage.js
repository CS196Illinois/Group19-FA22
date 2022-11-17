import React, { useEffect, useState } from "react"
import Header from "./StockPage/Header"
import Sentiment from "./StockPage/Sentiment"
import News from "./StockPage/News"
import { useParams } from "react-router-dom"
import axios from "axios"

function StockPage() {
	const { ticker } = useParams()
	const [info, setInfo] = useState("")
	const key = process.env.REACT_APP_FINNHUB

	useEffect(() => {
		console.log("effect")
		axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${key}`).then((response) => {
			console.log(response.data)
			setInfo(response.data)
		})
		axios.get()
	}, [])

	return (
		<div className="StockPage">
			<Header info={info} />
			<Sentiment />
			<News />
		</div>
	)
}

export default StockPage
