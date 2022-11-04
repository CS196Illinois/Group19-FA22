import React, { useEffect, useState } from "react"
import AnimatedNumbers from "react-animated-numbers"
import axios from "axios"

import "./Historic.css"

import LineGraph from "./Sentiment/LineGraph"

function Historic() {
	const getItemOffset = (item) => {
		return item.offsetLeft
	}

	const moveMarker = (offset) => {
		const marker = document.querySelector(".historic__marker")
		marker.style.transform = `translateX(${offset}px)`
	}

	const setMarkerWidth = (item) => {
		const marker = document.querySelector(".historic__marker")
		marker.style.width = `${item.offsetWidth}px`
	}

	const toggleActive = (event) => {
		// Remove any existing active classes
		const periods = document.querySelectorAll(".historic__period")
		periods.forEach((period) => period.classList.remove("historic__period__active"))

		// Add class to active link
		const activeItem = event.target
		activeItem.classList.toggle("historic__period__active")
		const offset = getItemOffset(activeItem)
		moveMarker(offset)
	}

	useEffect(() => {
		const periods = document.querySelectorAll(".historic__period")
		periods.forEach((period) => {
			if (period.classList.contains("historic__period__active")) {
				const offset = getItemOffset(period)
				setMarkerWidth(period)
				moveMarker(offset)
			}
		})
	}, [])

	return (
		<div className="historic">
			<div className="historic__wrapper">
				<div className="info__wrapper">
					<div className="price">
						<h1>$147.89</h1>
					</div>
					<div className="delta">
						<p>+$4.22 (+1.05%) Oct. 23, 2022</p>
					</div>
				</div>
				<div className="historic__chart__wrapper">
					<div className="historic__chart">
						<LineGraph />
					</div>
					<div className="chart__period__wrapper">
						<div className="chart__period">
							<div className="historic__period historic__period__active" onClick={toggleActive}>
								1D
							</div>
							<div className="historic__period" onClick={toggleActive}>
								5D
							</div>
							<div className="historic__period" onClick={toggleActive}>
								1M
							</div>
							<div className="historic__period" onClick={toggleActive}>
								6M
							</div>
							<div className="historic__period" onClick={toggleActive}>
								1Y
							</div>
							<span className="historic__marker"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Historic
