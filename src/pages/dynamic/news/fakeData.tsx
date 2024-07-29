import { ProFormProps } from '@ant-design/pro-components';
import { Button, Flex } from 'antd';
import { JsonComponent } from '../types';
// Define the handleCancel function
import { history } from '@umijs/max';
const handleCancel = () => {
  history.push('/content/dynamic/news');
  // Additional logic for handling cancel can be added here
};

// Define the submitHandler function
const submitHandler = (data: any) => {
  console.log('Form submitted with data:', data);
  // Additional logic for form submission can be added here
};

// Function to determine if the mode is create
const isCreateMode = (): boolean => {
  return history?.location?.pathname === '/content/dynamic/news/create';
};
export const updateNewsJson: JsonComponent = {
  type: 'Card',
  props: {},
  children: [
    {
      type: 'ProForm',
      props: {
        submitter: {
          render: (props: ProFormProps) => (
            <Flex justify="end" align="center" gap={'middle'} key="submitBtns">
              <Button key="submit" type="primary" onClick={() => props.form?.submit()}>
                {isCreateMode() ? 'ایجاد' : 'ویرایش'}
              </Button>
              <Button key="rest" htmlType="reset" onClick={handleCancel}>
                انصراف
              </Button>
            </Flex>
          ),
        },
        onFinish: (data: any) => submitHandler(data),
      },
      children: [
        {
          type: 'ProFormUploadDragger',
          props: {
            label: 'بارگزاری عکس',
            name: 'file',
            rules: [
              {
                required: true,
                message: 'ورود این فیلد الزامی است',
              },
            ],
            title: ' برای بارگزاری فایل کلیک کنید یا فایل را اینجا رها کنید',
            description: 'jpg - png - jpeg',
          },
        },
        {
          type: 'ProFormText',
          props: {
            readOnly: true,
            name: 'name',
            label: 'نام',
            value: 'sara',
            rules: [
              {
                required: true,
                message: 'ورود این فیلد الزامی است',
              },
            ],
          },
        },
        {
          type: 'ProFormSelect',
          props: {
            name: 'category',
            label: 'دسته بندی',
            options: [
              { value: 0, label: 'Category 0' },
              { value: 1, label: 'Category 1' },
              { value: 2, label: 'Category 2' },
            ],
            rules: [
              {
                required: true,
                message: 'ورود این فیلد الزامی است',
              },
            ],
          },
        },
        {
          type: 'ProFormSelect',
          props: {
            name: 'tags',
            label: 'تگ',
            options: [
              { value: 0, label: 'Tag 0' },
              { value: 1, label: 'Tag 1' },
              { value: 2, label: 'Tag 2' },
            ],
            mode: 'multiple',
          },
        },
        {
          type: 'ProFormSelect',
          props: {
            name: 'status',
            label: 'وضعیت',
            options: [
              { value: 'available', label: 'Available' },
              { value: 'pending', label: 'Pending' },
              { value: 'sold', label: 'Sold' },
            ],
          },
        },
      ],
    },
  ],
};
