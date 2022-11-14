import React, { useEffect, useState } from "react"

import Header from "./StockPage/Header"
import Sentiment from "./StockPage/Sentiment"
import News from "./StockPage/News"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

function StockPage() {
	const { ticker } = useParams()
	const navigate = useNavigate()
	const [info, setInfo] = useState("")

	useEffect(() => {
		console.log("effect")
		axios
			.get(`http://127.0.0.1:8000/api/validate/${ticker}`)
			.then((response) => {
				console.log(response.data)
				setInfo(response.data)
			})
			.catch((response) => {
				console.log("hello")
			})
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
