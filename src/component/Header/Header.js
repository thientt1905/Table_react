import React, { useState } from "react";
import { Button, Menu, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState("/");
  const navigate = useNavigate();

  const handleClick = (key) => {
    setCurrent(key);
    navigate(key);
  };

  const settingsMenu = (
    <Menu>
      <Menu.Item key="/login" onClick={() => handleClick("../Auth/Login")}>
        Login
      </Menu.Item>
      <Menu.Item key="/logout" onClick={() => handleClick("/logout")}>
        Logout
      </Menu.Item>
      <Menu.Item key="/profile" onClick={() => handleClick("/profile")}>
        Profile
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        padding: "10px 20px",
        backgroundColor: "#f0f2f5",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type={current === "/" ? "primary" : "default"}
            onClick={() => handleClick("/")}
          >
            Home
          </Button>
          <Button
            type={current === "/posts" ? "primary" : "default"}
            onClick={() => handleClick("/posts")}
          >
            Post
          </Button>
          <Button
            type={current === "/users" ? "primary" : "default"}
            onClick={() => handleClick("/users")}
          >
            User
          </Button>
          <Button
            type={current === "/pages" ? "primary" : "default"}
            onClick={() => handleClick("/pages")}
          >
            Page
          </Button>
        </div>
        <Dropdown overlay={settingsMenu}>
          <Button type={current.includes("/settings") ? "primary" : "default"}>
            Settings
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
