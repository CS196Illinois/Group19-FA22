import useFetch from "./useFetch"

import Row from "./Row"

import "./News.css"

function News({ info }) {
	const key = process.env.REACT_APP_FINNHUB
	const toDate = new Date().toISOString().substring(0, 10)
	const fromDate = new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().substring(0, 10)
	const {
		data: articles,
		loading,
		error
	} = useFetch(
		`https://finnhub.io/api/v1/company-news?symbol=${info.ticker}&from=${fromDate}&to=${toDate}&token=${key}`
	)

	if (loading) return <h1>LOADING...</h1>

	if (error) console.log(error)

	return (
		<div className="News">
			<div className="news__wrapper">
				{articles?.map((article, index) => {
					return <Row key={index} url={article.url} headline={article.headline} summary={article.summary} />
				})}
			</div>
		</div>
	)
}

export default News
