import React, { useEffect } from "react"
import axios from "axios"

import "./SentimentLineGraph.css"

import LineGraph from "./LineGraph"

function SentimentLineGraph({ twitterSentiment, price, setPrice, info }) {
	const getItemOffset = (item) => {
		return item.offsetLeft
	}

	const moveMarker = (offset) => {
		const marker = document.querySelector(".sentiment__line__graph__marker")
		marker.style.transform = `translateX(${offset}px)`
	}

	const setMarkerWidth = (item) => {
		const marker = document.querySelector(".sentiment__line__graph__marker")
		marker.style.width = `${item.offsetWidth}px`
	}

	const toggleActive = (event) => {
		// Remove any existing active classes
		const periods = document.querySelectorAll(".sentiment__line__graph__period")
		periods.forEach((period) => period.classList.remove("sentiment__line__graph__period__active"))

		// Add class to active link
		const activeItem = event.target
		activeItem.classList.toggle("sentiment__line__graph__period__active")
		const offset = getItemOffset(activeItem)
		moveMarker(offset)
	}

	const fetchData = (fromDate, toDate) => {
		const url = `https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from=${toDate}&to=${fromDate}&token=ccu79uiad3iei7t0pli0ccu79uiad3iei7t0plig`
		console.log(url)
		axios.get(url).then((res) => {
			console.log(res)
		})
	}

	const getPeriod = (event) => {
		const period = event.target.id

		const fromDate = new Date()
		fromDate.setHours(0, 0, 0, 0)
		const unixFromDate = fromDate / 1000

		const toDate = fromDate
		toDate.setHours(0, 0, 0, 0)

		if (period === "1D") {
			toDate.setDate(fromDate.getDate() - 1)
		} else if (period === "5D") {
			toDate.setDate(fromDate.getDate() - 5)
		} else if (period === "1M") {
			toDate.setMonth(fromDate.getMonth() - 1)
		} else if (period === "6M") {
			toDate.setMonth(fromDate.getMonth() - 1)
		} else if (period == "1Y") {
			toDate.setFullYear(fromDate.getFullYear() - 1)
		}

		const unixToDate = toDate / 1000

		fetchData(unixFromDate, unixToDate)
	}

	const callOnClick = (event) => {
		toggleActive(event)
		getPeriod(event)
	}

	useEffect(() => {
		const periods = document.querySelectorAll(".sentiment__line__graph__period")
		periods.forEach((period) => {
			if (period.classList.contains("sentiment__line__graph__period__active")) {
				const offset = getItemOffset(period)
				setMarkerWidth(period)
				moveMarker(offset)
			}
		})
	}, [])

	return (
		<div className="sentiment__line__graph">
			<div className="sentiment__chart">
				<LineGraph twitterSentiment={twitterSentiment} price={price} />
			</div>
			<div className="chart__period__wrapper">
				<div className="chart__period">
					<div
						id="1D"
						className="sentiment__line__graph__period sentiment__line__graph__period__active"
						onClick={callOnClick}
					>
						1 Week
					</div>
					<span className="sentiment__line__graph__marker"></span>
				</div>
			</div>
		</div>
	)
}

export default SentimentLineGraph
