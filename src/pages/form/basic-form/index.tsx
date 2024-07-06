import GroupBox from '@/libs/groupBox';
import { InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Layout,
  Radio,
  RadioChangeEvent,
  Select,
  Upload,
  UploadProps,
  message,
} from 'antd';
import JalaliProvider from 'antd-jalali-v5';
import { createStyles } from 'antd-style';
import type { FC } from 'react';
import { useState } from 'react';
import TinyMceEditor from './tinyEditor';

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const BasicForm: FC<Record<string, any>> = () => {
  // const { run } = useRequest(fakeSubmitForm, {
  //   manual: true,
  //   onSuccess: () => {
  //     message.success('با موفقیت ثبت شد');
  //   },
  // });
  // const onFinish = async (values: Record<string, any>) => {
  //   run(values);
  // };

  // Alpha
  const validateAlpha = (_, value) => {
    const regex = /^[a-zA-Z\u0600-\u06FF\s]*$/; // حروف فارسی و انگلیسی و فاصله
    if (value && !regex.test(value)) {
      return Promise.reject(new Error('لطفا فقط حروف وارد کنید.'));
    }
    return Promise.resolve();
  };
  const handleKeyPressAlpha = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);
    const regex = /^[a-zA-Z\u0600-\u06FF\s]*$/; // حروف فارسی و انگلیسی و فاصله
    if (!regex.test(charStr)) {
      event.preventDefault();
    }
  };

  // number
  const validateNumber = (_, value) => {
    const regex = /^[0-9]*$/; // فقط اعداد
    if (value && !regex.test(value)) {
      return Promise.reject(new Error('لطفا فقط عدد وارد کنید.'));
    }
    return Promise.resolve();
  };
  const handleKeyPressNumber = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    const charStr = String.fromCharCode(charCode);
    const regex = /^[0-9]*$/; // فقط اعداد
    if (!regex.test(charStr)) {
      event.preventDefault();
    }
  };

  // radio
  const [radioValue, setRadioValue] = useState(1);

  const onChangeRadio = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  // Upload file

  const { Dragger } = Upload;
  const draggerProps: UploadProps = {
    name: 'file',
    multiple: true,
    fileList: [],
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      // if (status !== "uploading") {
      //   console.log(info.file, info.fileList);
      // }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    // onDrop(e) {
    //   console.log("Dropped files", e.dataTransfer.files);
    // },
  };

  const [form] = Form.useForm();

  // multi select with search

  const { Option } = Select;
  const useStyles = createStyles({
    footer: {
      flexDirection: 'row-reverse',
    },
    divider: {
      margin: '24px 0',
    },
    datepicker: {
      width: '100%',
    },
    GroupBox: {
      paddingRight: '10px',
      border: '1px solid #d9d9d9',
      borderRadius: '6px',
    },
    GroupBoxError: {
      paddingRight: '10px',
      border: '1px solid #ff4d4f',
      borderRadius: '6px',
    },
  });

  const { styles } = useStyles();

  // console.log(form);

  return (
    <Layout>
      <Card>
        <Form
          scrollToFirstError
          autoComplete="off"
          layout="vertical"
          form={form}
          initialValues={{ mixName: '', char: '', number: '', email: '', codemelli: '' }}
        >
          <Form.Item
            label="حروف و عدد"
            name="mixName"
            rules={[{ required: true, message: 'لطفا فیلد را وارد کنید .' }]}
          >
            <Input />
          </Form.Item>

          <GroupBox title="جنسیت" required={true}>
            <Form.Item name="sex" rules={[{ required: true, message: 'انتخاب کنید ' }]}>
              <Radio.Group onChange={onChangeRadio} value={radioValue}>
                <Radio value={1}>مونث</Radio>
                <Radio value={2}>مذکر</Radio>
              </Radio.Group>
            </Form.Item>
          </GroupBox>
          <Form.Item
            label="فقط حروف"
            name="char"
            rules={[
              { required: true, message: 'لطفا فیلد را وارد کنید .' },
              { validator: validateAlpha },
            ]}
          >
            <Input onKeyPress={handleKeyPressAlpha} />
          </Form.Item>
          <Form.Item
            label="فقط عدد"
            name="number"
            rules={[
              { required: true, message: 'لطفا فیلد را وارد کنید .' },
              { validator: validateNumber },
            ]}
          >
            <Input onKeyPress={handleKeyPressNumber} />
          </Form.Item>

          <Form.Item
            label="ایمیل"
            name="email"
            rules={[
              { type: 'email', message: 'ایمیل معتبر نمیباشد' },
              { required: true, message: 'لطفا ایمیل را وارد نمایید!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="کدملی"
            name="codemelli"
            rules={[
              { required: true, message: 'کدملی را وارد نمایید' },
              { len: 10, message: '10رقم وارد نمایید' },
              { validator: validateNumber },
            ]}
          >
            <Input onKeyPress={handleKeyPressNumber} maxLength={10} />
          </Form.Item>

          {/* <Form.Item
            label="جنسیت"
            name="sex"
            rules={[{ required: true, message: 'انتخاب کنید ' }]}
          >
            <Radio.Group onChange={onChangeRadio} value={radioValue}>
              <Radio value={1}>مونث</Radio>
              <Radio value={2}>مذکر</Radio>
            </Radio.Group>
          </Form.Item> */}
          <JalaliProvider />
          <Form.Item
            label="تاریخ"
            name="date"
            rules={[
              {
                required: true,
                message: 'لطفا تاریخ را وارد کنید .',
              },
            ]}
          >
            <DatePicker className={styles.datepicker} />
          </Form.Item>

          <Form.Item
            label="بازه تاریخ"
            name="dateduration"
            rules={[
              {
                required: true,
                message: 'لطفا بازه تاریخ را وارد کنید .',
              },
            ]}
          >
            <DatePicker.RangePicker className={styles.datepicker} />
          </Form.Item>
          <Form.Item
            name="intro"
            label="توضیحات"
            rules={[{ required: true, message: 'لطفا توضیحات را وارد نمایید.' }]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
          <Form.Item
            label="بارگزاری فایل"
            name="file"
            rules={[
              {
                required: true,
                message: 'لطفا بارگزاری کنید',
              },
            ]}
          >
            <Dragger {...draggerProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                برای بارگزاری فایل کلیک کنید یا فایل را اینجا رها کنید
              </p>
              <p className="ant-upload-hint">jpg - png - jpeg</p>
            </Dragger>
          </Form.Item>
          <Form.Item
            name="select"
            label="سلکت"
            hasFeedback
            rules={[{ required: true, message: 'لطفا یک مورد را انتخاب کنید!' }]}
          >
            <Select placeholder="">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="select-multiple"
            label="قابل سرچ بودن سلکت "
            rules={[{ required: true, message: 'لطفا یک مورد را انتخاب کنید', type: 'array' }]}
          >
            <Select mode="multiple" placeholder="">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
          <TinyMceEditor name="description" label="توضیحات" required />
          <Divider className={styles.divider} />
          {/* </ProForm> */}
          <Flex gap="middle" className={styles.footer}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                ثبت
              </Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="reset">انصراف</Button>
            </Form.Item>
          </Flex>
        </Form>
      </Card>
    </Layout>
  );
};
export default BasicForm;
