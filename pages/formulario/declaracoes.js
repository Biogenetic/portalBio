import React, { useContext, useEffect } from 'react'
import { LayoutContext } from '../../contexts/LayoutContext'
import TableForms from '../../components/forms/TableForms';
import { AuthContext } from '../../contexts/AuthContext';


const Declaracoes = () => {
    const { setTitleAndSubTitle, setBreadcrumbs } = useContext(LayoutContext);
    const { redirectIfNotAuthenticate } = useContext(AuthContext);
    
    useEffect(() => {    
        if(redirectIfNotAuthenticate())
        {
            return;
        }
        

        setTitleAndSubTitle("Declarações", "Preenchimento de declarações com validade juridica.");
        setBreadcrumbs([
            {
                title: 'Inicio',
                url : 'dashboard',
                isSideBarItem : true
            },
            {
                title: 'Declarações',
                url : 'formulario/declaracoes',
                isSideBarItem : true
            }
        ]);
    }, [])

    return (
        <TableForms 
            title="Declarações"
            type="declarations"
            emptyMessage="Nenhuma declaração foi localizada"
        />
    )    
}

export default Declaracoes