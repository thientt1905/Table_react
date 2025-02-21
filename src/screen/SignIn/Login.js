import React from "react";
import "../../cssCustom/Login.scss";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row } from "antd";
import Layout, { Content } from "antd/es/layout/layout";
import { Image } from "antd";

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        localStorage.setItem("token_user", data.token);
        navigate("/");
      } else {
        alert("Incorrect email or password!");
      }
    } catch (error) {
      console.error("There was a problem with the login request:", error);
      alert("Error logging in. Please try again later.");
    }
  };
  const imageUrl =
    "https://drscdn.500px.org/photo/1096091092/q%3D90_m%3D2048/v2?sig=1771c933b0a081c603a58dac6b46ba0f2ca87b44896c7cd275cacaf8763e623c";
  return (
    <Layout
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Content>
        <Row
          style={{
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Col span={8}>
            <div
              style={{
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#2196f3"
                  d="M41.25,22.75c-1,0-1.75,0-2.625,0c-0.25,0-0.625,0.875-0.25,0.875c0.459,0,0.72-0.005,1.5,0	c0.095,0.001,0.5,0,0.5,0.5c0,0.285-0.125,0.625-0.75,0.625c-0.375,0-0.625,0-1.75,0c-0.375,0-0.625,1-0.625,1.375	c0,0.25,0.125,0.25,0.25,0.25c0.258,0,2.127-0.666,2.5-0.625c0.297,0.033,0.5,0.274,0.5,0.625c0,0.625-2.096,1.621-3.375,1.621	c-0.5,0-1.375-0.353-1.375-1.371c0-0.75,0.5-1.75,0.5-2s-0.125-0.25-0.125-0.5s0.125-0.5,0.625-0.5c0.125,0,0.25-0.375,0.375-1	c0.049-0.247-0.25-0.125-0.75-0.375c-0.45-0.225-0.371-0.657-0.125-0.769c0.268-0.121,2.877-0.179,4.311-0.257	c0.355-0.019,0.751-0.013,1.064,1.026C41.704,22.513,41.5,22.75,41.25,22.75z"
                ></path>
                <path
                  fill="#2196f3"
                  d="M33.625,27.875c-0.81,0-1.375-1.375-1.875-2.75C31.425,24.23,31.375,24,31.25,24S31,24.5,31,25.375	C31,27.75,30.625,28,30.25,28c-0.5,0-0.625-0.896-0.625-1.5c0-3.25,1-4.75,1.375-4.75c0.183,0,0.425,0.084,0.625,0.375	c1.375,2,1.75,3.875,2,3.875c0.125,0,0.25-0.375,0.25-0.875c0-2.25-0.5-3.125-0.75-4.25c-0.06-0.271,0.144-0.409,0.375-0.25	c0.599,0.412,1.75,1.625,1.75,4S34.387,27.875,33.625,27.875z"
                ></path>
                <path
                  fill="#2196f3"
                  d="M29,22.25c0,0.375-0.25,0.625-0.75,0.625c-0.75,0-1.375-0.25-2.5-0.25c-2,0-2,0.25-2,0.5	c0,0.376,2,0.25,3.25,0.5s2.125,0.625,2.125,2C29.111,26.523,28.625,28,26,28c-1.875,0-3.375-0.875-3.375-2	c0-0.389,0.125-1.25,1.625-1.25c1.125,0,3,0.5,3,0.875S26.777,26.25,26,26.25c-1,0-1.625-0.75-2.375-0.75	c-0.25,0-0.375,0.125-0.375,0.375c0,0.75,1.875,1,2.75,1c0.801,0,2-0.25,2-1.125c0-0.5-0.375-1-2.5-1.25	c-0.517-0.061-2.875,0-2.875-1.375c0-1.125,1.02-1.875,3.375-1.875S29,21.75,29,22.25z"
                ></path>
                <path
                  fill="#2196f3"
                  d="M21.25,28c-0.264,0-0.524-0.115-0.633-0.266c-0.189-0.235-0.261-0.35-0.242-2.359	c0.047-1.49,0.125-3.875,0.75-3.875c0.5,0,0.875,0.625,0.875,4.25C22,28,21.875,28,21.25,28z"
                ></path>
                <path
                  fill="#2196f3"
                  d="M24.125,15.875c0,0-0.125-0.871-1.538-0.871C20,15.004,19,17,19,17.625c0,1,0.375,1.25,0.5,1.5	s0,0.5,0,0.75s0.125,0.375,0.375,0.375s0.281-0.219,0.375-0.375s0.25-0.25,0.25-0.25S20.75,20,22.25,20	c1.802,0,3.75-1.575,3.75-2.75C26,15.625,24.133,15.881,24.125,15.875z M20,18.375c-0.125-0.25,0.125-2,2.125-2.125	C21.5,16.625,20.75,17.125,20,18.375z M20.951,18.84c0.674-1.465,2.172-2.26,2.85-2.26c0.573,0,0.823,0.295,0.823,0.67	C24.625,18,22.875,19.375,20.951,18.84z"
                ></path>
                <path
                  fill="#2196f3"
                  d="M46.75,21.75c-1.375,0-3.125,2.25-3.875,4.125c-0.5-0.75-0.125-1.75,0.25-2.375	c0.295-0.492,1.125-1.375,1.125-2c0-0.125,0-0.375-0.25-0.375s-0.474,0.148-0.81,0.5c-1.315,1.375-2.065,2.694-2.065,3.75	c0,1.5,0.625,1.875,1.125,2.125c-0.5,1.25-1,3.625-1,5.25c0,0.5,0.5,1.25,1.375,1.25c0.411,0,0.5-0.125,0.5-0.625	c0-3.125,0.75-5.375,0.75-5.375C45,28,48,26.991,48,23.5C48,22.155,47.375,21.75,46.75,21.75z M46.051,25.681	c-0.232,0.213-0.926,0.694-1.551,0.819c0.25-0.875,1-2.125,1.75-3C46.71,22.963,46.881,23,47,23c0.204,0,0.254,0.25,0.254,0.375	C47.254,24.5,46.414,25.348,46.051,25.681z"
                ></path>
                <path
                  fill="#2196f3"
                  d="M4.25,14C1.375,14,0,14.604,0,15.375c0,0.37,0.25,1,1.25,1c0,0,0.5,0,0.5-0.375	c0-0.25-0.277-0.25-0.5-0.25C1,15.75,1,15.625,1,15.625c0-0.25,0.5-0.5,3.25-0.5c6.125,0,13.125,5.391,13.125,9	c0,3.25-3.774,3.5-5.25,3.5c-1.5,0-2.75-0.25-2.75-0.25s0-3.157,0-4.375c3,0,4.466,0.425,4.466,1.025S13,24.375,13,24.625	s0.528,0.403,0.875,0.375C14.222,24.972,15,24.853,15,23.875c0-1-0.75-2.5-5.625-2.5c0,0,0-1.5,0-1.75S9.25,18,8.5,18	s-0.875,1.287-0.875,1.625c0,0.875-0.011,1.75-0.011,1.75C5.875,21.5,3,22.125,3,24c0,1.75,2.625,3.125,4.625,4.125	c0,0.625,0,0.625,0,1S7.875,30,8.5,30c0.75,0,0.875-0.625,0.875-1.375c0,0,1.25,0.375,2.875,0.375c5.625,0,7.25-2.875,7.25-5	C19.5,19.25,12.625,14,4.25,14z M7.625,26.75c0,0-3.875-1.625-3.875-2.75c0-1,3-1,3.875-1V26.75z"
                ></path>
              </svg>
            </div>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{
                maxWidth: 400,
                margin: "0 auto",
                padding: "5px",
              }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={onFinish}
              colon={false}
            >
              <Form.Item
                label={
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: "white",
                      textShadow: "1px 1px 2px black",
                    }}
                  >
                    Email:
                  </span>
                }
                labelAlign="left"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  style={{
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    borderRadius: "10px",
                    padding: "10px",
                    fontSize: "15px",
                  }}
                />
              </Form.Item>

              <Form.Item
                label={
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      color: "white",
                      textShadow: "1px 1px 2px black",
                    }}
                  >
                    Password:
                  </span>
                }
                labelAlign="left"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  style={{
                    color: "white",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    borderRadius: "10px",
                    padding: "10px",
                    fontSize: "15px",
                  }}
                />
              </Form.Item>

              <Form.Item
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="ghost-round full-width"
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "white",
                      textShadow: "1px 1px 2px black",
                    }}
                  >
                    Login
                  </span>
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default Login;
