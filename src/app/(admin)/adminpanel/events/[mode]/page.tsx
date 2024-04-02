'use client';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Spin, Form, type FormProps, Input, message, Upload, Select, DatePicker, Result } from 'antd';
import dayjs from 'dayjs';
import { usePathname, useRouter } from 'next/navigation';
import { db, auth, storage } from '@/app/config/firebase';
import {
  collection,
  addDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';
import { onValue } from 'firebase/database';
// import { v4 } from "uuid";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type FieldType = {
  title?: string;
  Date?: any;
  summary?: string;
  short_description?: string;
  join_link?: string;
  Gallery?: [];
  Status?: string;
  imageUrl?: string;
  createdAt?: any;
};
const { TextArea } = Input;
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
  const [submited, setSubmited] = useState(false)
  const [fetchedData, setFetchedData] = useState<any>({});
  const pathname = usePathname();
  const router = useRouter()
  const [DateValue, setDateValue] = useState<any>(dayjs());
  console.log('Pathname:', params);
  let mode = pathname.includes('/edit') ? 'Edit' : 'Add';
  const getIdFromPathname = (pathname: any) => {
    const parts = pathname.split('-');
    return parts[parts.length - 1];
  };
  let id = mode === 'Edit' ? getIdFromPathname(pathname) : null;
  const docRef = doc(db, `Events/${id}`);

  useEffect(() => {
    if (mode === 'Edit') {
      id = getIdFromPathname(pathname);
      fetchData(id);
    } else {
      setLoadingPage(false)
    }
  }, [pathname, mode]);

  const fetchData = async (id: any) => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('Data:', data);
      form.setFieldsValue({
        title: data.title,
        summary: data.summary,
        Date: setDateValue(dayjs(data.Date)),
        imageUrl: data.imageUrl,
        short_description: data.short_description,
        join_link: data.join_link,
        Status: data.Status,
      });
      setFetchedData(data);
      setimgUrl(data.imageUrl)
      setImageUrl(data.imageUrl)
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
        updateEvent(values)
        return;
      }
    }
    if (!imageUpload) return message.warning('Plese upload image');
    const imageRef = ref(storage, `events/${imageUpload?.name}`);
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(snapshot.ref);
      console.log('Image URL:', url);
      const waitForUrl = setInterval(() => {
        if (url) {
          clearInterval(waitForUrl);
          setImageUrl(url);
          setimgUrl(url);
          onSubmitEvent(values, url);
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

  const eventCollectionRef = collection(db, 'Events');
  const onSubmitEvent = async (values: any, url: any) => {
    try {
      await addDoc(eventCollectionRef, {
        title: values.title,
        imageUrl: url,
        Date: values.Date.toString(),
        summary: values.summary,
        short_description: values.short_description,
        join_link: values.join_link,
        Status: values.Status,
        createdAt: serverTimestamp(),
        userId: auth?.currentUser?.uid,
      });
      setSubmited(true);
      message.success('Document successfully added!');
      console.log('Document successfully added!');
    } catch (err) {
      console.error(err);
    }
  };

  const updateEvent = async (values: any) => {
    const updateData: any = {};

    // Check if each field is different from the current value in the document
    if (values.title !== fetchedData.name) {
      updateData.name = values.title;
    }
    if (imgUrl && imgUrl !== fetchedData.imageUrl) {
      updateData.imageUrl = imgUrl;
    }
    if (values.Date !== undefined && values.Date !== '') {
      if (DateValue !== fetchedData.Date) {

        updateData.Date = values.Date.toString();
      }
    }
    if (values.summary !== fetchedData.summary) {
      updateData.summary = values.summary;
    }
    if (values.short_description !== fetchedData.short_description) {
      updateData.short_description = values.short_description;
    }
    if (values.join_link !== fetchedData.join_link) {
      updateData.join_link = values.join_link;
    }
    if (values.Status !== fetchedData.Status) {
      updateData.Status = values.Status;
    }
    console.log('Update data:', updateData);
    // Update the document with the changed fields
    await updateDoc(docRef, updateData).then(() => {
      setSubmited(true);
      message.success('Document successfully updated!')
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



  const onChange = (date: any) => {
    console.log(date);
    setDateValue(date);
    form.setFieldsValue({ Date: date });
  };


  const handleStatusChange = (value: any) => {
    console.log(value);
    form.setFieldsValue({ Status: value });
  }
  const handleGoBack = () => {
    router.push('/adminpanel/events')
  }
  const handleAddEvent = () => {
    router.push('/adminpanel/events/add')
  }

  return (
    <div className='min-h-screen' ref={parent}>
      {submited ? (
        <div className='mx-auto flex items-center justify-center'>
          <Result
            status="success"
            title="Successfully!"
            subTitle="Intern added successfully."
            extra={[
              <Button type="primary" onClick={handleGoBack} key="console">
                Go to Events
              </Button>,
              <Button onClick={handleAddEvent} key="buy">Add new Event</Button>,
            ]}
          />
        </div>
      ) : (
        <div>
          <h1 className='text-black text-center my-10 text-xl'>
            {mode}
          </h1>
          {loadingPage ? (
            <div className='mx-auto flex items-center justify-center'>
              <Spin size='large' />
            </div>
          ) : (
            <div className='w-full mx-auto flex items-center justify-center p-4'>
              <Form
                form={form}
                name="basic"
                style={{ width: '100%', maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout='vertical'
              >
                <Form.Item<FieldType>
                  label="imageUrl"
                  name="imageUrl"
                  rules={[mode !== 'Edit' ? { required: true, message: 'Please upload image!' } : { required: false }]}
                  hasFeedback
                >
                  <div className='w-full mx-auto flex items-center justify-center '>
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
                  label="title"
                  name="title"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input size='large' />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Date"
                  name="Date"
                  rules={[mode !== 'Edit' ? { required: true, message: 'Please input your date!' } : { required: false }]}
                  hasFeedback
                >
                  <DatePicker
                    defaultValue={mode === 'Edit' ? dayjs(DateValue) : undefined}
                    onChange={onChange}
                    style={{ width: '100%' }}
                    size='large'
                  />
                </Form.Item>

                <Form.Item<FieldType>
                  label="summary"
                  name="summary"
                  rules={[{ required: true, message: 'Please input your summary!' }]}
                  hasFeedback
                >
                  <TextArea rows={4} size='large' />
                </Form.Item>

                <Form.Item<FieldType>
                  label="short description"
                  name="short_description"
                  rules={[{ required: true, message: 'Please input your short description!' }]}
                  hasFeedback
                >
                  <TextArea rows={2} maxLength={100} size='large' />
                </Form.Item>

                <Form.Item<FieldType>
                  label="join link"
                  name="join_link"
                  hasFeedback

                >
                  <Input size='large' />
                </Form.Item>

                <Form.Item
                  label="Status"
                  name="Status"
                  hasFeedback
                >
                  <Select onChange={handleStatusChange} options={[
                    { value: 'draft', label: 'draft' },
                    { value: 'Publish', label: 'Publish' },
                    { value: 'Cancel', label: 'Cancel' },
                  ]}
                    size='large'
                  />
                </Form.Item>

                <Form.Item >
                  <Button type="primary" htmlType="submit" size='large' className='w-full'>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
      )}
    </div>

  )
};

export default App;


// export async function getStaticPaths() {
//   // Fetch paths from Firestore
//   // Example: Fetch all event IDs from Firestore

//   const pathname = usePathname();
//   let mode = pathname.includes('/edit') ? 'Edit' : 'Add';
//   const getIdFromPathname = (pathname: any) => {
//     const parts = pathname.split('-');
//     return parts[parts.length - 1];
//   };


//   let id = mode === 'Edit' ? getIdFromPathname(pathname) : null;
//   const docRef = doc(db, 'Events', id);
//   const eventsSnapshot = await getDoc(docRef);
  
//   // Ensure that the document exists before creating paths
//   if (eventsSnapshot.exists()) {
//     return {
//       paths: [{ params: { mode: id } }],
//       fallback: false,
//     };
//   } else {
//     console.error('Document does not exist');
//     return {
//       paths: [],
//       fallback: false,
//     };
//   }
  
// }