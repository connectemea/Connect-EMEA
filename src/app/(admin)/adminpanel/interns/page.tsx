'use client';
import React, { useState, useEffect } from 'react';
import { Modal, Space, Table, Tag, message } from 'antd';
import type { TableProps } from 'antd';
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
import { ExclamationCircleFilled } from '@ant-design/icons'
interface DataType {
  key: any;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const Page: React.FC = () => {
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  const { confirm } = Modal;
  const [interns, setInterns] = useState<DataType[]>([]);
  const Router = useRouter();
  const internsCollection = collection(db, "Interns");

  const getInterns = async () => {
    try {
      const data = await getDocs(internsCollection);
      console.log("Fetched data:", data);
      const internsData = data.docs.map((doc) => ({
        key: doc.id,
        name: doc.data().name,
        age: doc.data().age,
        address: doc.data().address,
        imageUrl: doc.data().imageUrl,
        tags: doc.data().tags,
      }));
      setInterns(internsData);
      console.log("Interns data:", internsData);
    } catch (err) {
      console.error(err);
    }
  };

  const showDeleteConfirm = (id:any) => {
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

  const handleDelete = async (id:any) => {
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
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
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags?.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href={`interns/edit-${record.key}`}>Edit</a>
          <a onClick={() => showDeleteConfirm(record.key)}>Delete</a>
          <a>View</a>
        </Space>
      ),
    },
  ];

  // Fetch data from server on component mount (or when needed)
  useEffect(() => {
    getInterns();
  }, []);

  const handleAddNew = () => {
    Router.push('interns/add');
  }

  return (
    <div className="h-screen bg-primary text-center p-6">
      <h1 className="text-4xl font-bold text-white pt-10 ">Interns Page</h1>
      <button onClick={handleAddNew} className='bg-blue-500 p-2 my-6'>
        Add new
      </button>
      <Table columns={columns} dataSource={interns} />
    </div>
  );
};

export default Page;
