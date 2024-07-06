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
  Table,
  Popconfirm,
} from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const Page = () => {
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
          "https://6688f0630ea28ca88b867aae.mockapi.io/page"
        ).then((res) => res.json());
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [needRefresh]);

  const createPage = async (newPage) => {
    try {
      const response = await fetch(
        "https://6688f0630ea28ca88b867aae.mockapi.io/page",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPage),
        }
      );
      if (response.ok) {
        setNeedRefresh(!needRefresh);
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  const updatedPage = async (id, updatedPage) => {
    try {
      const response = await fetch(
        `https://6688f0630ea28ca88b867aae.mockapi.io/page/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPage),
        }
      );
      if (response.ok) {
        setNeedRefresh(!needRefresh);
      }
    } catch (error) {
      console.error("Error updating page:", error.message);
    }
  };

  const handleEdit = (record) => {
    console.log(record);
    setIsEditMode(true);
    setEditingItem(record);
    form.setFieldsValue({
      ...record,
      created_at: dayjs(new Date(record.created_at)),
      role: record.ADmin ? record.ADmin.includes("ADmin") : false,
    });

    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const response = await fetch(
      `https://6688f0630ea28ca88b867aae.mockapi.io/page/${id}`,
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
        created_at: values.created_at.format("YYYY-MM-DD"),
      };

      if (isEditMode) {
        updatedPage(editingItem.id, newData);
      } else {
        createPage(newData);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (text, record) => (
        <a href={record.link} target="_blank" rel="noopener noreferrer">
          Xem
        </a>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) =>
        created_at && dayjs(new Date(created_at)).format("DD/MM/YYYY"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        return role ? "ADmin" : "User";
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
      <div id="Page" style={{ padding: "0px 20px 0 20px" }}>
        <div className="header">
          <h2 className="text table-name"> List of pages </h2>
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
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input name!",
                    },
                  ]}
                >
                  <Input placeholder="Enter name!" />
                </Form.Item>
                <Form.Item
                  label="Link"
                  name="link"
                  rules={[
                    {
                      required: true,
                      message: "Please input Link!",
                    },
                  ]}
                >
                  <Input placeholder="Enter Link!" />
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input Description!",
                    },
                  ]}
                >
                  <Mentions placeholder="Enter Description!" />
                </Form.Item>
                <Form.Item
                  label="Created at"
                  name="created_at"
                  rules={[
                    {
                      required: true,
                      message: "Please input Created at!",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item label="Role" name="role">
                  <Select placeholder="Enter Role!">
                    <Option value={true}>ADmin</Option>
                    <Option value={false}>User</Option>
                  </Select>
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

export default Page;
