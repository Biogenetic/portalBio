import React, {useState} from 'react';
import { Modal, Form, Input, Button, message } from "antd"
import {EyeFilled, EyeInvisibleFilled, LockOutlined } from "@ant-design/icons"
import { changePassword } from '../../services/auth';


const ChangePasswordModal = ({visible, setVisible}) => {
    const [form] = Form.useForm();
    const [ disabled, setDisabled ] = useState(true)

    const onCancel = () => {
        form.resetFields(['password', 'changePassword']);
        setVisible(false);
    }

    const onFinish = async ({password}) => {
        try {
            await changePassword(password);

            message.success('Senha alterada com sucesso!');
            form.resetFields(['password', 'changePassword']);
            setVisible(false);
    
        } catch (error) {
          console.log(error);
          message.error('Falha ao alterar a senha, tente novamente.');
        }
      };

    return(
        <Modal 
            visible={visible}
            title="Alterar Senha"
            onCancel={onCancel}
            footer={null}>
            <Form name="changePasswordForm" form={form}  onFinish={onFinish}>
                <Form.Item
                name="password"
                style={{marginBottom: 16}}
                shouldUpdate={(prev, next) => prev.password !== next.password || prev.changePassword !== next.changePassword}
                rules={[
                    {
                    required: true,
                    min: 6,
                    message: 'A senha deve ter no mínimo 6 caracteres',
                    }
                ]}
                >
                <Input.Password
                    size="large"
                    style={{ width: "100%" }}
                    placeholder={"Nova senha"}
                    prefix={
                      <LockOutlined  style={{color: '#414141'}}/>
                    }
                    iconRender={
                    visible => (visible ?  <EyeFilled style={{color: '#414141'}}/> : <EyeInvisibleFilled style={{color: '#414141'}}/>)
                    }
                />
                </Form.Item>

                <Form.Item
                name="changePassword"
                dependencies={['password']}
                rules={[
                    {
                    required: true,
                    message: " "
                    },
                    ({ getFieldValue }) => ({
                    validator(rule, value) {
                        if (!!value && getFieldValue('password') === value) {
                        setDisabled(false);
                        return Promise.resolve();
                        }

                        if (disabled === false) {
                        setDisabled(true);
                        }
                        return Promise.reject('As senhas devem ser iguais.');
                    },
                    }),
                ]}
                >
                <Input.Password
                    size="large"
                    style={{ width: "100%" }}
                    placeholder={"Alterar Senha"}
                    prefix={
                        <LockOutlined style={{color: '#414141'}}/>
                    }
                    iconRender={
                    visible => (visible ?  <EyeFilled style={{color: '#414141'}}/> : <EyeInvisibleFilled style={{color: '#414141'}}/>)
                    }
                />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                    <div className='change-password-buttons'>
                        <Button
                            onClick={onCancel}     
                            style={{marginRight: 8}}                   
                        >
                            Cancelar
                        </Button>

                        <Button
                            key="submit"
                            disabled={disabled}
                            htmlType="submit"
                            type="primary"
                        >
                            Alterar Senha
                        </Button>

                    </div>
                    
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default ChangePasswordModal;