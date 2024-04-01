'use client';
import React, { useState } from 'react';
import { auth } from '../config/firebase';
import {
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const Router = useRouter();
   
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        signIn(values.email, values.password);
    };

    const handleForgot = () => {
        message.info('Please contact the admin to reset your password');
    }

    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Router.push('/adminpanel');
           

        } catch (err) {
            console.error(err);
        }
    };

    auth.onAuthStateChanged((user) => {
        if (user) {
            Router.push('/adminpanel');
        } else {
            console.log('User is not signed in');
            Router.push('/admin/auth/signin');
        }
    });

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary text-white z-20">

            <Form
                name="normal_login"
                className="bg-white p-8 rounded-lg shadow-md w-96"
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
