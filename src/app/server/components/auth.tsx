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
        <div className='flex items-start justify-center w-full h-full mt-20 text-white'>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email..." />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox className='text-white'>Remember me</Checkbox>
                    </Form.Item>
                    <p className="login-form-forgot text-white" onClick={handleForgot}>
                        Forgot password
                    </p>
                </Form.Item>

                <Form.Item>
                    <button type="submit" className="bg-secondary px-4 py-2 rounded-xl font-bold ">
                        Log in
                    </button>
                </Form.Item>
            </Form>
        </div>

    );
};

export default Login;