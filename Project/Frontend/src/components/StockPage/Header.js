import React from "react"
import { useNavigate } from "react-router-dom"
import "./Header.css"

function Header({ info }) {
	const navigate = useNavigate()
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

			const section = event.target.innerText
			const scrollToSection = {
				"Sentiment": 0,
				"Volume": 0,
				"News": 575
			}

			scroll(scrollY, scrollToSection[section])

		}
	}

	return (
		<div className="header">
			<div className="left__wrapper items-center">
				<button type="button" className="home__button" onClick={() => navigate("/")}>
					&#60;
				</button>
				<div className="">
					<img src={info.logo} alt="logo" className="p-4 h-36 rounded-full" />
				</div>
				<div className="ticker__name__wrapper">
					<div className="ticker">{info.ticker}</div>
					<div className="name">{info.name}</div>
				</div>
			</div>
			<div className="right__wrapper">
				<div className="menu__wrapper">
					<ul className="menu ul--reset">
						<li className="menu__item">
							<a onClick={toggleActive}>
								Sentiment
							</a>
						</li>
						<li className="menu__item">
							<a onClick={toggleActive}>
								Volume
							</a>
						</li>
						<li className="menu__item">
							<a onClick={toggleActive}>
								News
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default Header
