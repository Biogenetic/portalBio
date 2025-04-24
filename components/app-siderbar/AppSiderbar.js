import React, { useContext, useEffect, useState } from 'react';
import {  SolutionOutlined,  ExperimentOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Logo from '../logo/Logo';
import AppRoute from '../app-route/AppRoute';
import { LayoutContext } from '../../contexts/LayoutContext';

const { Sider } = Layout;

const AppSiderbar = () => {
  const {collapsedSidebar} = useContext(LayoutContext);
  const [selectedMenuKey, setSelectedMenuKey] = useState('/exames/consulta');  

  useEffect(()=> {
    setSelectedMenuKey(location.pathname);
  }, []);

  const onChangePage = (route) => {
    setSelectedMenuKey(route);
  }

  return (
    <Sider 
        trigger={null} 
        collapsible 
        collapsed={ collapsedSidebar } 
        width={250}
        className="app-sider">
        <Logo isSideBarCollapsed={collapsedSidebar}/>
        <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selectedMenuKey]}
        defaultSelectedKeys={['/exames/consulta']}>
            <Menu.Item key={'/exames/consulta'}>
                <React.Fragment>
                    <AppRoute 
                    title='Exames' 
                    href='/exames/consulta' 
                    beforeRouting={onChangePage}
                    icon={<ExperimentOutlined/>}></AppRoute>
                </React.Fragment>
            </Menu.Item>
            <Menu.Item key={'/formulario/formularios'}>
                <React.Fragment>              
                    <AppRoute 
                        title='Formulários' 
                        href='/formulario/formularios'                    
                        beforeRouting={onChangePage} 
                        icon={<SolutionOutlined/>}></AppRoute>
                </React.Fragment>
            </Menu.Item>
            <Menu.Item key={'/formulario/declaracoes'}>
                <React.Fragment>              
                    <AppRoute 
                        title='Declarações' 
                        href='/formulario/declaracoes' 
                        beforeRouting={onChangePage} 
                        icon={<SolutionOutlined/>}></AppRoute>
                </React.Fragment>
            </Menu.Item>
            <Menu.Item key={'/formulario/downloads'}>
                <React.Fragment>              
                    <AppRoute 
                        title='Downloads' 
                        href='/formulario/downloads' 
                        beforeRouting={onChangePage} 
                        icon={<SolutionOutlined/>}></AppRoute>
                </React.Fragment>
            </Menu.Item>
        </Menu>
  </Sider>
  );
};

export default AppSiderbar;