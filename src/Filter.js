import React, { useState } from "react";
import { Select, Button, Input, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AudioOutlined } from "@ant-design/icons";
import "./cssCustom/filter.css";

const { Search } = Input;
const { Option } = Select;

export default function Filter() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("active");

  const handleReset = () => {
    setSearch("");
    setStatus("active");
  };

  const handleSearch = (value) => {
    setSearch(value);
    // Logic for performing search with 'value'
  };

  return (
    <div className="filter-container">
      <div className="filter-list">
        <div className="filter-item">
          <Search
            placeholder="Input search text"
            allowClear
            enterButton="Search"
            size="large"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            onSearch={(value) => console.log("Search:", value)}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="status">Status:</label>
          <Select
            id="status"
            value={status}
            style={{ width: 150 }}
            onChange={(value) => setStatus(value)}
          >
            <Option value="active">Active</Option>
            <Option value="noActive">Inactive</Option>
          </Select>
        </div>
      </div>
      <div className="filter-btn">
        <Button
          type="primary"
          icon={<FontAwesomeIcon icon={faTrash} />}
          onClick={handleReset}
        >
          Delete Search
        </Button>
      </div>
    </div>
  );
}
