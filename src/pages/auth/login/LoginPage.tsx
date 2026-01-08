import { useNavigate, Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { Button, Input, Form, Card } from "antd";
import { UserOutlined, LockOutlined, GlobalOutlined } from "@ant-design/icons";
import "./Login.scss";

const LoginPage = () => {
  const { login, isLoading, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Agar foydalanuvchi allaqachon login qilgan bo'lsa, dashboardga yo'naltirish
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (values: {
    username: string;
    password: string;
    subdomain: string;
  }) => {
    try {
      await login({
        username: values.username,
        password: values.password,
        subdomain: values.subdomain,
      });
      navigate("/dashboard");
    } catch {
      // Error toast ko'rsatiladi AuthContext ichida
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" bordered={false}>
        <div className="login-header">
          <h1>OX-SYS Login</h1>
          <p>Tizimga kirish uchun ma'lumotlarni kiriting</p>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
          initialValues={{
            username: "user_task",
            password: "user_task",
            subdomain: "toko",
          }}
        >
          <Form.Item
            name="subdomain"
            label="Subdomain"
            rules={[
              { required: true, message: "Subdomain kiriting!" },
              { min: 2, message: "Kamida 2 ta belgi bo'lishi kerak" },
            ]}
          >
            <Input
              prefix={<GlobalOutlined />}
              placeholder="toko"
              size="large"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Username kiriting!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="user_task"
              size="large"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Parol kiriting!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="********"
              size="large"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              block
            >
              {isLoading ? "Kirilyapti..." : "Kirish"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
