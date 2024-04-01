'use client';
import React, { useState, useEffect } from 'react';
import { Modal, Space, Table, Tag, message, Form, Button, type FormProps, Input, Select } from 'antd';
import type { TableProps } from 'antd';
import { db, auth, storage } from "@/app/server/config/firebase";
import {
    getDocs,
    setDoc,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import { usePathname, useRouter } from 'next/navigation';
import { ref, uploadBytes } from "firebase/storage";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ExclamationCircleFilled } from '@ant-design/icons'
import { color } from 'framer-motion';
interface DataType {
    key: any;
    name: string;
    Docid: string;
    year: number;
    Status: string;
    Color: string;
    TeamName: string;
}
type FieldType = {
    Docid?: string;
    year?: number;
    TeamName?: string;
    Status?: string;
    Color?: string;
};

const Page: React.FC = () => {
    const [form] = Form.useForm();
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
    const [addNew, setAddNew] = useState<boolean>(false);
    const { confirm } = Modal;
    const [interns, setInterns] = useState<any>([]);
    const Router = useRouter();
    const internsCollection = collection(db, "CoreTeam");

    const getCoreTeams = async () => {
        try {
            const data = await getDocs(internsCollection);
            console.log("Fetched data:", data);
            const internsData = data.docs.map((doc) => ({
                key: doc.id,
                TeamName: doc.data().TeamName,
                year: doc.data().year,
                Status: doc.data().Status,
                Color: doc.data().Color,
            }));
            setInterns(internsData);
            console.log("Interns data:", internsData);
        } catch (err) {
            console.error(err);
        }
    };

    const showDeleteConfirm = (id: any) => {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                handleDelete(id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const handleDelete = async (id: any) => {
        if (!id) return;
        const InternDoc = doc(db, "CoreTeam", id);
        await deleteDoc(InternDoc).then(() => {
            message.success('Document successfully deleted!');
            getCoreTeams();
        }).catch((error) => {
            console.error('Error deleting document: ', error);
        });
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'id',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Team Name',
            dataIndex: 'TeamName',
            key: 'TeamName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Color',
            dataIndex: 'Color',
            key: 'Color',
        },
        {
            title: 'Status',
            key: 'Status',
            dataIndex: 'Status',
            render: (Status) => (
                <Tag color={Status === 'draft' ? 'orange' : Status === 'Publish' ? 'green' : Status === 'Cancel' ? 'red' : 'gray'}>{Status}</Tag>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record)}>Edit</a>
                    <a onClick={() => showDeleteConfirm(record.key)}>Delete</a>
                    <a href={`coreteam/${record.key}`}>View</a>
                </Space>
            ),
        },
    ];

    // Fetch data from server on component mount (or when needed)
    useEffect(() => {
        getCoreTeams();
    }, []);

    const handleAddNew = () => {
        setAddNew(!addNew)
    }

    const handleEdit = (values: any) => {
        setAddNew(true);
        form.setFieldsValue({
            Status: values.Status || 'draft',
            year: values.year,
            Docid: values.key,
            TeamName: values.TeamName,
            Color: values.Color,
        });
    }

    const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
        console.log('Success:', values);

        const coreTeamRef = doc(db, 'CoreTeam', values.Docid); // Use custom document ID here
        try {
            await setDoc(coreTeamRef, {
                TeamName: values.TeamName,
                year: values.year,
                Status: values.Status,
                Color: values.Color,
                userId: auth?.currentUser?.uid,
            });
            getCoreTeams();
            setAddNew(false);
            message.success('Document successfully added!');
            console.log('Document successfully added!');
        } catch (err) {
            console.error(err);
        }
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const Doc_id_Options = [
        { label: '2020-21', value: '2020-21' },
        { label: '2021-22', value: '2021-22' },
        { label: '2022-23', value: '2022-23' },
        { label: '2023-24', value: '2023-24' },
        { label: '2024-25', value: '2024-25' },
        { label: '2025-26', value: '2025-26' },
        { label: '2026-27', value: '2026-27' },
        { label: '2027-28', value: '2027-28' },
        { label: '2028-29', value: '2028-29' },
        { label: '2029-30', value: '2029-30' },
    ];

    const yearOptions = [
        { label: '2020', value: 2020 },
        { label: '2021', value: 2021 },
        { label: '2022', value: 2022 },
        { label: '2023', value: 2023 },
        { label: '2024', value: 2024 },
        { label: '2025', value: 2025 },
        { label: '2026', value: 2026 },
        { label: '2027', value: 2027 },
        { label: '2028', value: 2028 },
        { label: '2029', value: 2029 },
        { label: '2030', value: 2030 },
    ];

    const handleChange = (value: any) => {
        console.log(value);
        form.setFieldsValue({
            Status: value,
        });
    }
    const handleColorChange = (value: any) => {
        console.log(value);
        form.setFieldsValue({
            Color: value,
        });
    }

    return (
        <div className="min-h-screen bg-primary text-center p-6" ref={parent}>
            <h1 className="text-4xl font-bold text-white pt-10 ">Core Team List</h1>
            <div className='flex items-center justify-end'>
                <button onClick={handleAddNew} className='bg-blue-500 p-2 my-6 min-w-[100px] rounded-xl text-white transition-all ease-in-out hover:bg-blue-600'>
                    {addNew ? 'close' : 'Add new'}
                </button>

            </div>
            {addNew && (
                <div className='text-white flex items-center flex-col justify-center'>
                    <Form
                        form={form}
                        name="basic"
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 500, color: 'white' }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                        requiredMark={false}
                        className='text-white w-full mb-10 label-color-white'
                    >
                        <Form.Item
                            label="Year id"
                            name="Docid"
                            rules={[{ required: true, message: 'Please select a year id!' }]}
                            style={{ color: 'white' }}
                            className='text-white'
                            hasFeedback

                        >
                            <Select style={{ width: '100%' }} size='large' placeholder="Select the gap">
                                {Doc_id_Options.map(option => (
                                    <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Year"
                            name="year"
                            rules={[{ required: true, message: 'Please select a year!' }]}
                            className='text-white'
                            hasFeedback
                        >
                            <Select style={{ width: '100%' }} size='large' placeholder="Select the year">
                                {yearOptions.map(option => (
                                    <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Team Name"
                            name="TeamName"
                            rules={[{ required: true, message: 'Please input the team name!' }]}
                            className='text-white'
                            hasFeedback

                        >
                            <Input size='large' placeholder="Enter Team name"/>
                        </Form.Item>
                        <Form.Item
                            label="Status"
                            name="Status"
                            rules={[]}
                            className='text-white'
                            hasFeedback

                        >
                            <Select defaultValue="draft" onChange={handleChange} options={[
                                { value: 'draft', label: 'draft' },
                                { value: 'Publish', label: 'Publish' },
                                { value: 'Cancel', label: 'Cancel' },
                            ]}
                            size='large'
                            placeholder="Choose the status"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Color"
                            name="Color"
                            rules={[]}
                            className='text-white'
                            hasFeedback

                        >
                            <Select defaultValue="draft" onChange={handleColorChange} options={[
                                { value: '#C400FE', label: 'violet' },
                                { value: '#A33FF8', label: 'pink' },
                            ]}
                            placeholder="Select the  bg color"
                            size='large'
                            />
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" htmlType="submit" size='large' className='w-full mt-2'>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}

            <Table columns={columns} dataSource={interns} pagination={false} />
        </div>
    );
};

export default Page;
