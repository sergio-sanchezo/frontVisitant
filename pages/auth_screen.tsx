import { EyeInvisibleTwoTone, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input, InputNumber } from "antd";
import React from "react";
import useAuth from "../auth/AuthContext";

const AuthScreen = () => {
  const { startLogin, startRegister } = useAuth();
  const onFinishLogin = (data: any) => {
    startLogin(data.email, data.password);
  };
  const onFinishRegister = (data: any) => {
    startRegister(data);
  };
  return (
    <div className="auth-container">
      <div className="main-bg">
        <div className="login-container">
          <Form onFinish={onFinishLogin}>
            <h2 className="subt-auth">Iniciar sesión</h2>
            <span>Email:</span>
            <Form.Item
              name="email"
              rules={[
                { required: true, type: "email", message: "Email no válido" },
              ]}
            >
              <Input />
            </Form.Item>
            <span>Contraseña:</span>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Por favor escribe una contraseña" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Iniciar sesión</Button>
            </Form.Item>
          </Form>
        </div>
        <div className="signup-container">
          <Form onFinish={onFinishRegister}>
            <h2 className="subt-auth">Registrarse</h2>
            <span>Nombre:</span>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "Por favor escribe tu nombre" },
              ]}
            >
              <Input />
            </Form.Item>
            <span>Apellido:</span>
            <Form.Item
              name="lastname"
              rules={[
                { required: true, message: "Por favor escribe tu apellido" },
              ]}
            >
              <Input />
            </Form.Item>
            <span>Documento:</span>
            <Form.Item
              name="document"
              rules={[
                { required: true, message: "Por favor escribe un documento" },
              ]}
            >
              <InputNumber style={{ width: "100%" }} max={9999999999} />
            </Form.Item>
            <span>Email:</span>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Email no válido", type: "email" },
              ]}
            >
              <Input />
            </Form.Item>
            <span>Contraseña:</span>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Por favor escribe una contraseña" },
              ]}
            >
              <Input.Password
                iconRender={(visible: any) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleTwoTone />
                }
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Crear cuenta
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AuthScreen);
