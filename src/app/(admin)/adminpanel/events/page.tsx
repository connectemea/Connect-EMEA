'use client';
import React, { useState, useEffect } from 'react';
import { Modal, Space, Table, Tag, message, Spin, Button, } from 'antd';
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
import { ExclamationCircleFilled, DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons'
interface DataType {
  key: any;
  name: string;
  summary: string;
  short_description: string;
  imageUrl: string;
  link: string;
  Status: string;
  Date: string;
}

const Page: React.FC = () => {
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  const { confirm } = Modal;
  const [events, setEvents] = useState<any>([]);
  const Router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const eventsCollection = collection(db, "Events");

  const getEvents = async () => {
    try {
      const data = await getDocs(eventsCollection);
      console.log("Fetched data:", data);
      const eventsData = data.docs.map((doc) => ({
        key: doc.id,
        title: doc.data().title,
        imageUrl: doc.data().imageUrl,
        summary: doc.data().summary,
        short_description: doc.data().short_description,
        link: doc.data().link,
        Status: doc.data().Status,
        Date: doc.data().Date,
      }));
      setEvents(eventsData);
      setLoading(false);
      console.log("Events data:", eventsData);
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
    const EventDoc = doc(db, "Events", id);
    await deleteDoc(EventDoc).then(() => {
      message.success('Document successfully deleted!');
      getEvents();
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
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'short_description',
      dataIndex: 'short_description',
      key: 'short_description',
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
      title: 'Status',
      key: 'Status',
      dataIndex: 'Status',
      render: (Status) => (
        <Tag color={Status === 'Publish' ? 'green' : 'volcano'} key={Status}>
          {Status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a href={`events/edit-${record.key}`}><EditOutlined /></a>
          <a onClick={() => showDeleteConfirm(record.key)}><DeleteOutlined /></a>
          <a onClick={() => showModal(record)}><EyeOutlined /></a>
        </Space>
      ),
    },
  ];

  // Fetch data from server on component mount (or when needed)
  useEffect(() => {
    getEvents();
  }, []);

  const showModal = (value: any) => {
    setIsModalOpen(true);
    setSelectedEvent(value);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddNew = () => {
    Router.push('events/add');
  }

  return (
    <div className="min-h-screen bg-primary text-center p-6">
      <h1 className="text-4xl font-bold text-white pt-10 ">Events Page</h1>
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
            <Table columns={columns} dataSource={events} />
          </div>
          <Modal
            title="Event Details"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Return
              </Button>
            ]} >
            <h1>{selectedEvent?.title}</h1>
            <p>{selectedEvent?.summary}</p>
            <p>{selectedEvent?.short_description}</p>
            <p>{selectedEvent?.link}</p>
            <p>{selectedEvent?.Status}</p>
            <p>{selectedEvent?.Date}</p>
            <img src={selectedEvent?.imageUrl} alt="event" />
          </Modal>
        </div>

      )}
    </div>
  );
};

export default Page;
