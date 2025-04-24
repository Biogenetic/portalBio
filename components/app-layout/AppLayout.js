import React from 'react';
import { Layout } from 'antd';
import AppBreadcrumb from '../app-breadcrumb/AppBreadcrumb';
import AppTitlePage from '../app-title-page/AppTitlePage';
import AppHeader from '../app-header/AppHeader';
import AppSiderbar from '../app-siderbar/AppSiderbar';

const {  Content } = Layout;

const AppLayout = ({children}) => {
  return (
    <Layout>
        <AppSiderbar/>
      <Layout>
        <AppHeader/>
        <AppBreadcrumb/>
        <AppTitlePage/>
        <Content
          style={{
            margin: '24px 16px',
            padding: 0,
            minHeight: 280,
          }}
        >
          { children }
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;