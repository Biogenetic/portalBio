import React, { useContext, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu, Row, Col, Avatar, Dropdown } from 'antd';
import { LayoutContext } from '../../contexts/LayoutContext';
import { AuthContext } from '../../contexts/AuthContext';
import ChangePasswordModal from '../auth/ChangePasswordModal';

const { Header } = Layout;

const AppHeader = () => {
        
    const {collapsedSidebar, setCollapsedSidebar, isMobile} = useContext(LayoutContext);
    const { user, logoff } = useContext(AuthContext);
    const [visibleChangePasswordModal, SetVisibleChangePasswordModal] = useState(false);

    const onMenuClick = event => {
        const { key } = event

        key === 'logout' ? logoff() : SetVisibleChangePasswordModal(true);
    }

    const menuHeaderDropdown = (
        <Menu  selectedKeys={[]} onClick={onMenuClick}>
            <Menu.Item key="center">
                <SettingOutlined/>
                <span style={{marginLeft: 8}}>Alterar senha</span>                
            </Menu.Item>
            <Menu.Divider />

            <Menu.Item key="logout">
                <LogoutOutlined />
                <span style={{marginLeft: 8}}>Sair</span>
            </Menu.Item>
        </Menu>
    )
    return (
        <Header
            className="app-header"
            style={{
            padding: 0,
            }}
        >
        <Row>
          <Col span={8}>
              {React.createElement(collapsedSidebar ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsedSidebar(!collapsedSidebar),
            })}
          </Col>
          <Col span={8} offset={8}>
            <Dropdown className='header-dropdown' overlay={menuHeaderDropdown}>
                <div className='header-dropdown-user-info'>                    
                    <Avatar icon={<UserOutlined />} />
                    {! isMobile && <span>Olá, {user.username}</span> }
                       
                </div>
            </Dropdown >           
          </Col>
        </Row>
        <ChangePasswordModal 
            visible={visibleChangePasswordModal} 
            setVisible={SetVisibleChangePasswordModal}/>
      </Header>
    )
}

export default AppHeader;