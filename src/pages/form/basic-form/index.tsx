import { InboxOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import {
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Upload,
  UploadProps,
  message,
} from 'antd';
import Mock from 'mockjs';
import type { FC } from 'react';
import { useState } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import { fakeSubmitForm } from './service';
import TinyMceEditor from './tinyEditor';

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const BasicForm: FC<Record<string, any>> = () => {
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('با موفقیت ثبت شد');
    },
  });
  const onFinish = async (values: Record<string, any>) => {
    run(values);
  };

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

  // console.log(form.getFieldError('date'))

  return (
    <PageContainer content="از صفحات فرم برای جمع آوری یا تایید اطلاعات از کاربران استفاده می شود.">
      <Card>
        <ProForm
          submitter={{
            // Configure the button text
            searchConfig: {
              resetText: 'reset',
              submitText: 'submit',
            },
            // Configure the properties of the button
            resetButtonProps: {
              style: {
                // Hide the reset button
                display: 'none',
              },
            },
            submitButtonProps: {},

            // Fully customize the entire area
            render: (props) => {
              return [
                <Flex key="submitter" gap="middle" style={{ flexDirection: 'row-reverse' }}>
                  <Form.Item>
                    <Button
                      key="submit"
                      type="primary"
                      htmlType="submit"
                      onClick={() => props.form?.submit?.()}
                    >
                      ثبت
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button key="rest" htmlType="reset" onClick={() => props.form?.resetFields()}>
                      انصراف
                    </Button>
                  </Form.Item>
                </Flex>,
                // <button
                //   type="button"
                //   key="rest"
                //   onClick={() => props.form?.resetFields()}
                // >
                //   Reset
                // </button>,
                // <button
                //   type="button"
                //   key="submit"
                //   onClick={() => props.form?.submit?.()}
                // >
                //   Submit
                // </button>,
              ];
            },
          }}
          // ref={formRef}
          // style={{
          //   width: '100%'
          //   // margin: 'auto',
          //   // marginTop: 8,
          //   // maxWidth: 600,
          // }}
          name="basic"
          // layout="horizontal"
          layout="vertical"
          initialValues={{
            name: '',
            title: '',
            number: '',
            email: '',
            codemelli: '',
            sex: '',
            date: '',
            file: '',
            multiSelect: [],
            select2: '',
            goal: '',
            standard: '',
            client: '',
            invites: '',
            weight: '',
            publicType: '',
            publicUsers: '',
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="حروف و عدد"
            name="name"
            rules={[{ required: true, message: 'لطفا فیلد را وارد کنید .' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="فقط حروف"
            name="title"
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
            label="E-mail"
            name="email"
            rules={[
              { type: 'email', message: 'ایمیل معتبر نمیباشد!' },
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

          <Form.Item
            style={{ border: '1px solid #d9d9d9', borderRadius: '6px', paddingRight: '10px' }}
            label="جنسیت"
            name="sex"
            rules={[{ required: true, message: 'انتخاب کنید ' }]}
          >
            <Radio.Group onChange={onChangeRadio} value={radioValue}>
              <Radio value={1}>مونث</Radio>
              <Radio value={2}>مذکر</Radio>
            </Radio.Group>
          </Form.Item>

          {/* <ProFormDateRangePicker
            label="تاریخ شروع و پایان"
            name="date"
            rules={[
              {
                required: true,
                message: 'لطفا تاریخ شروع و پایان را انتخاب کنید',
              },
            ]}
            // className={styles.rangePicker}
            fieldProps={{
              style: {
                width: '100%',
              },
            }}
            placeholder={['تاریخ شروع', 'تاریخ پایان']}
          /> */}
          {/* <Form.Item
            label="تاریخ شروع و پایان"
            name="dateduration"
            rules={[
              {
                required: true,
                message: "لطفا تاریخ را وارد کنید .",
              },
            ]}
          >
            <DatePicker
              multiple
              range
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              inputClass={
                form.getFieldError("dateduration").length
                  ? " rmdp-input-datePicker error-border"
                  : "rmdp-input-datePicker"
              }
            />
          </Form.Item> */}

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
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom"
              inputClass={
                form.getFieldError('date')?.length
                  ? ' rmdp-input-datePicker error-border'
                  : 'rmdp-input-datePicker'
              }
              // inputClass='rmdp-input-datePicker'
            />
          </Form.Item>
          {/* <ProFormUploadDragger
            accept="image/*, video/*"
            description=""
            title="برای بارگزاری فایل کلیک کنید یا فایل را اینجا رها کنید"
            label="آپلود فایل"
            name="آپلود"
          /> */}

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

          <ProFormSelect
            name="multiSelect"
            label="چند انتخابی"
            valueEnum={{
              t1: 'مورد اول',
              t2: 'مورد دوم',
              t3: 'مورد سوم',
            }}
            fieldProps={{
              mode: 'multiple',
            }}
            placeholder=""
            rules={[
              {
                required: true,
                message: 'حداقل یک مورد را انتخاب کنید!',
                type: 'array',
              },
            ]}
          />
          <ProFormSelect
            name="select2"
            label="قابل سرچ بودن سلکت"
            showSearch
            debounceTime={300}
            request={async ({ keyWords }) => {
              await waitTime(100);
              // console.log(
              //   Mock.mock({
              //     'data|1-10': [
              //       {
              //         value: '@id',
              //         label: '@name',
              //       },
              //     ],
              //   }).data.concat({
              //     value: keyWords,
              //     label: '目标_target',
              //   }),
              // );
              return Mock.mock({
                'data|1-10': [
                  {
                    value: '@id',
                    label: '@name',
                  },
                ],
              }).data.concat([
                {
                  value: keyWords,
                  label: '目标_target',
                },
                { value: '520000201604258831', label: 'Patricia Lopez' },
                { value: '520000198509222123', label: 'Jose Martinez' },
                { value: '210000200811194757', label: 'Elizabeth Thomas' },
                { value: '530000198808222758', label: 'Scott Anderson' },
                { value: '500000198703236285', label: 'George Jackson' },
                { value: '610000199906148074', label: 'Linda Hernandez' },
                { value: '150000197210168659', label: 'Sandra Hall' },
                { label: '目标_target' },
              ]);
            }}
            placeholder="یک مورد را انتخاب کنید"
            rules={[{ required: true, message: 'لطفا یک مورد را انتخاب کنید!' }]}
          />
          <ProFormTextArea
            label="شرح هدف"
            // width="xl"
            name="goal"
            rules={[
              {
                required: true,
                message: 'لطفاً شرح هدف را وارد کنید',
              },
            ]}
            placeholder="لطفاً اهداف کاری مرحله‌ای خود را وارد کنید"
          />

          <ProFormTextArea
            label="معیارهای"
            name="standard"
            // width="xl"
            rules={[
              {
                required: true,
                message: 'لطفا معیارها را وارد کنید',
              },
            ]}
            placeholder="لطفا معیارها را وارد کنید"
          />
          {/* 
          <ProFormText
            // width="md"
            label={
              <span>
                مشتری
                <em className={styles.optional}>（اختیاری）</em>
              </span>
            }
            tooltip="دریافت کنندگان خدمات هدف"
            name="client"
            placeholder="لطفاً مشتریانی را که به آنها خدمات ارائه می‌دهید توصیف کنید، مشتریان داخلی مستقیماً @name/job number"
          /> */}

          {/* <ProFormText
            // width="md"
            label={
              <span>
                از بازبینان دعوت کنید
                <em className={styles.optional}>（اختیاری）</em>
              </span>
            }
            name="invites"
            placeholder="لطفا مستقیماً @name/شماره کارمند، می توانید حداکثر 5 نفر را دعوت کنید"
          /> */}
          <TinyMceEditor name="description" label="توضیحات" required />
          {/* <ProFormDigit
            label={
              <span>
                وزن ها
                <em className={styles.optional}>（اختیاری）</em>
              </span>
            }
            name="weight"
            placeholder="لطفا وارد کنید"
            min={0}
            max={100}
            // width="xs"
            fieldProps={{
              formatter: (value) => `${value || 0}%`,
              parser: (value) => Number(value ? value.replace('%', '') : '0'),
            }}
          /> */}
          <ProCard title="هدف " bordered collapsible>
            <ProFormRadio.Group
              options={[
                {
                  value: '1',
                  label: 'عمومی',
                },
                {
                  value: '2',
                  label: 'تا حدی عمومی',
                },
                {
                  value: '3',
                  label: 'خصوصی',
                },
              ]}
              // label="عمومی هدف"
              help="مشتریان و بازبین ها به طور پیش فرض به اشتراک گذاشته می شوند"
              name="publicType"
              rules={[
                {
                  required: true,
                  message: 'لطفا را وارد کنید',
                },
              ]}
            />

            <ProFormDependency name={['publicType']}>
              {({ publicType }) => {
                return (
                  <ProFormSelect
                    // width="md"
                    name="publicUsers"
                    fieldProps={{
                      style: {
                        // margin: '8px 0',
                        display: publicType && publicType === '2' ? 'block' : 'none',
                      },
                    }}
                    options={[
                      {
                        value: '1',
                        label: 'همکار A',
                      },
                      {
                        value: '2',
                        label: 'همکار B',
                      },
                      {
                        value: '3',
                        label: 'همکار C',
                      },
                    ]}
                  />
                );
              }}
            </ProFormDependency>
          </ProCard>
          <Divider
            style={{
              margin: '24px 0',
            }}
          />

          {/* <Flex gap="middle" style={{ flexDirection: "row-reverse" }}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                ثبت
              </Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="reset">انصراف</Button>
            </Form.Item>
          </Flex> */}
        </ProForm>
      </Card>
    </PageContainer>
  );
};
export default BasicForm;
