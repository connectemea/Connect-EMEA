'use client';
import React, { useState, useEffect } from 'react';
import { Modal, Space, Table, Tag, message, Spin, Descriptions, Avatar, Badge } from 'antd';
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
import { ExclamationCircleFilled , DeleteOutlined , EyeOutlined , EditOutlined  } from '@ant-design/icons'
interface DataType {
  key: any;
  name: string;
  imageUrl: string;
  github: string;
  linkedin: string;
  instagram: string;
  department: string;
  role: string;
  active: boolean;
  AdmissionNo: string;
  profession: string;
  joined_year: number;
}

const Page: React.FC = () => {
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  const { confirm } = Modal;
  const [interns, setInterns] = useState<DataType[]>([]);
  const Router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState<DataType | null>(null);
  const internsCollection = collection(db, "Interns");
  const [loading, setLoading] = useState(true);

  const getInterns = async () => {
    try {
      const data = await getDocs(internsCollection);
      console.log("Fetched data:", data);
      const internsData = data.docs.map((doc) => ({
        key: doc.id,
        name: doc.data().name,
        imageUrl: doc.data().imageUrl,
        github: doc.data().social?.github,
        linkedin: doc.data().social?.linkedin,
        instagram: doc.data().social?.instagram,
        department: doc.data().department,
        role: doc.data().role,
        active: doc.data().active,
        AdmissionNo: doc.data().AdmissionNo,
        profession: doc.data().profession,
        joined_year: doc.data().joined_year,
      }));
      setLoading(false);
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
    const InternDoc = doc(db, "Interns", id);
    await deleteDoc(InternDoc).then(() => {
      message.success('Document successfully deleted!');
      getInterns();
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl) => (
        <img src={imageUrl} alt="avatar" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (active) => (
        <Tag color={active ? 'green' : 'red'}>{active ? 'Active' : 'Inactive'}</Tag>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href={`interns/edit-${record.key}`}><EditOutlined /></a>
          <a onClick={() => showDeleteConfirm(record.key)}><DeleteOutlined /></a>
          <a onClick={() => showModal(record)}><EyeOutlined /></a>
        </Space>
      ),
    },
  ];

  // Fetch data from server on component mount (or when needed)
  useEffect(() => {
    getInterns();
  }, []);

  const showModal = (value: any) => {
    setIsModalOpen(true);
    setSelectedIntern(value);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddNew = () => {
    Router.push('interns/add');
  }

  const items: DescriptionsProps['items'] = [
    { label: 'Name', children: selectedIntern?.name },
    { label: 'Department', children: selectedIntern?.department },
    { label: 'Role', children: selectedIntern?.role },
    { label: 'Active', children: <Badge status={selectedIntern?.active ? 'success' : 'error'} text={selectedIntern?.active ? 'Active' : 'Inactive'} />, },
    { label: 'Admission No', children: selectedIntern?.AdmissionNo },
    { label: 'Profession', children: selectedIntern?.profession },
    { label: 'Joined Year', children: selectedIntern?.joined_year },
  ];


  return (
    <div className="min-h-screen bg-primary text-center p-6">
      <h1 className="text-4xl font-bold text-white pt-10 ">Interns List</h1>
      {loading ? (
        <div className='flex items-start mt-10 justify-center h-full'>
          <Spin size='large' />
        </div>
      ) : (
        <div>

          <div className='flex items-center justify-end'>
            <button onClick={handleAddNew} className='bg-blue-500 p-2 my-6 min-w-[100px] rounded-xl'>
              Add new
            </button>
          </div>
          <div className='overflow-auto bg-white rounded-lg' ref={parent}>
            <Table columns={columns} dataSource={interns} />
          </div>

          <Modal
            title="Intern Details"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <div className='mx-auto flex items-center justify-center w-full mb-4'>

              <Avatar
                size={{ xs: 32, sm: 40, md: 64, lg: 84, xl: 100, xxl: 120 }}
                src={selectedIntern?.imageUrl}
              />
            </div>

            <Descriptions items={items} layout="horizontal" bordered column={1} />
          </Modal>

        </div>
      )}
    </div>
  );
};

export default Page;
