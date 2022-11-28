import React, { useEffect, useState } from "react"
import Header from "./StockPage/Header"
import Sentiment from "./StockPage/Sentiment"
import News from "./StockPage/News"
import { useParams } from "react-router-dom"
import axios from "axios"
import useFetch from "./StockPage/useFetch"

function StockPage() {
	const { ticker } = useParams()
	const [info, setInfo] = useState("")
	const [twitterSentiment, setTwitterSentiment] = useState([])
	const [twitterVolume, setTwitterVolume] = useState([])
	const [redditSentiment, setRedditSentiment] = useState("")
	const [price, setPrice] = useState({ c: [1], t: [1] })
	const key = process.env.REACT_APP_FINNHUB
	const backendURL = "http://127.0.0.1:8000/api"

	useEffect(() => {
		console.log("effect")
		axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${key}`).then((response) => {
			console.log(response.data)
			setInfo(response.data)
			axios.get(`${backendURL}/reddit/sentiment/${ticker}?company=${info.name}`).then((response) => {
				console.log(response.data)
				setRedditSentiment(response.data)
			})
		})
		axios.get(`${backendURL}/twitter/sentiment/${ticker}`).then((response) => {
			setTwitterSentiment(response.data.sort((objA, objB) => new Date(objA.time) - new Date(objB.time)))
			console.log(twitterSentiment)
		})
		axios.get(`${backendURL}/twitter/volume/${ticker}`).then((response) => {
			console.log(response.data)
			setTwitterVolume(response.data)
		})
		axios
			.get(
				`https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=D&from=${Math.floor(
					(Date.now() - 1000 * 60 * 60 * 24 * 7) / 1000
				)}&to=${Math.floor(Date.now() / 1000)}&token=${key}`
			)
			.then((response) => {
				console.log(response.data)
				setPrice(response.data)
			})
	}, [])

	return (
		<div className="StockPage">
			<Header info={info} />
			<Sentiment
				twitterSentiment={twitterSentiment}
				twitterVolume={twitterVolume}
				redditSentiment={redditSentiment}
				price={price}
			/>
			<News info={info} key={key} />
		</div>
	)
}

export default StockPage
