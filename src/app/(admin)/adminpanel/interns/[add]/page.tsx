'use client';
import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Spin, Form, type FormProps, Input, message, Upload } from 'antd';
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
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';
// import { v4 } from "uuid";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type FieldType = {
  name?: string;
  age?: number;
  role?: string;
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
  const router = useRouter()
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
      setLoadingPage(false)
    }
  }, [pathname, mode]);

  const fetchData = async (id: any) => {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('Data:', data);
      form.setFieldsValue({
        name: data.name,
        age: data.age,
        role: data.role,
      });
      setimgUrl(data.imageUrl)
      setLoadingPage(false)
    } else {
      console.log('Document does not exist');
      setLoadingPage(false)
      message.warning('Data not found')
    }
  };

  const uploadFile = async (values: any) => {
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
          setImageUrl(url);
          setimgUrl(url);
          onSubmitIntern(values, url);
        }
      }, 1000);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log('Success:', values);
    if (mode === 'Edit') {
      updateIntern(values)
    } else {
      uploadFile(values);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const internCollectionRef = collection(db, 'Interns');
  const onSubmitIntern = async (values: any , url : any) => {
    if (url){
      console.log('ssssss')
    }else{
      return
    }
    try {
      await addDoc(internCollectionRef, {
        name: values.name,
        age: values.age,
        role: values.role,
        imageUrl: url,
        userId: auth?.currentUser?.uid,
      });
      message.success('Document successfully added!');
      console.log('Document successfully added!');
    } catch (err) {
      console.error(err);
    }
  };

  const updateIntern = async (values: any) => {
    await updateDoc(docRef, {
      name: values.name,
      age: values.age,
      role: values.role,
    }).then(() => {
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
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div className='h-screen bg-gray-400' ref={parent}>
      <h1 className='text-black text-center my-10 text-xl'>
        {mode}
      </h1>
      {loadingPage ? (
        <div className='mx-auto flex items-center justify-center'>
          <Spin size='large' />
        </div>
      ) : (
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>

          <Form.Item<FieldType>
            label="name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="age"
            name="age"
            rules={[{ required: true, message: 'Please input your age!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="role"
            name="role"
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}

      {/* <input
        type="file"
        onChange={(event :any) => {
          setImageUpload(event.target.files?.[0] ?? null);
        }}
      /> */}
    </div>

  )
};

export default App;