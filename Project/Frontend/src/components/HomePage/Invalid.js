import React from 'react'
import WarningLogo from './red-alert-icon.svg'
import './Invalid.css'

function Invalid() {
  return (
    <div className="Invalid block text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
        <img className="svg" src={WarningLogo} />
        <p>Oops! Seems that you entered an invalid ticker.</p>
        <p>Please try again.</p>
    </div>
  )
}

export default Invalid