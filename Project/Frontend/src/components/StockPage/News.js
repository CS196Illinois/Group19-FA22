import useFetch from './useFetch';

import Row from "./Row";

import "./News.css"

function News() {

    const { data: articles, loading, error } = useFetch(`https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2022-10-25&to=2022-10-26&token=ccu79uiad3iei7t0pli0ccu79uiad3iei7t0plig`);

    if (loading) return <h1>LOADING...</h1>

    if (error) console.log(error);

    return (
      
      <div className="News">

        <div className="news__wrapper">
        
          {
            articles?.map((article, index) => {

              return (
                <Row key={index} url={article.url} headline={article.headline} summary={article.summary} />
              )

            })
          }

        </div>

      </div>

    );

}

export default News;
