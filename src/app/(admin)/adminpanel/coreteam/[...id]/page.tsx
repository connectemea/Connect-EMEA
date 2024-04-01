'use client';
import React, { useState, useEffect, use } from 'react';
import { Modal, Space, Table, Tag, message, Select, Form, type FormProps, Input, Button } from 'antd';
import type { TableProps } from 'antd';
import { db, auth, storage } from "@/app/server/config/firebase";
import {
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  where,
  doc,
  collection,
  setDoc,
  FieldValue,
  arrayUnion,
  query,

} from "firebase/firestore";
import { usePathname, useRouter } from 'next/navigation';
import { ref, uploadBytes } from "firebase/storage";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ExclamationCircleFilled } from '@ant-design/icons'
interface DataType {
  key: any;
  name: string;
  imageUrl: string;
  teams: string[];
  Core_key: any;
  Core_name: string;
  Core_imageUrl: string;
  Core_position: string;
}
type FieldType = {
  position?: string;
  intern?: any;
}

const Page: React.FC = (params: any) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */);
  const { confirm } = Modal;
  const [interns, setInterns] = useState<any>([]);
  const [coremember, setCoremembers] = useState<any>([]);
  const Router = useRouter();
  const pathname = usePathname();
  const id = params?.params.id[0];
  const CoreTeam = doc(db, `CoreTeam/${id}`);

  const internsCollection = collection(db, "Interns");

  const getInterns = async () => {
    try {
      const data = await getDocs(internsCollection);
      const internsData = data.docs.map((doc) => ({
        key: doc.id,
        name: doc.data().name,
        imageUrl: doc.data().imageUrl,
        teams: doc.data().teams,
      }));
      setInterns(internsData);
      console.log("Interns data:", internsData);
    } catch (err) {
      console.error(err);
    }
  };


  const getCoreInterns = async (TeamId: string) => {
    try {
      const internsRef = collection(db, 'Interns');
      // const queryIntern = query(internsRef, where('teams', 'array-contains', TeamId));
      const queryIntern = query(internsRef,
        where('teamIds', 'array-contains', TeamId));


      const querySnapshot = await getDocs(queryIntern);
      const internsData = querySnapshot.docs.map((doc) => ({
        Core_key: doc.id,
        Core_name: doc.data().name,
        Core_imageUrl: doc.data().imageUrl,
        Core_position: doc.data().teams?.find((team: any) => team.teamId === TeamId)?.position,
      }));
      setCoremembers(internsData);
      console.log('coreteam', internsData);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  };



  const TeamId = id;

  useEffect(() => {
    getCoreInterns(TeamId);
    getInterns()
  }, [TeamId]);

  const showDeleteConfirm = (id: any) => {
    confirm({
      title: 'Are you sure delete this Intern From this COre team?',
      icon: <ExclamationCircleFilled />,
      content: 'This Intern will be removed from this COre team.',
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

    try {
      // Get the document to access its data
      const docSnapshot = await getDoc(InternDoc);

      if (!docSnapshot.exists()) {
        console.log('Document does not exist.');
        return;
      }

      const internData = docSnapshot.data();
      console.log('Document data:', internData);
      // Filter out the teamIdToRemove from both 'teams' and 'teamIds' arrays
      const updatedTeams = internData.teams.filter((team: any) => team.teamId !== TeamId);
      const updatedTeamIds = internData.teamIds.filter((teamId: any) => teamId !== TeamId);

      // Update the document with the updated arrays
      await setDoc(InternDoc, { teams: updatedTeams, teamIds: updatedTeamIds }, { merge: true });

      message.success('Document successfully updated!');
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };


  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'No',
      dataIndex: 'Core_key',
      key: 'Core_key' + 'Core_name',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'Core_name',
      key: 'Core_name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Image',
      dataIndex: 'Core_imageUrl',
      key: 'Core_imageUrl',
      render: (Core_imageUrl) => (
        <img src={Core_imageUrl} alt="avatar" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: 'Position',
      key: 'Core_position',
      dataIndex: 'Core_position',
      render: (_, { Core_position }) => (
        <Tag color="blue" key={Core_position}>
          {Core_position}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* <a href={`interns/edit-${record.Core_key}`}>Edit</a> */}
          <a onClick={() => showDeleteConfirm(record.Core_key)}>Delete</a>
        </Space>
      ),
    },
  ];

  const onFinish: FormProps<FieldType>["onFinish"] = async (values: any) => {
    console.log('Success:', values);

    const internId = values.intern;
    const teamsToAddOrUpdate = [
      { teamId: id, position: values.position }
    ];
    const teamsIds = [id];

    const internRef2 = doc(collection(db, 'Interns'), internId);

    try {
      const document = await getDoc(internRef2);
      console.log(document)
      if (!document.exists) {
        console.log('Intern document not found. Skipping update.');
        return;
      }
      // Use arrayUnion to add new teamId and position to the 'teams' array
      const TeamRef = doc(db, 'Interns', internId);
      setDoc(TeamRef, { teams: arrayUnion(...teamsToAddOrUpdate) }, { merge: true });
      setDoc(TeamRef, { teamIds: arrayUnion(...teamsIds) }, { merge: true });

      handleOk();
      getCoreInterns(TeamId);
      message.success('Document successfully updated!');
      console.log('Document successfully updated!');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className="min-h-screen bg-primary text-center p-6">
      <h1 className="text-4xl font-bold text-white pt-10 ">Core Team {id} Memebers</h1>
      <button onClick={showModal} className='bg-blue-500 p-2 my-6 min-w-[100px] rounded-xl text-white transition-all ease-in-out hover:bg-blue-600'>
        Add new
      </button>
      <Modal title="Choose Intern" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
        <div className='flex w-full items-center justify-center mx-auto' >

          <Form
            form={form}
            name="basic"
            style={{ maxWidth: 400 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
            className='w-full mx-auto'
          >
            <Form.Item label="Intern"
              name="intern"
              rules={[{ required: true, message: 'Please input your profession!' }]}
            >
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={filterOption}
                className='w-full'
                size='large'
              >
                {interns.map((intern: any) => (
                  <Select.Option key={intern.key} value={intern.key} label={intern.name}>
                    <div className='flex gap-2 items-center justify-start'>
                      <img src={intern.imageUrl} alt={intern.name} style={{ marginRight: 8, height: 24, width: 24, borderRadius: '50%' }} />
                      <p>
                        {intern.name}
                      </p>
                    </div>
                  </Select.Option>
                ))}
              </Select>

            </Form.Item>

            <Form.Item<FieldType>
              label="Position"
              name="position"
              rules={[{ required: true, message: 'Please input your profession!' }]}
            >
              <Input size='large' />
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit" size='large' className='w-full'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <Table columns={columns} dataSource={coremember} pagination={false} />
    </div >
  );
};

export default Page;
