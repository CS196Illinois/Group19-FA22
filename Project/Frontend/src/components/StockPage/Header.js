import React from "react"

import "./Header.css"

function Header({ ticker }) {
	const getItemOffset = (item) => {
		return item.offsetTop
	}

	const moveMarker = (offset) => {
		const marker = document.querySelector(".nav__marker")
		marker.style.transform = `translateY(${offset}px)`
	}

	const toggleActive = (event) => {
		if (event.target.tagName === "A") {
			// Remove any existing active classes
			const links = document.querySelectorAll(".menu__item")
			links.forEach((link) => link.classList.remove("is__nav__item__active"))

			// Add class to active link
			const activeItem = event.target.parentElement
			activeItem.classList.toggle("is__nav__item__active")
			const offset = getItemOffset(activeItem)
			moveMarker(offset)
		}
	}

	return (
		<div className="header">
			<div className="left__wrapper">
				<button type="button" className="home__button">
					&#60;
				</button>
				<div className="ticker__name__wrapper">
					<div className="ticker">{ticker}</div>
					<div className="name">Apple Inc.</div>
				</div>
			</div>
			<div className="right__wrapper">
				<div className="menu__wrapper">
					<ul className="menu ul--reset">
						<li className="menu__item is__nav__item__active">
							<a href="/" onClick={toggleActive}>
								Sentiment
							</a>
						</li>
						<li className="menu__item">
							<a href="/" onClick={toggleActive}>
								Historic
							</a>
						</li>
						<li className="menu__item">
							<a href="/" onClick={toggleActive}>
								Metrics
							</a>
						</li>
					</ul>
					<span className="nav__marker"></span>
				</div>
			</div>
		</div>
	)
}

export default Header
