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
  serverTimestamp,
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
  const [loading, setLoading] = useState(false);
  const [submited, setSubmited] = useState(false);
  const router = useRouter();



  const onFinish: FormProps<FieldType>["onFinish"] = (values: any) => {
    console.log('Success:', values);
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(values.mobile)) {
      message.warning('Please enter a valid mobile number');
      return;
    }

    const currentYear = new Date().getFullYear();
    if (values.joined_year && values.joined_year.year() > currentYear) {
      message.warning('Joined year must be less than or equal to the current year');
      return;
    }

    // Continue with submission
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
        createdAt: serverTimestamp(),
      });
      setLoading(true);
      setTimeout(() => {
        message.success('Document successfully added!');
        setSubmited(true);
        setLoading(false);
      }, 1000);
      setTimeout(() => {
        router.push('/');
      }, 2500);
      setTimeout(() => {
        form.resetFields();
        setSubmited(false);
      }, 3000);
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
    <div className='' ref={parent}>
      <div className='m-4 joinNow'>

        <div className="min-h-[450px] bg-white/10 backdrop-blur  text-center flex  w-full rounded-2xl shadow border border-gray-50 flex-col lg:flex-row overflow-hidden max-w-[1000px] mx-auto  my-24">
          {loading ? <div className='absolute top-0 left-0 w-full h-full bg-white/50 flex items-center justify-center z-50'>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin sizes="large" />} />
          </div> : null}
          {submited ? <div className='absolute top-0 left-0 w-full h-full bg-white/50 flex items-center justify-center z-50'>
            <div className='bg-white p-10 rounded-xl shadow-lg'>
              <h1 className='text-3xl md:text-4xl text-violet font-bold'>Thank you for joining us!</h1>
              <p className='text-lg'>We will get back to you soon.</p>
            </div>
          </div> : null}

          <div className='flex items-center justify-center basis-2/5   bg-white flex-col relative py-10 lg:py-0'>
            <h1 className="text-3xl md:text-4xl bg-gradient-to-b text-transparent bg-clip-text from-violet to-dark-violet font-extrabold">Welcome to Connect</h1>
            <img src='/Images/joinnow!.png' alt='Developer' className='absolute top-24 lg:top-56 z-0 w-[280px] md:w-full' />
            <img src="/Images/joinnow.png" alt="macbook" className="max-w-[400px] md:max-w-[450px] z-10" />
          </div>
          <div className='flex flex-col mx-auto  basis-3/5 border w-full justify-center bg-cream  p-10 mx-auto'>
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
              className='mx-auto w-full'
            >
              <Form.Item<FieldType>
                label="Full Name"
                name="name"
                className='font-bold text-lg text-black'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your full name',
                  },
                  {
                    min: 3,
                    message: 'Full name must be at least 3 characters',
                  },
                ]}
                hasFeedback
              >
                {/* hover:outline hover:outline-offset-2 hover:outline-violet */}
                <Input className="border rounded-xl border-violet outline-none focus-none rounded-lg shadow p-3 bg-cream-light font-medium transition-all duration-300 ease-in-out  input" placeholder='Your Full Name' />
              </Form.Item>

              <Form.Item<FieldType>
                label="Department"
                name="department"
                className='font-bold text-lg text-black'
                rules={[
                  {
                    required: true,
                    message: 'Please select your department',
                  },
                ]}
                hasFeedback
              >
                <Select
                  style={{ width: '100%' }}
                  showSearch
                  optionFilterProp="children"
                  placeholder="Select Your department"
                  filterOption={(input, option) =>
                    option?.props?.children?.toString().toLowerCase().includes(input.toLowerCase())
                  }
                  className="" size='large'
                >
                  {DepartmentOptions.map(option => (
                    <Select.Option key={option.value} value={option.value} size='large'>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>

              </Form.Item>

              <Form.Item<FieldType>
                label="Join Year"
                name="joined_year"
                className='font-bold text-lg text-black'
                rules={[
                  {
                    required: true,
                    message: 'Please select your join year',
                  },
                ]}
                hasFeedback
              >
                <DatePicker className='border rounded-xl border-violet outline-none focus-none rounded-lg shadow p-3 bg-cream-light font-medium transition-all duration-300 ease-in-out  input' onChange={onChange} picker="year" placeholder='Pick You Joined Year' style={{ width: '100%' }} size='large' />
              </Form.Item>

              <Form.Item<FieldType>
                label="Admission No"
                name="AdmissionNo"
                className='font-bold text-lg text-black'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your Admission No',
                  },
                ]}
                hasFeedback

              >
                <Input className="border rounded-xl border-violet outline-none focus-none rounded-lg shadow p-3 bg-cream-light font-medium transition-all duration-300 ease-in-out  input" placeholder='Enter Your Admission No' />
              </Form.Item>

              <Form.Item<FieldType>
                label="Mobile number"
                name="mobile"
                className='font-bold text-lg text-black'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your mobile number',
                  },
                  {
                    min: 10,
                    message: 'Mobile number must be at least 10 digits',
                  },
                  {
                    max: 10,
                    message: 'Mobile number must be at most 10 digits',
                  },
                ]}
                hasFeedback
              >
                <Input className="border rounded-xl border-violet outline-none focus-none rounded-lg shadow p-3 bg-cream-light font-medium transition-all duration-300 ease-in-out  input" placeholder='Enter Your Mobile number' />
              </Form.Item>

              <Form.Item<FieldType>
                label="Email address"
                name="email"
                className='font-bold text-lg text-black'
                rules={[
                  {
                    required: true,
                    message: 'Please enter your email address',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email address',
                  }
                ]}
                hasFeedback
              >
                <Input className="border rounded-xl border-violet outline-none focus-none rounded-lg shadow p-3 bg-cream-light font-medium transition-all duration-300 ease-in-out  input" placeholder='Enter Your Email' />
              </Form.Item>

              <button type="submit" className="bg-primary-light text-white font-semibold px-4 py-3 rounded-xl w-full transition-all duration-300 ease-in-out hover:bg-violet text-lg">
                Submit
              </button>
            </Form>
          </div>
        </div>
      </div>

    </div>

  )
};

export default App;