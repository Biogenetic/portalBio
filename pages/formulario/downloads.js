import React, { useContext, useEffect } from 'react'
import { LayoutContext } from '../../contexts/LayoutContext'
import TableForms from '../../components/forms/TableForms';
import { AuthContext } from '../../contexts/AuthContext';


const Downloads = () => {
    const { setTitleAndSubTitle, setBreadcrumbs } = useContext(LayoutContext);
    const { redirectIfNotAuthenticate } = useContext(AuthContext);
    
    useEffect(() => {    
        if(redirectIfNotAuthenticate())
        {
            return;
        }
        setTitleAndSubTitle("Downloads", "Página de downloads.");
        setBreadcrumbs([
            {
                title: 'Inicio',
                url : 'dashboard',
                isSideBarItem : true
            },
            {
                title: 'Downloads',
                url : 'formulario/downloads',
                isSideBarItem : true
            }
        ]);
    }, [])

    return (
        <TableForms 
            title="Formulários"
            type="downloads"
            emptyMessage="Nenhum formulário de download foi localizado"
        />
    )    
}

export default Downloads