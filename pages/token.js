import React, { useState } from "react";
import { Button, Card, Form, Input, message } from 'antd'
import { EllipsisOutlined, EyeFilled, EyeInvisibleFilled, LockOutlined } from "@ant-design/icons"
import LoginLayout from "../components/auth/LoginLayout";
import { resultByToken } from "../services/exams";
import { Helmet } from "react-helmet";
import Link from "next/link";


const Token = () => {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tokenData, setTokenData] = useState({
    status: '0',
    retorno: ''
  });

  const onFinish = ({ token, password }) => {
    setLoading(true);
    resultByToken({ token, password })
      .then(({ data }) => {
        const { status, retorno } = data.result;

        if (status == '0') {
          message.error(retorno);
          return;
        }
        else if (status == '1') {
          message.warning(retorno);
          return;
        }

        setTokenData(data.result);
      })
      .catch(er => {
        console.log(er);
        message.error("Ocorreu uma falha para buscar o laudo");
      })
      .finally(() => setLoading(false));
  }

  return (
    <LoginLayout>
      <Helmet>
        <title>Biogenetics</title>
      </Helmet>
      <Card>
        <h5 className="login-title">Resultados</h5>
        <p className="login-sub-title">Digite abaixo o Token que você recebeu no dia do seu exame.</p>
        <Form name="login" form={form} initialValues={{ username: "", password: "" }} onFinish={onFinish}>
          <Form.Item
            style={{ marginBottom: 16 }}
            name="token"
            rules={[
              {
                required: true,
                message: "Por favor informe o seu token!",
              },
            ]}
          >
            <Input
              size="large"
              style={{ width: "100%" }}
              placeholder={"Token"}
              prefix={
                <EllipsisOutlined />
              }
            />
          </Form.Item>
          <Form.Item
            name="password"
            style={{ marginBottom: 16 }}
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
                visible => (visible ? <EyeFilled style={{ color: '#414141' }} /> : <EyeInvisibleFilled style={{ color: '#414141' }} />)
              }

            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, marginTop: "16px", textAlign: 'center' }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              shape="round"
              size='large'
              loading={loading}
            >
              Buscar Resultado
            </Button>
            {
              tokenData.retorno &&
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '1.2',
                  color: '#004ba7',
                  textAlign: 'left',
                  marginTop: '16px'
                }}>
                O download do seu seu exame será feito automaticamente. Caso isso não ocorra,
                <Link href={tokenData.retorno}>
                  <a
                    style={{
                      fontWeight: 'bold',
                      textDecoration: 'underline',
                      marginLeft: '2px'
                    }}
                    target="_blank"
                    rel="noreferrer"
                  >clique aqui
                  </a>
                </Link>

              </p>
            }

          </Form.Item>
        </Form>
      </Card>
    </LoginLayout>
  )
}

export default Token;