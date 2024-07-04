import React, { useEffect, useState } from "react";
import "./App.css";
import Filter from "./Filter.js";
import "./cssCustom/header.css";
import TableCustom from "./Table.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Modal,
  Button,
  Form,
  Input,
  DatePicker,
  Mentions,
  Select,
  Menu,
  Table,
  Popconfirm,
} from "antd";
import moment from "moment";
import dayjs from "dayjs";
import { Header } from "antd/es/layout/layout.js";

const { Option } = Select;

const items = [
  {
    label: "Quản lý Post",
    key: "Post",
  },
  {
    label: "Quản lý nhân sự",
    key: "Staff",
  },
  {
    label: "Doanh thu",
    key: "revenue",
  },
  {
    key: "finance",
    label: "Quản lý tài chính",
  },
];

const { RangePicker } = DatePicker;
const initialData = [
  {
    id: "1",
    key: "1",
    article: "React",
    author: "Facebook",
    content: "React is a JavaScript library for building user interfaces.",
    updateDay: "2021-09-01",
    Status: ["Hoạt động"],
  },
  {
    id: "2",
    key: "2",
    article: "Vue",
    author: "Evan You",
    content: "Vue.js is a progressive JavaScript framework.",
    updateDay: "2021-09-02",
    Status: ["Hoạt động"],
  },
  {
    id: "3",
    key: "3",
    article: "Angular",
    author: "Google",
    content:
      "Angular is a platform and framework for building single-page client applications using HTML and TypeScript.",
    updateDay: "2021-09-03",
    Status: ["Nghỉ"],
  },
  {
    id: "4",
    key: "4",
    article: "Node.js",
    author: "Ryan Dahl",
    content:
      "Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.",
    updateDay: "2021-09-04",
    Status: ["Hoạt động"],
  },
  {
    id: "5",
    key: "5",
    article: "Express.js",
    author: "TJ Holowaychuk",
    content:
      "Express.js, or simply Express, is a back end web application framework for Node.js.",
    updateDay: "2021-09-05",
    Status: ["Nghỉ"],
  },
];

const ListData = () => {
  const [dataSource, setDataSource] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [current, setCurrent] = useState("Post");
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [needRefresh, setNeedRefresh] = useState(false);

  const showModal = () => {
    setIsEditMode(false);
    form.resetFields();
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://6683759c4102471fa4ca20eb.mockapi.io/post"
        ).then((res) => res.json());
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [needRefresh]);

  const createPost = async (newPost) => {
    try {
      const response = await fetch(
        "https://6683759c4102471fa4ca20eb.mockapi.io/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );
      if (response.ok) {
        setNeedRefresh(!needRefresh);
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  const updatePost = async (id, updatedPost) => {
    try {
      const response = await fetch(
        `https://6683759c4102471fa4ca20eb.mockapi.io/post/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPost),
        }
      );
      if (response.ok) {
        setNeedRefresh(!needRefresh);
      }
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  };

  const handleEdit = (record) => {
    setIsEditMode(true);
    setEditingItem(record);
    form.setFieldsValue({
      ...record,
      update_date: dayjs(new Date(record.update_date)),
      status: record.active ? record.active.includes("Hoạt động") : false,
    });

    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `https://6683759c4102471fa4ca20eb.mockapi.io/post/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setNeedRefresh(!needRefresh);
    }
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newData = {
        ...values,
        update_date: values.update_date.format("YYYY-MM-DD"),
      };

      if (isEditMode) {
        updatePost(editingItem.id, newData);
      } else {
        createPost(newData);
      }

      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Article",
      dataIndex: "article",
      key: "article",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Update Day",
      dataIndex: "update_date",
      key: "update_date",
      render: (update_date) =>
        update_date && dayjs(new Date(update_date)).format("DD/MM/YYYY"),
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return status ? "Active" : "InActive";
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Update</Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <div id="Post" style={{ padding: "0px 20px 0 20px" }}>
        <div className="header">
          <h2 className="text table-name"> List of articles </h2>
          <div>
            <Button className="btn btn-reset">
              <FontAwesomeIcon icon={faRotateRight} />
              Refresh
            </Button>
            <Button type="primary" onClick={showModal} className="btn btn-add">
              <FontAwesomeIcon icon={faPlus} />
              Add
            </Button>
            <Modal
              title={isEditMode ? "Edit information" : "Enter information"}
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form
                form={form}
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={handleOk}
                autoComplete="off"
                labelAlign="left"
              >
                <Form.Item
                  label="ID"
                  name="id"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập ID!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập ID!" />
                </Form.Item>

                <Form.Item
                  label="Article"
                  name="article"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên bài viết!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên bài viết!" />
                </Form.Item>
                <Form.Item
                  label="Author"
                  name="author"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên Tác Giả!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên tác giả!" />
                </Form.Item>
                <Form.Item
                  label="Content"
                  name="content"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập nội dung!",
                    },
                  ]}
                >
                  <Mentions placeholder="Nhập nội dung!" />
                </Form.Item>
                <Form.Item
                  label="Update Day"
                  name="update_date"
                  rules={[
                    {
                      required: true,
                      message: "Please input!",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item label="Active" name="status">
                  <Select placeholder="Nhập trạng thái!">
                    <Option value={true}>Hoạt động</Option>
                    <Option value={false}>Không hoạt động</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
        <Filter />
        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
};

export default ListData;
