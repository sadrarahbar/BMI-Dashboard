import { addPet, updatePet, uploadFile } from '@/services/ant-design-pro/pet';
import { ProFormProps } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Flex, message } from 'antd';
import { JsonComponent } from '../types';
const handleCancel = () => {
  history.push('/content/dynamic/news');
};
const isCreateMode = (): boolean => {
  return history?.location?.pathname === '/content/dynamic/news/create';
};
const categoryOptions = [
  { value: 0, label: 'دسته0' },
  { value: 1, label: 'دسته1' },
  { value: 2, label: 'دسته2' },
];

const tagOptions = [
  { value: 0, label: 'تگ 0' },
  { value: 1, label: 'تگ 1' },
  { value: 2, label: 'تگ 2' },
];

async function handleFileUpload(petId: number, file: File, additionalMetadata?: string) {
  const params = {
    petId: petId,
  };
  const body = {
    additionalMetadata: additionalMetadata,
  };
  try {
    const response = await uploadFile(params, body, file);
    console.log('Upload successful:', response);
    message.success('با موفقیت آپلود شد');
  } catch (error) {
    console.error('Upload failed:', error);
    message.error('عملیات آپلود موفقیت آمیز نبود !');
  }
  history.push('/content/dynamic/news'); 
}

const submitHandler = (formData: API.Pet) => {
  const locationState = history?.location?.state || {};
  const record = {
    ...locationState,
    tags: locationState?.tags?.map((t) => {
      return { value: t?.id, label: t?.name };
    }),
    category: locationState?.category
      ? { value: locationState?.category?.id, label: locationState?.category?.name }
      : undefined,
  };
  const filteredTagOptions = tagOptions
    ?.filter((option) => formData?.tags?.includes(option?.value))
    ?.map((item) => ({ id: +item?.value, name: item?.label }));

  const filteredCategoryOptions = categoryOptions
    ?.filter((cat) => formData?.category === cat?.value)
    ?.map((item) => ({ id: +item?.value, name: item?.label }))[0];

  if (isCreateMode()) {
    addPet({
      category: filteredCategoryOptions,
      name: formData?.name,
      photoUrls: [''], //todo
      tags: filteredTagOptions,
      status: formData?.status,
    }).then((res) => {
      if (res?.id) {
        message.success('با موفقیت اضافه شد');
        formData?.file?.map((f) => handleFileUpload(res?.id, f, `fileName:${res?.name}`));
      } else {
        message.error('عملیات موفقیت آمیز نبود');
      }
    });
  } else {
    const body = {
      id: locationState?.key || 0,
      category: filteredCategoryOptions,
      name: formData?.name,
      tags: filteredTagOptions,
      status: formData?.status,
      photoUrls: record?.photoUrls, //todo
    };
    updatePet(body).then((res) => {
      console.log(res);
      formData?.file?.map((f) => {
        handleFileUpload(res?.id, f, `fileName:${res?.name}`);
      });
    });
  }
};

export const editFormJson: JsonComponent = {
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
