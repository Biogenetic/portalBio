import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AppLayout from '../app-layout/AppLayout';



const AppWrapper = ({children}) => {
    const { user } = useContext(AuthContext);
    
    return(
        <>
            {
                user?.isLogged ? 
                    <AppLayout>
                        { children }
                    </AppLayout> 
                : 
                    <>
                        { children }
                    </>
                
            }
        </>
    )
}


export default AppWrapper;