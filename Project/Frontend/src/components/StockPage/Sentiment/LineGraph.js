import React, { useState } from "react"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TimeScale
} from "chart.js"
import { Line } from "react-chartjs-2"
import "chartjs-adapter-date-fns"
import axios from "axios"
import useFetch from "../useFetch"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale)

export const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false
		},
		hover: {
			mode: "nearest",
			intersect: true
		},
		tooltip: {
			mode: "index",
			intersect: false
		}
	},
	scales: {
		x: { type: "time", time: { unit: "day", round: "true" } },
		y: {
			type: "linear",
			display: true,
			position: "left",
			min: -1,
			max: 1
		},
		y2: {
			type: "linear",
			display: true,
			position: "right",

			// grid line settings
			grid: {
				drawOnChartArea: false // only want the grid lines for one axis to show up
			}
		}
	}
}

function LineGraph({ twitterSentiment, price }) {
	const data = {
		datasets: [
			{
				label: "Sentiment",
				data: twitterSentiment.map((o) => ({ x: o.time, y: o.sentiment })),
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
				yAxisID: "y"
			},
			{
				label: "price",
				data: price.c.map((o, i) => ({ x: new Date(price.t[i] * 1000).valueOf(), y: o })),
				borderColor: "rgb(234, 43, 221)",
				yAxisID: "y2"
			}
		]
	}
	return <Line options={options} data={data} />
}

export default LineGraph
