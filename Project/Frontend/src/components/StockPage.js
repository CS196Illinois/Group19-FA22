import React from 'react'

import Header from './StockPage/Header'
import Sentiment from './StockPage/Sentiment'
import Historic from './StockPage/Historic'

function StockPage() {
  return (
    <div className="StockPage">
      <Header />
      <Sentiment />
      {/* <Historic /> */}
    </div>
  )
}

export default StockPage