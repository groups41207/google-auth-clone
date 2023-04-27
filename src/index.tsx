import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import UserContextProvider from "./contexts/UserContext"

import App from "./App"
import reportWebVitals from "./reportWebVitals"

import "bootstrap/dist/css/bootstrap.min.css"
import "./index.scss"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
