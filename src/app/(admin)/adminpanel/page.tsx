'use client';
import React, { useState, useEffect } from 'react';
import { Modal, Space, Table, Tag, message, Drawer, Select, Avatar, Spin, Descriptions } from 'antd';
import type { TableProps, DescriptionsProps } from 'antd';
import { db, auth, storage } from "@/app/server/config/firebase";
import {
    getDocs,
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import { usePathname, useRouter } from 'next/navigation';
import { ref, uploadBytes } from "firebase/storage";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ExclamationCircleFilled, EyeOutlined, UserOutlined } from '@ant-design/icons'
interface DataType {
    id: string;
    Status: string;
    key: any;
    name: string;
    joinYear: number;
    department: string;
    mobile: number;
    email: string;
    admissionNo: number;
}

const Page: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
    const { confirm } = Modal;
    const [interns, setInterns] = useState<any>([]);
    const internsCollection = collection(db, "members");
    const Router = useRouter();
    const [loading, setLoading] = useState(true);

    const getInterns = async () => {
        try {
            const data = await getDocs(internsCollection);
            console.log("Fetched data:", data);
            const internsData = data.docs.map((doc) => ({
                key: doc.id,
                name: doc.data().name,
                Status: doc.data().Status,
                joinYear: doc.data().joinYear,
                department: doc.data().department,
                mobile: doc.data().mobile,
                email: doc.data().email,
                admissionNo: doc.data().admissionNo,
            }));
            setInterns(internsData);
            setLoading(false);
            console.log("Interns data:", internsData);
        } catch (err) {
            console.error(err);
        }
    };

    const showConfirm = (value: string, id: any) => {
        confirm({
            title: 'Are you sure you want to update the status?',
            icon: <ExclamationCircleFilled />,
            content: 'this will update the status of the user',
            okText: 'Yes',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                HandleUpdate(value, id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const HandleUpdate = async (value: string, id: any) => {
        if (!id || !value) return;
        try {
            const internDoc = doc(db, "members", id);
            await updateDoc(internDoc, { Status: value });
            message.success('Status updated successfully');
            getInterns(); // Refresh the interns data
        } catch (error) {
            console.error('Error updating status:', error);
            message.error('Failed to update status');
        }
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'id',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'joinedYear',
            dataIndex: 'joinYear',
            key: 'joinYear',
        },
        {
            title: 'department',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: 'mobile',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: 'Whatsapp Added',
            key: 'Status',
            dataIndex: 'Status',
            filters: [
                { text: 'Pending', value: 'Pending' },
                { text: 'Added', value: 'Added' },
                { text: 'Rejected', value: 'Rejected' },
                { text: 'Not Have', value: 'Not Have' }
            ],
            onFilter: (value, record) => record.Status === value,
            render: (text) => (
                <Tag className='flex items-center justify-center mx-auto w-fit' color={text === 'Pending' ? 'orange' : text === 'Added' ? 'green' : text === 'Rejected' ? 'red' : 'gray'}>{text}</Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => showDrawer(record)} className='text-lg flex items-center gap-1 justify-center'><EyeOutlined /> View</a>
                </Space>
            ),
        },
    ];

    // Fetch data from server on component mount (or when needed)
    useEffect(() => {
        getInterns();
    }, []);

    const showDrawer = (record: any) => {
        setUserData(record); // Set user data for the drawer
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    // const handleStatusChange = (value: string, id: any) => {
    //     console.log(`selected ${value}`);
    //     showConfirm(userData.key);
    // };
    const items: DescriptionsProps['items'] = [
        { key: '1', label: 'Name', children: userData ? userData.name : "N/A" },
        { key: '3', label: 'Email', children: userData ? userData.email : "N/A" },
        { key: '4', label: 'Mobile', children: userData ? userData.mobile : "N/A" },
        { key: '5', label: 'Department', children: userData ? userData.department : "N/A" },
        { key: '6', label: 'Admission No', children: userData ? userData.admissionNo : "N/A" },
        { key: '7', label: 'Join Year', children: userData ? userData.joinYear : "N/A" },
        { key: '8', label: 'Status', children: userData ? userData.Status : "N/A" },
    ];

    return (
        <div className="h-screen bg-primary text-center p-6" ref={parent}>
            <h1 className="text-4xl font-bold text-white py-10">Members List</h1>

            {loading ? (
                <div className='flex items-start mt-10 justify-center h-full'>
                    <Spin size='large' />
                </div>
            ) : (

                <div ref={parent}>

                    <div className='overflow-auto bg-white rounded-lg' ref={parent}>
                        <Table columns={columns} dataSource={interns} />
                    </div>
                    <Drawer
                        title={userData ? userData.name : "User Details"}
                        onClose={onClose}
                        open={open}
                        width={500}
                    >
                        <div className='flex items-center justify-center flex-col gap-4 w-full'>

                            <Avatar size={64} icon={<UserOutlined />} />
                            {userData && (
                                <div className='overflow-auto'>

                                    <Descriptions items={items} layout="horizontal" bordered column={1} />

                                    <h2 className='text-xl font-bold text-center mt-4'>Change Status</h2>
                                    <p className='text-center text-sm text-gray-500 max-w-[200px] mx-auto'>
                                        Change the status of the user if added to Whatsapp
                                    </p>
                                    <Select
                                        style={{ width: '100%' }}
                                        defaultValue={userData.Status}
                                        onChange={(value) => showConfirm(value, userData.key)}
                                        options={[
                                            { label: 'Added', value: 'Added' },
                                            { label: 'Rejected', value: 'Rejected' },
                                            { label: 'Not Have', value: 'Not Have' },
                                            { label: 'Pending', value: 'Pending', disabled: true },
                                        ]}
                                    />
                                    {/* Render other user data here */}
                                </div>
                            )}
                        </div>
                    </Drawer>
                </div>
            )}
        </div>
    );
};

export default Page;
