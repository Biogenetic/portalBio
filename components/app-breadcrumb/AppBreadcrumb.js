import React, { useContext } from 'react';
import { Breadcrumb } from 'antd';
import AppRoute from '../app-route/AppRoute';
import { LayoutContext } from '../../contexts/LayoutContext';

const AppBreadcrumb = () => {
    const { breadcrumbs } = useContext(LayoutContext);

    return (  
        <Breadcrumb style={{
            marginLeft: 24,
            marginTop: 16,
            fontSize: 16
        }}>
            {breadcrumbs && breadcrumbs.map((currentItem, index) => 
                <Breadcrumb.Item key={index}>
                    <AppRoute href={currentItem.url} title={currentItem.title}></AppRoute>
                </Breadcrumb.Item>  
            )}
        </Breadcrumb>
    )
}
export default AppBreadcrumb