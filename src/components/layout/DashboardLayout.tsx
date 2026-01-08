import { useState } from "react";

import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import HeaderContent from "./header/HeaderContent";

const { Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/*  */}
      <Sidebar collapsed={collapsed} />
      {/*  */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        {/*  */}

        <HeaderContent collapsed={collapsed} setCollapsed={setCollapsed} />
        {/*  */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            borderRadius: "5px",
            minHeight: "calc(100vh - 112px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
