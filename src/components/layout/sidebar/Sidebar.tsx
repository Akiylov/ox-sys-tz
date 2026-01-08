import {
  AreaChartOutlined,
  SettingFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate();
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[window.location.pathname]}
        onClick={({ key }) => navigate(key)}
        items={[
          {
            key: "/dashboard",
            icon: <AreaChartOutlined />,
            label: "Dashboard",
          },
          {
            key: "/dashboard/profile",
            icon: <UnorderedListOutlined />,
            label: "Variactions table",
          },
          {
            key: "/dashboard/settings",
            icon: <SettingFilled />,
            label: "Settings",
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
