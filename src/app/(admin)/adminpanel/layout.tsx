"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../ui/styles/globals.css";
import React, { useState, createContext } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Modal } from 'antd';
import { auth } from '@/app/server/config/firebase';
import { signOut } from "firebase/auth";
import { usePathname, useRouter } from 'next/navigation';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const { Header, Sider, Content } = Layout;

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Connect|AdminPanel",
//   description: "Connect EMEA Admin panel ",
// };

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const Router = useRouter();
  const pathname = usePathname();

  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('User is signed in', user);
    } else {
      console.log('User is not signed in');
      Router.push('/admin/auth/signin');
    }
  });

  const logout = async () => {
    Modal.confirm({
      title: 'Logout',
      content: 'Are you sure you want to logout?',
      okButtonProps: {
        danger: true,
      },
      onOk: async () => {
        try {
          await signOut(auth);
        } catch (err) {
          console.error(err);
        }
      },
    });
  };
  const pages = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Dashboard',
      href: '/adminpanel',
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'Interns',
      href: '/adminpanel/interns',
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'Events',
      href: '/adminpanel/events',
    },
    {
      key: '4',
      icon: <UploadOutlined />,
      label: 'Core Team',
      href: '/adminpanel/coreteam',
    },
    {
      key: '5',
      icon: <UploadOutlined />,
      label: 'Founders',
      href: '/adminpanel/founders',
    }
  ];

  const handleMenuClick = (e: any) => {
    Router.push(e.key);
  }


  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <div className="logo" >
              <img src="/logo.png" alt="logo" className="mx-auto my-10 mt-4" />
            </div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              selectedKeys={[pages.find(page => pathname.includes(page.href))?.key || '1']}
              onChange={handleMenuClick}
              items={pages}
            />


          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }}>
              <div className="flex justify-between px-2">

                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                  }}
                />
                <Button type="text" style={{ fontSize: '16px', width: 64, height: 64 }} onClick={logout}>
                  Logout
                </Button>
              </div>
            </Header>
            <Content
              style={{
                margin: '24px 18px',
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
              className="text-white rounded overflow-hidden"
              ref={parent}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </body>
    </html >
  );
};

export default RootLayout;
