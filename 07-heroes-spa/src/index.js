import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { HeroesApp } from "./HeroesApp";
import "animate.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HeroesApp />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals