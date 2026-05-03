// components/AppLayout.jsx
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    DashboardFilled,
    PlusOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

const AppLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                {/* Sidebar */}
                <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                    <div style={{ color: 'white', padding: 16, textAlign: 'center' }}>
                        {collapsed ? 'FB' : 'Form Builder'}
                    </div>

                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['create']}
                        onClick={({ key }) => navigate(key)}
                        items={[
                            {
                                key: '/dashboard',
                                icon: <DashboardFilled />,
                                label: 'Dashboard',
                            },
                            {
                                key: '/create',
                                icon: <PlusOutlined />,
                                label: 'Create Form',
                            },
                            {
                                key: '/forms',
                                icon: <UnorderedListOutlined />,
                                label: 'All Forms',
                            },
                            {
                                key: '/responses',
                                icon: <UnorderedListOutlined />,
                                label: 'Responses',
                            },
                        ]}
                    />
                </Sider>

                <Layout>
                    <Content style={{ margin: '16px' }}>
                        <div style={{ padding: 20, background: '#fff', minHeight: 360 }}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default AppLayout;