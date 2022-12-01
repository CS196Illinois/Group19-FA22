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
			<div className="wrapper">
				<div className="news__header">
					<h1 className="text-3xl">News</h1>
				</div>
				<div className="news__wrapper">
					{articles?.map((article, index) => {
						if (index > 10) {
							return
						}
						return (
							<Row
								key={index}
								source={article.source}
								url={article.url}
								headline={article.headline}
								summary={article.summary}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default News
