import React from "react";
import "./cssCustom/filter.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export default function Filter() {
  return (
    <div className="filter-container">
      <div className="filter-list">
        <div>
          <label htmlFor="search">Tìm kiếm</label>
          <select id="search" name="search">
            <option value="male">Chọn nhân viên</option>
            <option value="female">Bỏ chọn nhân viên</option>
          </select>
        </div>
        <div>
          <label htmlFor="position">Chức vụ</label>
          <select id="position" name="position">
            <option value="Intern">Intern</option>
            <option value="Fresher">Fresher</option>
          </select>
        </div>
        <div>
          <label htmlFor="gender">Giới tính</label>
          <select id="gender" name="gender">
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="dif">Khác</option>
          </select>
        </div>
        <div>
          <label htmlFor="status">Trạng thái</label>
          <select id="status" name="status">
            <option value="active">Hoạt động</option>
            <option value="noActive">Không hoạt động</option>
          </select>
        </div>
      </div>
      <div className="filter-btn">
        <button className="btn btn-delete">
          <FontAwesomeIcon icon={faTrash} />
          Xoá tìm kiếm
        </button>
      </div>
    </div>
  );
}
