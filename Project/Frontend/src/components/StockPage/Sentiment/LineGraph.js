import React from "react"
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
} from "chart.js"
import { Line } from "react-chartjs-2"
import { faker } from "@faker-js/faker"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

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
	}
}

const labels = ["January", "February", "March", "April", "May", "June", "July"]

export const data = {
	labels,
	datasets: [
		{
			label: "Dataset 1",
			data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
			borderColor: "rgb(255, 99, 132)",
			backgroundColor: "rgba(255, 99, 132, 0.5)"
		}
	]
}

function LineGraph() {
	return <Line options={options} data={data} />
}

export default LineGraph