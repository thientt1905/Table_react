import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./component/User/User";
import Page from "./component/Page/Page";
import ListData from "./component/posts/ListPost";
import HomePage from "./component/Home/HomePage";
import Login from "./component/Auth/Login";
import RequireAuth from "./component/Auth/requirAuth";

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
