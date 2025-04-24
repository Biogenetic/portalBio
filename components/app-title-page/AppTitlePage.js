import React, { useContext } from 'react'
import { Typography } from 'antd';
import { LayoutContext } from '../../contexts/LayoutContext';

const AppTitlePage = () => {

    const {title, subTitle} = useContext(LayoutContext);

    return (
        <div style={{
            marginLeft: 24
        }}>            
            <Typography.Title style={{
                marginBottom: 0
            }}>
                {title}
            </Typography.Title>
            {
                subTitle && 
                <Typography.Text>{subTitle}</Typography.Text>
            }
        </div>
    )
}

export default AppTitlePage;