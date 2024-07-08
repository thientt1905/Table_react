import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./screen/User/User.js";
import Page from "./screen/Page/Page.js";
import ListData from "./screen/Posts/ListPost.js";
import HomePage from "./screen/Home/HomePage.js";
import Login from "./screen/SignIn/Login.js";
import RequireAuth from "./component/Auth/requirAuth.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route element={<App />}>
            <Route path="/" element={<HomePage />} />
            <Route path="posts" element={<ListData />} />
            <Route path="users" element={<User />} />
            <Route path="pages" element={<Page />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
