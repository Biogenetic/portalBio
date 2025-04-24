import { useState, createContext, useEffect } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router'


import { login } from '../services/auth';
import { message } from 'antd';


const twoHour = 60* 60 * 2;

export const AuthContext = createContext();

export function AuthProvider({children}) {
    
    const [user, setUser] = useState({
        username : '',
        hash : '',
        isLogged : false
    });

    useEffect(() => {
        const { biogUser } = parseCookies();
        const isTokenPage = window.location.pathname === '/token';
        
        if (! biogUser)
        {
            if (! isTokenPage)
            {
                Router.push('/conveniados');
            }            
            return;
        }

        if (biogUser)
            setUser(JSON.parse(biogUser));
    }, [])
    
    async function signIn(username, password) {
        try {
            const { data } = await login(username, password);
            const userProps  = {
                username : username,
                hash : data.result,
                isLogged : true
            };
            setUser(userProps);
            setCookie(undefined, 'biogUser', JSON.stringify(userProps), {
                maxAge: twoHour
            })
            Router.push('/exames/consulta');
        } catch (error) {
            console.log(error);
            message.warn("Usuário ou senha invalido");
        }

    }

    function logoff() {
        const userProps  = {
            username : '',
            hash : '',
            isLogged : false
        };
        setUser(userProps);
        destroyCookie(null, 'biogUser');
        Router.push('/conveniados');
    }

    function redirectIfNotAuthenticate()
    {
        const { biogUser } = parseCookies();        
        if (! biogUser)
        {        
            const userProps  = {
                username : '',
                hash : '',
                isLogged : false
            };
            setUser(userProps);
            Router.push('/conveniados');
            return true;
        }

        return false;
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            signIn, 
            logoff,
            redirectIfNotAuthenticate }}>
            {children}
        </AuthContext.Provider>
    )
}