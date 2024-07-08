import "./App.css";
import Header from "./screen/Header/Header";
import "./cssCustom/header.css";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";

function App() {
  return (
    <Layout>
      <Header />
      <Content style={styles.content}>
        <Outlet />
      </Content>
      <Footer style={styles.footer}>thientt1905</Footer>
    </Layout>
  );
}

export default App;
const styles = {
  content: { padding: "0 32px", minHeight: "calc(100vh - 134px)" },
  layout: { padding: "12px 0" },
  footer: { textAlign: "center" },
};
