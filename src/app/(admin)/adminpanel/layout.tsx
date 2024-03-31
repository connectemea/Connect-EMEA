"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../ui/styles/globals.css";
import React, { useState, createContext, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Modal , FloatButton } from 'antd';
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
  const [selectedKey, setSelectedKey] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const Router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    switch (true) {
      case pathname === '/adminpanel':
        setSelectedKey('1');
        break;
      case pathname.startsWith('/adminpanel/interns'):
        setSelectedKey('2');
        break;
      case pathname.startsWith('/adminpanel/events'):
        setSelectedKey('3');
        break;
      case pathname.startsWith('/adminpanel/coreteam'):
        setSelectedKey('4');
        break;
      // case pathname === '/adminpanel/founders':
      //   setSelectedKey('5');
      //   break;
      default:
        setSelectedKey('1');
        break;
    }
  }, [pathname]);


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
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'interns',

    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'Events',
    },
    {
      key: '4',
      icon: <UploadOutlined />,
      label: 'Core Team',

    },
    // {
    //   key: '5',
    //   icon: <UploadOutlined />,
    //   label: 'Founders',
    // }
  ];

  const handleMenuClick = (e: any) => {
    let route;
    switch (e.key) {
      case '1':
        route = '/adminpanel';
        setSelectedKey('1')
        break;
      case '2':
        route = '/adminpanel/interns';
        setSelectedKey('2')
        break;
      case '3':
        route = '/adminpanel/events';
        setSelectedKey('3')
        break;
      case '4':
        route = '/adminpanel/coreteam';
        setSelectedKey('4')

        break;
      // case '5':
      //   route = '/adminpanel/founders';
      //   setSelectedKey('5')

      //   break;
      default:
        route = '/adminpanel/';
        break;
    }

    Router.push(route);
  };




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
              selectedKeys={[selectedKey]}
              onClick={handleMenuClick}
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
                <div className="flex items-center"
                  onClick={logout}>
                  <p className="mx-4 mr-10 cursor-pointer font-semibold hover:bg-gray-200 px-4 py-1 h-fit text-lg rounded-lg">  Logout
                  </p>
                </div>
              </div>
            </Header>
            <Content
              style={{
                margin: '24px 18px',
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
              className="text-black rounded overflow-hidden"
              ref={parent}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
        <FloatButton.BackTop />

      </body>
    </html >
  );
};

export default RootLayout;
