import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"
import "./index.css"
import StockPage from "./components/StockPage"
import HomePage from "./components/HomePage/HomePage"

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />
	},
	{
		path: "/:ticker",
		element: <StockPage />
	}
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<RouterProvider router={router} />)
