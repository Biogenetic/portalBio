import React, { useContext } from 'react';
import { Layout } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import LoginLayoutFooterLeft from './LoginLayoutFooterLeft';
import LoginLayoutFooterRight from './LoginLayoutFooterRight';
import Logo from '../logo/Logo'
import { LayoutContext } from '../../contexts/LayoutContext';
import Link from 'next/link';

const { Header, Content } = Layout

const LoginLayout = ({ children }) => {

    const { isMobile } = useContext(LayoutContext);

    return (
        <Layout>
            <Header className="login-header">
                <Logo isLoginLogo />

                {
                    !isMobile &&
                    <a className="go-to-biogenetics"
                        href="https://biogenetics.com.br"
                    >
                        <ArrowLeftOutlined
                            style={{
                                fontWeight: "900",
                                fontSize: "12px",
                                color: "#004ba7",
                                paddingRight: "8px",
                            }}
                        />
                        Voltar para a página Inicial
                    </a>
                }
            </Header>
            <Layout style={{ height: 'calc(100vh - 64px)' }}>
                <Content style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '16px 32px',
                }}>
                    <div style={{
                        width: 400,
                        marginTop: !isMobile ? '64px' : '0px',
                        zIndex: 999
                    }}>
                        {
                            isMobile &&
                            <div className="go-to-biogenetics-mobile-container">
                                <Link href="https://biogenetics.com.br">
                                    <a className="go-to-biogenetics-mobile-link" target="_blank">Voltar para a Página Inicial</a>
                                </Link>
                            </div>
                        }
                        {children}

                    </div>
                </Content>
                <LoginLayoutFooterLeft />
                {!isMobile && <LoginLayoutFooterRight />}

            </Layout>
        </Layout>
    )
}

export default LoginLayout;