import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { message, Table } from 'antd';
import { FormOutlined } from '@ant-design/icons'
import { getForms, getDeclarations, getDownloads } from '../../services/forms'
import AppCard from '../app-card/AppCard';

const TableForms = ({title, type, emptyMessage}) => {
    const [forms, setForms] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: "Categoria",
            dataIndex: "categoriaDescricao"  ,
            key: "categoriaDescricao",
            width: "300px",
        },
        {
            title: "Código",
            dataIndex: "codigoDocumento"  ,
            key: "codigoDocumento",
            width: "150px",
        },
        {
            title: "Descrição",
            dataIndex: "descricao"  ,
            key: "descricao",
            render: (descricao, record) => {
                return (
                    <a href={record.token} target="_blank" rel="noreferrer">
                      {descricao}
                    </a>
                )
              }    
        },
        {
            title: "Ações",
            dataIndex: "token",
            width: "75px",
            render: token => {
                return (
                    <a href={token} className="db" target="_blank" rel="noreferrer">
                      <FormOutlined
                        style={{ color: "#414141", fontSize: "19px" }}
                      />
                    </a>
                )
            }
        }
    ];

    const loadForms = async () => {
        setLoading(true);
        try {
            if (type === 'forms')
            {
                const { data } = await getForms();
                setForms(data.result);
            }
            else if (type === 'declarations')
            {                
                const { data } = await getDeclarations();
                setForms(data.result);
            }
            else if (type === "downloads")
            {
                const { data } = await getDownloads();
                setForms(data.result);
            }
            else 
            {
                message.warning('Nenhum tipo de formulário foi informado');
                setForms([]);
            }
        } 
        catch (error) 
        {
            console.log(error);
            setForms([]);
            message.error("Ocorreu um erro para consultar os formulários")
        }
        finally
        {
           setLoading(false);    
        }
    }
    
    useEffect(() => {
        loadForms();
    }, [type])

    return (
        <>
            <Helmet>
                <title>{title} - BioGenetics</title>
            </Helmet>

            <AppCard>
                <Table 
                    locale={{ emptyText: emptyMessage }}
                    loading={loading}
                    dataSource={forms} 
                    columns={columns}
                    rowKey={record => record.id}
                    scroll={{ x : 400 }}
                    pagination={{
                    defaultPageSize: 10, 
                    showSizeChanger: true, 
                    pageSizeOptions: ['10', '20', '30'],
                    position: ['bottomRight']
                    }}/>
            </AppCard>
        </>
    )
        
       
}

export default TableForms