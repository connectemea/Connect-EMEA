'use client';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Spin, Form, type FormProps, Input, message, Upload, Select, DatePicker, InputNumber } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { db, auth, storage } from '@/app/server/config/firebase';
import {
  collection,
  addDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import { v4 } from "uuid";


type FieldType = {
  name?: string;
  department?: string;
  joined_year?: number;
  AdmissionNo?: string;
  mobile?: string;
  email?: string;
};



const App: React.FC = () => {
  const [form] = Form.useForm();
  const [parent, enableAnimations] = useAutoAnimate();


  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log('Success:', values);
    onSubmitIntern(values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);

  };

  const internCollectionRef = collection(db, 'members');
  const onSubmitIntern = async (values: any) => {
    try {
      await addDoc(internCollectionRef, {
        name: values.name,
        department: values.department,
        joinYear: values.joined_year.year(),
        AdmissionNo: values.AdmissionNo,
        mobile: Number(values.mobile),
        email: values.email,
        Status: 'Pending',
      });
      message.success('Document successfully added!');
      console.log('Document successfully added!');
    } catch (err) {
      console.error(err);
    }
  };


  const DepartmentOptions = [
    { value: 'BA Economics', label: 'BA Economics' },
    { value: 'BA English', label: 'BA English' },
    { value: 'BA West Asia', label: 'BA West Asia' },
    { value: 'BBA', label: 'BBA' },
    { value: 'BSc Biotechnology', label: 'BSc Biotechnology' },
    { value: 'BSc Biochemistry', label: 'BSc Biochemistry' },
    { value: 'BSc Computer Science', label: 'BSc Computer Science' },
    { value: 'BSc Maths and Physics', label: 'BSc Maths and Physics' },
    { value: 'BSc Microbiology', label: 'BSc Microbiology' },
    { value: 'Bcom CA', label: 'Bcom CA' },
    { value: 'Bcom co - op', label: 'Bcom co - op' },
    { value: 'Bvoc Islamic Finance', label: 'Bvoc Islamic Finance' },
    { value: 'Bvoc Logistics', label: 'Bvoc Logistics' },
    { value: 'Bvoc Prof', label: 'Bvoc Prof' },
    { value: 'MA English', label: 'MA English' },
    { value: 'MA Economics', label: 'MA Economics' },
    { value: 'MA History', label: 'MA History' },
    { value: 'Msc Microbilogy', label: 'Msc Microbilogy' },
    { value: 'Mcom', label: 'Mcom' },
  ];

  const onChange = (date: any) => {
    console.log(date);
    form.setFieldsValue({ joined_year: date });
  }



  return (
    <div className='h-screen ' ref={parent}>
      <div className="min-h-[450px] bg-white/10 backdrop-blur  text-center flex  w-full rounded-xl shadow border border-gray-50 flex-col md:flex-row overflow-hidden max-w-[1000px] mx-auto mt-20">
        <div className='flex items-center justify-center basis-1/2   bg-white flex-col '>
          <h1 className="text-4xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-dark-violet font-extrabold">Any Suggestion or Feedback</h1>
          <h2 className="text-2xl border  font-extrabold uppercase">JOIN now</h2>
          <img src="/Images/joinnow.png" alt="macbook" className="max-w-[300px] " />
        </div>
        <div className='flex flex-col  basis-1/2 border w-full justify-center bg-cream  p-10 mx-auto'>
          <Form
            form={form}
            name="basic"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
            requiredMark={false}
          >
            <Form.Item<FieldType>
              label="name"
              name="name"
            >
              <Input className="border rounded  border border-violet outline-none rounded-lg shadow p-3 bg-cream-light font-medium transition-all duration-300 ease-in-out hover:outline hover:outline-offset-2 hover:outline-violet hover:border-transparent " />
            </Form.Item>

            <Form.Item<FieldType>
              label="department"
              name="department"
            >
              <Select
                style={{ width: '100%' }}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option?.props?.children?.toString().toLowerCase().includes(input.toLowerCase())
                }
                className="border rounded border-violet outline-none rounded-lg shadow  bg-cream-light font-medium transition-all duration-300 ease-in-out hover:outline hover:outline-offset-2 hover:outline-violet hover:border-transparent" size='large'
              >
                {DepartmentOptions.map(option => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>

            </Form.Item>

            <Form.Item<FieldType>
              label="joined_year"
              name="joined_year"
            >
              <DatePicker onChange={onChange} picker="year" />
            </Form.Item>

            <Form.Item<FieldType>
              label="AdmissionNo"
              name="AdmissionNo"
            >
              <Input className="border rounded  border border-violet outline-none rounded-lg shadow p-3 bg-cream-light font-medium transition-all duration-300 ease-in-out hover:outline hover:outline-offset-2 hover:outline-violet hover:border-transparent " />
            </Form.Item>

            <Form.Item<FieldType>
              label="mobile"
              name="mobile"
            >
              <Input className="border rounded  border border-violet outline-none rounded-lg shadow p-3 bg-cream-light font-medium transition-all duration-300 ease-in-out hover:outline hover:outline-offset-2 hover:outline-violet hover:border-transparent " />
            </Form.Item>

            <Form.Item<FieldType>
              label="email"
              name="email"
            >
              <Input className="border rounded  border border-violet outline-none rounded-lg shadow p-3 bg-cream-light font-medium transition-all duration-300 ease-in-out hover:outline hover:outline-offset-2 hover:outline-violet hover:border-transparent " />
            </Form.Item>

            <button type="submit" className="bg-primary-light text-white font-semibold px-4 py-3 rounded-md w-full">
              Submit
            </button>
          </Form>
        </div>
      </div>

    </div>

  )
};

export default App;