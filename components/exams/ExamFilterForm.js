import React, { useState } from 'react'
import { Form, Row, Col, Button, Input, Select } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';


const { Option } = Select;

const ExamFilterForm = ({onFilter, onCancel}) => {
    
    const [form] = Form.useForm();
    const [maximezedFilters, setMaximezedFilters ] = useState(false);

    const maximezedFiltersHandler = (e) => {
        e.preventDefault();
        setMaximezedFilters(!maximezedFilters);
    }

    const onFinishHandler = (fields) => {
        onFilter && onFilter(fields)
    }

    const onCancelhandler = () => {
        form.resetFields();
        onCancel && onCancel();
    }

    return (
        <Form name="examFilterForm" form={form} onFinish={onFinishHandler}>
            <Row>
                <Col span={maximezedFilters ? 24 : 19}>
                    <Row>
                        <Col span={6}>
                        <Form.Item
                            style={{padding: '0 4px'}}
                            labelCol={{span : 24}}
                            label="Código :"
                            name="codigoExame"
                            >
                                <Input placeholder="Informe o pedido" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                        <Form.Item
                            style={{padding: '0 4px'}}
                            labelCol={{span : 24}}
                            label="Paciente(s)"
                            name="pessoas"
                            >
                                <Input placeholder="Informe o(s) nome(s)" />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                        <Form.Item
                            style={{padding: '0 4px'}}
                            labelCol={{span : 24}}
                            label="Pendências"
                            name="pendencias"
                            >
                                <Select placeholder="Selecione o filtro">
                                    <Option value="Sim">Sim</Option>
                                    <Option value="Não">Não</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6} >
                        <Form.Item
                           style={{padding: '0 4px'}}
                            labelCol={{span : 24}}
                            label="Exame"
                            name="exame"
                            >
                                <Input placeholder="Informe o exame" />
                            </Form.Item>
                        </Col>  
                    </Row>
                    {
                        maximezedFilters &&
                        <Row>
                            <Col span={6}>
                            <Form.Item
                                style={{padding: '0 4px'}}
                                labelCol={{span : 24}}
                                label="Data Início Entrada:"
                                name="dataInicioEntrada"
                                >
                                    <Input type='date'  />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                            <Form.Item
                                style={{padding: '0 4px'}}
                                labelCol={{span : 24}}
                                label="Data Fim Entrada:"
                                name="dataFimEntrada"
                                >
                                    <Input type='date' />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                            <Form.Item
                                style={{padding: '0 4px'}}
                                labelCol={{span : 24}}
                                label="Data Início Entrega:"
                                name="dataInicioEntrega"
                                >
                                    <Input type='date' placeholder="Informe o pedido" />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                            <Form.Item
                                style={{padding: '0 4px'}}
                                labelCol={{span : 24}}
                                label="Data Fim Entrega:"
                                name="dataFimEntrega"
                                >
                                    <Input type='date' placeholder="Informe o pedido" />
                                </Form.Item>
                            </Col>
                        </Row>
                    }
                </Col>
                <Col 
                    span={maximezedFilters ? 24 : 5} 
                    style={{
                        display: 'flex', 
                        justifyContent: 'flex-end' ,
                    }}>
                    <Button 
                        key="submit"
                        type="primary" 
                        style={{
                                marginRight: 8, 
                                marginTop: 40
                            }}
                        htmlType="submit">Buscar</Button>

                    <Button 
                        onClick={onCancelhandler}
                        style={{
                            marginRight: 8, 
                            marginTop: 40
                        }}>
                        Cancelar</Button>
                    <a 
                        onClick={maximezedFiltersHandler} 
                        style={{marginTop: 44}}>
                        Ver mais Filtros 
                        <span style={{marginLeft: 8}}>
                            {
                                maximezedFilters ? <ArrowUpOutlined/> : <ArrowDownOutlined/>
                            }                            
                        </span>
                    </a>
                </Col>
            </Row>
        </Form>
    )
}


export default ExamFilterForm;