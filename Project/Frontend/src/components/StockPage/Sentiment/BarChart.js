import React from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
	indexAxis: "y",
	elements: {
		bar: {
			borderWidth: 2
		}
	},
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false
		}
	}
}

function BarChart({ twitterVolume }) {
	const labels = twitterVolume.map((o) => new Date(o.start).toLocaleDateString())
	const data = {
		labels,
		datasets: [
			{
				label: "Dataset 1",
				data: twitterVolume.map((o) => o.tweet_count),
				backgroundColor: "rgb(45, 130, 240)"
			}
		]
	}
	return <Bar options={options} data={data} />
}

export default BarChart
