import { useAuthContext } from "@/context/AuthContext";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Avatar, Typography, Popconfirm } from "antd";
import type { MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";

const { Text } = Typography;

const HeaderContent = ({
  setCollapsed,
  collapsed,
}: {
  setCollapsed: (collapsed: boolean) => void;
  collapsed: boolean;
}) => {
  const { logout } = useAuthContext();

  const items: MenuProps["items"] = [
    {
      key: "user-info",
      label: (
        <div style={{ padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
          <Text strong style={{ display: "block", marginBottom: "4px" }}>
            Test User
          </Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Admin
          </Text>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <Popconfirm
          title="Tizimdan chiqmoqchimisiz?"
          onConfirm={logout}
          okText="Ha"
          cancelText="Yo'q"
          placement="left"
        >
          <span style={{ width: "100%", display: "block" }}>Chiqish</span>
        </Popconfirm>
      ),
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <Header
      style={{
        padding: "0 16px",
        background: "#fff",
        height: "64px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          width: "100%",
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          arrow
          trigger={["click"]}
        >
          <Button type="default" style={{ cursor: "pointer", height: "40px" }}>
            <Avatar
              style={{ backgroundColor: "#1890ff" }}
              icon={<UserOutlined />}
            />
            <Text>
              Test User <DownOutlined />
            </Text>
          </Button>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderContent;
