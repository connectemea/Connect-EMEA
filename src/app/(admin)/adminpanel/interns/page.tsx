'use client';
import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
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
import { ref, uploadBytes } from "firebase/storage";
interface DataType {
  key: any;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

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
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
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
        <a>Edit</a>
        <a>Delete</a>
        <a>View</a>
      </Space>
    ),
  },
];

const Page: React.FC = () => {
  const [interns, setInterns] = useState<DataType[]>([]);

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
            tags: doc.data().tags,
        }));
        setInterns(internsData);
        console.log("Interns data:", internsData);
    } catch (err) {
        console.error(err);
    }
};



  // Fetch data from server on component mount (or when needed)
  useEffect(() => {
    getInterns();
  }, []);

 

  return (
    <div className="h-screen bg-primary text-center p-6">
      <h1 className="text-4xl font-bold text-white pt-10">Interns Page</h1>
      <Table columns={columns} dataSource={interns} />
    </div>
  );
};

export default Page;
