import React from "react"

import './Row.css'

function Row(props) {

    const formatHeadline = headline => {
        if (headline.length > 65) {
            return headline.slice(0, 62) + "...";
        } else {
            return headline;
        }
    }

    const formatSummary = summary => {
        if (summary.length > 100) {
            return summary.slice(0, 97) + "...";
        } else {
            return summary;
        }
    }

    return (
        <div className="Row">
            <a href={props.url} target="_blank" className="text-3xl"><h1>{formatHeadline(props.headline)}</h1></a>
            <p className="text-l">{formatSummary(props.summary)}</p>
        </div>
    )

}

export default Row