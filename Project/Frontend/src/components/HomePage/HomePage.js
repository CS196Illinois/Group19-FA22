import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./HomePage.css"

import Invalid from "./Invalid"
import TrendingCarousel from "./TrendingCarousel"

function HomePage() {
	
	const [ticker, setTicker] = useState("")
	const [data, setData] = useState([])
	const [warning, setWarning] = useState(false)
	const navigate = useNavigate()
	const key = process.env.REACT_APP_FINNHUB

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log(ticker)
		axios.get(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${key}`).then((response) => {
			console.log(response.data)
			if (Object.keys(response.data).length === 0) {
				console.log("invalid")
				setWarning(true)
			} else {
				console.log("valid")
				navigate(`/${ticker}`)
			}
		})
	}

	const handleOnChange = (event) => {
		event.preventDefault()
		setTicker(event.target.value)
		console.log(event.target.value)
	}

	useEffect(() => {

        axios.get(`https://finnhub.io/api/v1/index/constituents?symbol=^NDX&token=${key}`)
			.then((response) => {
				let data = response.data.constituents;
				data.sort(() => Math.random() - Math.random()).slice(0, 20)
				setData(data)
			})

    }, [])

	return (
		<div className="flex flex-col justify-center items-center">
			<h1 className="text-3xl m-4">Stock Sentiment</h1>
			<form onSubmit={handleSubmit}>
				<label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
					Search
				</label>
				<div class="relative">
					<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
						<svg
							aria-hidden="true"
							class="w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</div>
					<input
						value={ticker}
						onChange={handleOnChange}
						type="search"
						id="default-search"
						class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="ex: AAPL"
						required
					/>
					<button
						type="submit"
						class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Search
					</button>
				</div>
			</form>
			{warning ? <Invalid /> : <h1></h1>}
			<TrendingCarousel data={data} />
		</div>
	)
}

export default HomePage
