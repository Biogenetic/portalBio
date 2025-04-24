import React from 'react';
import { Card } from 'antd';

export default function AppCard({title, children, ...rest}) {
    return (
        <Card
            style={{marginBottom: 16 }} 
            title={title}
            {...rest}>
            {children}
        </Card>
    )
}