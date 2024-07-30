import { addPet, updatePet, uploadFile } from '@/services/ant-design-pro/pet';
import {
  nanoid,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Card, Flex, message } from 'antd';
import React from 'react';
import useStyles from './style.style';

const UpdateJournals: React.FC = () => {
  const { styles: classes } = useStyles();
  const { location } = history;
  //   const { id } = useParams();

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

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'pending', label: 'Pending' },
    { value: 'sold', label: 'Sold' },
  ];
  const isCreateMode = location?.pathname === '/content/dynamic/journals/create';
  const locationState: API.Pet = location?.state;
  const record = {
    ...locationState,
    tags: locationState?.tags?.map((t) => {
      return { value: t?.id, label: t?.name };
    }),
    category: locationState?.tags
      ? { value: locationState?.category?.id, label: locationState?.category?.name }
      : undefined,
  };
//   console.log(locationState);
//   console.log(record);
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
      history.push('/content/dynamic/journals'); // Navigate to a specific URL
    } catch (error) {
      console.error('Upload failed:', error);
      message.error('عملیات آپلود موفقیت آمیز نبود !');
    }
  }
  const handleCancel = () => {
    history.push('/content/dynamic/news');
  };
  const submitHandler = (formData: API.Pet) => {
    const filteredTagOptions = tagOptions
      ?.filter((option) => formData?.tags?.includes(option?.value))
      ?.map((item) => ({ id: +item?.value, name: item?.label }));
    const filteredCategoryOptions = categoryOptions
      ?.filter((cat) => formData?.category === cat?.value)
      ?.map((item) => ({ id: +item?.value, name: item?.label }))[0];
    if (isCreateMode) {
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
          message.success('عملیات موفقیت آمیز نبود');
        }
      });
    } else {
      const body = {
        id: locationState.key || 0,
        category: filteredCategoryOptions,
        name: formData?.name,
        tags: filteredTagOptions,
        status: formData?.status,
        photoUrls: record?.photoUrls, //todo
      };
      updatePet(body).then((res) => {
        console.log(res)
        formData?.file?.map((f) => {
          handleFileUpload(res?.id, f, `fileName:${res?.name}`);
        });
      });
    }
  };

  return (
    <Card>
      <ProForm
        submitter={{
          searchConfig: {
            resetText: 'reset',
            submitText: 'submit',
          },
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
          submitButtonProps: {},
          render: (props) => {
            return [
              <Flex gap="middle" className={classes.footer} key="submitBtns">
                <Button key="submit" onClick={() => props.form?.submit?.()} type="primary">
                  {isCreateMode ? 'ایجاد' : 'ویرایش'}
                </Button>
                <Button key="rest" onClick={handleCancel} htmlType="reset">
                  انصراف
                </Button>
              </Flex>,
            ];
          },
        }}
        onFinish={async (data) => submitHandler(data)}
      >
        <ProFormUploadDragger
          label="بارگزاری عکس"
          name="file"
          rules={[
            {
              required: true,
              message: 'ورود این فیلد الزامی است',
            },
          ]}
          title={
            <p className="ant-upload-text">
              برای بارگزاری فایل کلیک کنید یا فایل را اینجا رها کنید
            </p>
          }
          description={<p className="ant-upload-hint">jpg - png - jpeg</p>}
          //     action={`https://petstore.swagger.io/v2/pet/${values?.key}/uploadImage`}
          //     accept="png"
          initialValue={
            locationState?.photoUrls
              ? [
                  ...locationState?.photoUrls?.map((p) => {
                    return { name: p, uid: nanoid() };
                  }),
                ]
              : []
          }
        />
        <ProFormText
          name="name"
          label={'نام'}
          initialValue={record?.name}
          rules={[
            {
              required: true,
              message: 'ورود این فیلد الزامی است',
            },
          ]}
        />
        <ProFormSelect
          name="category"
          label="دسته"
          options={categoryOptions}
          initialValue={record?.category}
          allowClear
          rules={[
            {
              required: true,
              message: 'ورود این فیلد الزامی است',
            },
          ]}
        />
        <ProFormSelect
          name="tags"
          label="تگ"
          options={tagOptions}
          initialValue={record?.tags}
          mode="multiple"
          allowClear
        />
        <ProFormSelect
          name="status"
          label="وضعیت"
          options={statusOptions}
          allowClear
          initialValue={record?.status}
        />
      </ProForm>
    </Card>
  );
};

export default UpdateJournals;
