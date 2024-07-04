import { Button } from "antd";
import "./App.css";
import Header from "./component/Header/Header";
import "./cssCustom/header.css";
import ListData from "./test";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content"></div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
