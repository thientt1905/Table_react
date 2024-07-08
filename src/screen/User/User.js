import React, { useEffect, useState } from "react";
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
import dayjs from "dayjs";

const { Option } = Select;

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
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
          "https://6683759c4102471fa4ca20eb.mockapi.io/user"
        ).then((res) => res.json());
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [needRefresh]);

  const createUser = async (newUser) => {
    try {
      const response = await fetch(
        "https://6683759c4102471fa4ca20eb.mockapi.io/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      if (response.ok) {
        setNeedRefresh(!needRefresh);
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  const updateUser = async (id, updateUser) => {
    try {
      const response = await fetch(
        `https://6683759c4102471fa4ca20eb.mockapi.io/user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateUser),
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
      birth_day: dayjs(new Date(record.birth_day)),
    });

    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `https://6683759c4102471fa4ca20eb.mockapi.io/user/${id}`,
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
        birth_day: values.birth_day.format("YYYY-MM-DD"),
      };

      if (isEditMode) {
        updateUser(editingItem.id, newData);
      } else {
        createUser(newData);
      }

      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "UserName",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "CCCD",
      dataIndex: "cccd",
      key: "cccd",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "BirthDay",
      dataIndex: "birth_day",
      key: "birth_day",
      render: (birth_day) =>
        birth_day && dayjs(new Date(birth_day)).format("DD/MM/YYYY"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
          <h2 className="text table-name"> List of users </h2>
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
                      message: "Please input ID!",
                    },
                  ]}
                >
                  <Input placeholder="Enter ID!" />
                </Form.Item>

                <Form.Item
                  label="UserName"
                  name="user_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input UserName!",
                    },
                  ]}
                >
                  <Input placeholder="Enter UserName!" />
                </Form.Item>
                <Form.Item
                  label="CCCD"
                  name="cccd"
                  rules={[
                    {
                      required: true,
                      message: "Please input CCCD!",
                    },
                  ]}
                >
                  <Input placeholder="Enter CCCD!" />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input Phone!",
                    },
                  ]}
                >
                  <Mentions placeholder="Enter Phone!" />
                </Form.Item>
                <Form.Item
                  label="BirthDay"
                  name="birth_day"
                  rules={[
                    {
                      required: true,
                      message: "Please input BirthDay !",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input Address!",
                    },
                  ]}
                >
                  <Mentions placeholder="Enter Address!" />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>

        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
};

export default User;
