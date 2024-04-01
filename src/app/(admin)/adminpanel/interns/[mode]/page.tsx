'use client';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Spin, Form, type FormProps, Input, message, Upload, Select, DatePicker, Result } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { db, auth, storage } from '@/app/server/config/firebase';
import {
  collection,
  addDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';
// import { v4 } from "uuid";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type FieldType = {
  name?: string;
  role?: string;
  department?: string;
  joined_year?: any;
  github?: string;
  linkedin?: string;
  instagram?: string;
  profession?: string;
  AdmissionNo?: string;
  active?: boolean;
  image?: string;
};

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};



const App: React.FC = (params: any) => {
  const [form] = Form.useForm();
  const [parent, enableAnimations] = useAutoAnimate();
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [imgUrl, setimgUrl] = useState('')
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const pathname = usePathname();
  const [selectedDepartment, setSelectedDepartment] = useState<any>('');
  const [DateValue, setDateValue] = useState<any>(dayjs());
  const router = useRouter()
  const [fetchedData, setFetchedData] = useState<any>(null);
  const [submit, setSubmit] = useState(false)



  let mode = pathname.includes('/edit') ? 'Edit' : 'Add';
  const getIdFromPathname = (pathname: any) => {
    const parts = pathname.split('-');
    return parts[parts.length - 1];
  };
  let id = mode === 'Edit' ? getIdFromPathname(pathname) : null;
  const docRef = doc(db, `Interns/${id}`)

  useEffect(() => {
    if (mode === 'Edit') {
      id = getIdFromPathname(pathname);
      fetchData(id);
    } else {
      setLoadingPage(false);
      setDateValue(2024);
    }
  }, [pathname, mode]);

  const fetchData = async (id: any) => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('Data:', data);
      form.setFieldsValue({
        name: data.name,
        role: data.role,
        department: data.department,
        short_department: data.short_department,
        github: data.social.github,
        linkedin: data.social.linkedin,
        instagram: data.social.instagram,
        profession: data.profession,
        AdmissionNo: data.AdmissionNo,
        active: data.active,
        imageUrl: data.imageUrl,
      });
      setFetchedData(data);
      setDateValue(data.joined_year);
      setimgUrl(data.imageUrl)
      setImageUrl(data.imageUrl);
      setLoadingPage(false)
    } else {
      console.log('Document does not exist');
      setLoadingPage(false)
      message.warning('Data not found')
    }
  };

  const uploadFile = async (values: any) => {
    if (mode === 'Edit') {
      if (imgUrl === imageUrl) {
        updateIntern(values, imgUrl)
        return;
      }
    }
    if (!imageUpload) return message.warning('Plese upload image');
    console.log(imageUpload)
    const imageRef = ref(storage, `interns/${imageUpload?.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      console.log('Image URL:', url);
      const waitForUrl = setInterval(() => {
        if (url) {
          clearInterval(waitForUrl);
          setimgUrl(url);
          if (mode === 'Edit') {
            updateIntern(values, url)
          } else {
            onSubmitIntern(values, url);
          }
        }
      }, 1000);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log('Success:', values);

    uploadFile(values);

  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const internCollectionRef = collection(db, 'Interns');
  const onSubmitIntern = async (values: any, url: any) => {
    if (url) {
      console.log('ssssss')
    } else {
      return
    }
    const currentYear = new Date().getFullYear();
    if (DateValue && DateValue.year() > currentYear) {
      message.warning('Joined year must be less than or equal to the current year');
      return;
    }
    const activeValue = values.active !== undefined ? values.active : true;
    try {
      await addDoc(internCollectionRef, {
        name: values.name,
        role: values.role,
        department: values.department,
        short_department: selectedDepartment.data.short,
        joined_year: DateValue.year(),
        social: {
          github: values.github || 'https://github.com/',
          linkedin: values.linkedin || 'https://www.instagram.com/',
          instagram: values.instagram || 'https://www.linkedin.com/',
        },
        profession: values.profession || 'Student',
        AdmissionNo: values.AdmissionNo || "",
        active: activeValue || true,
        imageUrl: url,
        userId: auth?.currentUser?.uid,
      });
      setSubmit(true)
      message.success('Document successfully added!');
      console.log('Document successfully added!');
    } catch (err) {
      console.error(err);
    }
  };

  const updateIntern = async (values: any, url: any) => {

    const updates: Record<string, any> = {};

    if (values.name && values.name !== fetchedData.name) {
      updates.name = values.name;
    }
    if (values.role && values.role !== fetchedData.role) {
      updates.role = values.role;
    }
    if (values.department && values.department !== fetchedData.department) {
      updates.department = values.department;
    }
    if (values.joined_year && values.joined_year !== fetchedData.joined_year) {
      const currentYear = new Date().getFullYear();
      if (DateValue && DateValue.year() > currentYear) {
        message.warning('Joined year must be less than or equal to the current year');
        return;
      }
      updates.joined_year = values.joined_year;
    }
    if (values.github && values.github !== fetchedData.social.github) {
      updates['social.github'] = values.github;
    }
    if (values.linkedin && values.linkedin !== fetchedData.social.linkedin) {
      updates['social.linkedin'] = values.linkedin;
    }
    if (values.instagram && values.instagram !== fetchedData.social.instagram) {
      updates['social.instagram'] = values.instagram;
    }
    if (values.profession && values.profession !== fetchedData.profession) {
      updates.profession = values.profession;
    }
    if (values.AdmissionNo && values.AdmissionNo !== fetchedData.AdmissionNo) {
      updates.AdmissionNo = values.AdmissionNo;
    }
    if (values.active !== undefined && values.active !== fetchedData.active) {
      updates.active = values.active;
    }
    if (url && url !== imageUrl) {
      updates.imageUrl = url;
    }
    if (selectedDepartment && values.department !== fetchedData.department && selectedDepartment.data.short !== '') {
      updates.short_department = selectedDepartment.data.short;
    }
    console.log('Updates:', updates);
    await updateDoc(docRef, updates).then(() => {
      setSubmit(true)
      message.success('Document successfully updated!');
      console.log('Document successfully updated!');
    }).catch((error) => {
      console.error('Error updating document: ', error);
    });
  };


  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setImageUpload(info.file.originFileObj);
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setimgUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const handleStatusChange = (value: boolean) => {
    form.setFieldsValue({
      active: value,
    });
  };


  const DepartmentOptions = [
    { value: 'BA Economics', label: 'BA Economics', short: 'BA Econ' },
    { value: 'BA English', label: 'BA English', short: 'BA Eng' },
    { value: 'BA West Asia', label: 'BA West Asia', short: 'BA WA' },
    { value: 'BBA', label: 'BBA', short: 'BBA' },
    { value: 'BSc Biotechnology', label: 'BSc Biotechnology', short: 'Bsc Bio' },
    { value: 'BSc Biochemistry', label: 'BSc Biochemistry', short: 'Bsc Chem' },
    { value: 'BSc Computer Science', label: 'BSc Computer Science', short: 'Bsc CS' },
    { value: 'BSc Maths and Physics', label: 'BSc Maths and Physics', short: 'Bsc DM' },
    { value: 'BSc Microbiology', label: 'BSc Microbiology', short: 'Bsc Micro' },
    { value: 'Bcom CA', label: 'Bcom CA', short: 'Bcom CA' },
    { value: 'Bcom co - op', label: 'Bcom co - op', short: 'Bcom CO' },
    { value: 'Bvoc Islamic Finance', label: 'Bvoc Islamic Finance', short: 'Bvoc Isl Fin' },
    { value: 'Bvoc Logistics', label: 'Bvoc Logistics', short: 'Bvoc Log' },
    { value: 'Bvoc Prof', label: 'Bvoc Prof', short: 'Bvoc Prof' },
    { value: 'MA English', label: 'MA English', short: 'MA Eng' },
    { value: 'MA Economics', label: 'MA Economics', short: 'MA Econ' },
    { value: 'MA History', label: 'MA History', short: 'MA Hist' },
    { value: 'Msc Microbilogy', label: 'Msc Microbilogy', short: 'Msc Micro' },
    { value: 'Mcom', label: 'Mcom', short: 'Mcom' },
  ];

  const onChange = (date: any) => {
    console.log(date);
    setDateValue(date);
    form.setFieldsValue({ joined_year: date });
  }

  const handleDepartmentChange = (value: any, option: any) => {
    console.log(`selected ${value}`);
    console.log(option)
    setSelectedDepartment(option);
  };
  const handleGoBack = () => {
    router.push('/adminpanel/interns')
  }
  const handleAddIntern = () => {
    router.push('/adminpanel/interns/add')
  }

  return (
    <div className='min-h-screen' ref={parent}>
      {submit ? (
        <div className='mx-auto flex items-center justify-center'>
          <Result
            status="success"
            title="Successfully!"
            subTitle="Intern added successfully."
            extra={[
              <Button type="primary" onClick={handleGoBack} key="console">
                Go to Interns
              </Button>,
              <Button onClick={handleAddIntern} key="buy">Add new Intern</Button>,
            ]}
          />
        </div>
      ) : (
        <>
          <h1 className='text-black text-center my-10 text-2xl font-semibold'>
            {mode} Intern
          </h1>
          {loadingPage ? (
            <div className='mx-auto flex items-center justify-center'>
              <Spin size='large' />
            </div>
          ) : (
            <div className='w-full mx-auto'>
              <Form
                form={form}
                name="basic"
                style={{ maxWidth: 800, minWidth: 300 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
                className='overflow-auto mx-auto'
              >
                <div className='flex flex-col md:flex-row items-center w-full  mx-auto md:gap-4 lg:gap-10  max-w-[800px] min-w-full p-4'>
                  <div className='basis-1/2 flex flex-col w-full'>
                    <Form.Item<FieldType>
                      label="image"
                      name="image"
                      rules={[mode !== 'Edit' ? { required: true, message: 'Please upload image!' } : { required: false }]}
                      hasFeedback
                      className='text-xl font-semibold'

                    >
                      <div className='w-full mx-auto flex items-center justify-center'>
                        <Upload
                          name="avatar"
                          listType="picture-card"
                          className="avatar-uploader"
                          showUploadList={false}
                          beforeUpload={beforeUpload}
                          onChange={handleChange}
                          accept='image/png, image/jpeg'
                        >
                          {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                      </div>

                    </Form.Item>

                    <Form.Item<FieldType>
                      label="name"
                      name="name"
                      rules={[{ required: true, message: 'Please input your name!' }]}
                      hasFeedback
                      className='text-xl font-semibold'

                    >
                      <Input size='large' />
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="department"
                      name="department"
                      rules={[{ required: true, message: 'Please select department!' }]}
                      hasFeedback
                      className='text-xl font-semibold'

                    >
                      <Select
                        style={{ width: '100%' }}
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option?.props?.children?.toString().toLowerCase().includes(input.toLowerCase())
                        }
                        onChange={handleDepartmentChange}
                        className="border rounded border-violet outline-none rounded-lg shadow  bg-cream-light font-medium transition-all duration-300 ease-in-out hover:outline hover:outline-offset-2 hover:outline-violet hover:border-transparent" size='large'
                      >
                        {DepartmentOptions.map(option => (
                          <Select.Option key={option.value} value={option.value} data={{ short: option.short }}>
                            {option.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="role"
                      name="role"
                      rules={[{ required: true, message: 'Please input your role!' }]}
                      hasFeedback
                      className='text-xl font-semibold'

                    >
                      <Input size='large' />
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="joined_year"
                      name="joined_year"
                      rules={[mode !== 'Edit' ? { required: true, message: 'Please select joined year!' } : { required: false }]}
                      hasFeedback
                      className='text-xl font-semibold'

                    >
                      <DatePicker
                        onChange={onChange}
                        picker="year"
                        defaultValue={mode === 'Edit' ? dayjs(`${DateValue}`) : undefined}
                        style={{ width: '100%' }} size='large' />
                    </Form.Item>
                  </div>
                  <div className='basis-1/2 flex flex-col w-full'>
                    <Form.Item<FieldType>
                      label="linkedin"
                      name="linkedin"
                      className='text-xl font-semibold'
                      hasFeedback

                    >
                      <Input size='large' />
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="github"
                      name="github"
                      className='text-xl font-semibold'
                      hasFeedback

                    >
                      <Input size='large' />
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="instagram"
                      name="instagram"
                      className='text-xl font-semibold'
                      hasFeedback

                    >
                      <Input size='large' />
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="AdmissionNo"
                      name="AdmissionNo"
                      className='text-xl font-semibold'
                      hasFeedback

                    >
                      <Input size='large' />
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="profession"
                      name="profession"
                      className='text-xl font-semibold'
                      hasFeedback

                    >
                      <Input size='large' />
                    </Form.Item>

                    <Form.Item<FieldType>
                      label="active"
                      name="active"
                      className='text-xl font-semibold'
                      hasFeedback

                    >
                      <Select
                        size='large'
                        defaultValue={true}
                        style={{ width: '100%' }}
                        onChange={handleStatusChange}
                        options={[
                          { value: true, label: 'active' },
                          { value: false, label: 'inactive' },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </div>


                <Form.Item className='mx-auto w-full'>
                  <Button type="primary" htmlType="submit" className='mx-auto w-full' size='large'>
                    Submit
                  </Button>
                </Form.Item>

              </Form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;