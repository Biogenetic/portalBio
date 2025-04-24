import React, { useContext, useEffect } from 'react'
import { message, Typography } from 'antd';
import { CopyOutlined } from '@ant-design/icons'
import { LayoutContext } from '../../contexts/LayoutContext'
import TableForms from '../../components/forms/TableForms';
import { AuthContext } from '../../contexts/AuthContext';


const Forms = () => {
    const { setTitleAndSubTitle, setBreadcrumbs } = useContext(LayoutContext);
    const { user, redirectIfNotAuthenticate } = useContext(AuthContext);
    
    useEffect(() => {    
        if(redirectIfNotAuthenticate())
        {
            return;
        }
        setTitleAndSubTitle("Formulários", "Preenchimento de formulários com validade juridica.");
        setBreadcrumbs([
            {
                title: 'Inicio',
                url : 'dashboard',
                isSideBarItem : true
            },
            {
                title: 'Formulários',
                url : 'formulario/formularios',
                isSideBarItem : true
            }
        ]);
    }, [])

    const copyUsername = (e) => {
        try {
            navigator.clipboard.writeText(user.username);
            message.success("Login copiado com sucesso");      
        } catch (error) {
            console.log(error);
            message.warn("Falha ao copiar login");      
        }
    }

    return (
        <>
            <Typography.Text 
                style={{cursor: 'pointer'}}
                onClick={copyUsername}>
                * Use seu usuário de login ao preencher o formulário <strong>{ user.username }</strong>
                <CopyOutlined                     
                    style={{ marginLeft: '4px' }}/>
            </Typography.Text>
            <TableForms 
                title="Formulários"
                type="forms"
                emptyMessage="Nenhum formulário foi localizado"
            />
        </>
 
    )    
}

export default Forms