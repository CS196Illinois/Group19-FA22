import React from "react"
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
import { faker } from "@faker-js/faker"
import "chartjs-adapter-date-fns"

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
		x: { type: "time" },
		y: {
			type: "linear",
			display: true,
			position: "left"
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

function LineGraph({ twitterSentiment }) {
	const data = {
		//labels,
		datasets: [
			{
				label: "Dataset 1",
				data: twitterSentiment.map((o) => ({ x: o.time, y: o.sentiment })),
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
				yAxisID: "y"
			}
			//{
			//	label: "price",
			//	data: labels.map(() => faker.random.numeric(3)),
			//	borderColor: "rgb(234, 43, 221)",
			//	yAxisID: "y2"
			//}
		]
	}
	return <Line options={options} data={data} />
}

export default LineGraph
