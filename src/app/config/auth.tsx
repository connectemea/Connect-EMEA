'use client';
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const Router = useRouter();
    const [user, setUser] = useState<any | null>(null);

    const onFinish = (values: any) => {
        signIn(values.email, values.password);
    };

    const handleForgot = () => {
        message.info('Please contact the admin to reset your password');
    }

    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            message.success('Successfully signed in');
        } catch (err:any) {
            message.error('Failed to sign in. Please try again.');
            console.error(err);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                Router.push('/adminpanel');
            } else {
                setUser(null);
                console.log('User is not signed in');
                Router.push('/admin');
            }
        });

        return () => {
            unsubscribe();
        };
    }, [Router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary text-white z-20  dark:bg-white dark:text-black ">

            <Form
                name="normal_login"
                className="bg-white p-8 rounded-lg  w-96 shadow-xl"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" className="w-full mb-4" size='large' />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" className="w-full mb-4" size='large' />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size='large' className="w-full bg-blue-500 hover:bg-blue-600">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
