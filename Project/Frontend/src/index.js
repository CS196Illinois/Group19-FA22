import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"
import "./index.css"
import App from "./App"
import StockPage from "./components/StockPage"

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />
	},
	{
		path: "/:ticker",
		element: <StockPage />
	}
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
