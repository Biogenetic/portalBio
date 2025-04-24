import React, {useContext} from "react";
import {Button, Card, Form, Input, Checkbox } from 'antd'
import LoginLayout from "../components/auth/LoginLayout";
import { AuthContext } from '../contexts/AuthContext'
import { EyeFilled, EyeInvisibleFilled, LockOutlined, UserOutlined } from "@ant-design/icons"
import {Helmet} from "react-helmet";

const Conveniados = () => {

    const [form] = Form.useForm()
    const { signIn } = useContext(AuthContext);

    const onFinish = ({username, password}) => {
        signIn(username, password);
    }

    return (
        <LoginLayout>
         <Helmet>
            <title>Biogenetics | Via Laboratório</title>
          </Helmet>
          <Card>                
            <h5 className="login-title">Conveniados</h5>
            <p className="login-sub-title">Digite o usuário e senha para continuar.</p>
            <Form name="login" form={form} initialValues={{ username: "", password: "" }} onFinish={onFinish}>
              <Form.Item
                style={{marginBottom: 16}}
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Por favor informe o seu usuário!",
                  },
                ]}
              >
                <Input
                  size="large"
                  style={{ width: "100%" }}
                  placeholder={"Usuário"}
                  prefix={
                      <UserOutlined />
                  }
                />
              </Form.Item>
              <Form.Item
                name="password"
                style={{marginBottom: 16}}
                rules={[
                  {
                    required: true,
                    message: "Por favor informe a sua senha!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  style={{ width: "100%" }}
                  placeholder={"Senha"}
                  prefix={
                      <LockOutlined />
                  }
                  iconRender={
                    visible => (visible ?  <EyeFilled style={{color: '#414141'}}/> : <EyeInvisibleFilled style={{color: '#414141'}}/>)
                  }

                />
              </Form.Item>
              <Form.Item
                name="maior_18"
                valuePropName="checked"
                rules={[{ required: true, message: 'Campo obrigatório.' }]}>
                <Checkbox >Ao prosseguir, concordo com os
                  <a href="https://biogenetics.com.br/temos-de-uso"
                    rel='noreferrer' target='_blank'> Termos de Uso</a> e a <a
                      href="https://biogenetics.com.br/politica-de-privacidade"  rel='noreferrer' target='_blank'>Política
                    de Privacidade e Proteção de Dados
                  </a>
                </Checkbox>
              </Form.Item>
              <Form.Item style={{ marginBottom: 0, marginTop: "16px", textAlign: 'center' }}>
                <Button              
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                >
                  Acessar sua conta
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </LoginLayout>
    )
}

export default Conveniados;