import React from "react";
import "./App.css";
import TableCustom from "./Table.js";
import Filter from "./Filter.js";
import './cssCustom/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight, faPlus } from '@fortawesome/free-solid-svg-icons';
function App() {
  return (
    <div className="App">
      <div style={{padding: '0px 20px 0 20px'}}>
        <div className="header">
          <h2 className="text table-name">Danh sách nhân viên </h2>
          <div>
            <button className="btn btn-reset">
            <FontAwesomeIcon icon={faRotateRight} />
              Làm mới</button>
            <button className="btn btn-add">
            <FontAwesomeIcon icon={faPlus} />
            Thêm mới</button>
          </div>
        </div>
        <Filter />
        <TableCustom />
      </div>
    </div>
  );
}

export default App;
