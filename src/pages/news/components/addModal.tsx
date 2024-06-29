import { ActionType, ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { message } from 'antd';

import { addRule } from '@/services/ant-design-pro/api';
import { FC, ReactElement } from 'react';

interface AddModalProps {
  reload?: ActionType['reload'];

  trigger: ReactElement;
}

const AddModal: FC<AddModalProps> = (props) => {
  const { reload, trigger } = props;
  const [messageApi, contextHolder] = message.useMessage();

  const { run, loading } = useRequest(addRule, {
    manual: true,
    onSuccess: () => {
      messageApi.success('با موفقیت ویرایش شد');
      reload?.();
    },
    onError: () => {
      messageApi.error('عملیات ویرایش ناموفق بود ! دوباره سعی کنید .');
    },
  });

  return (
    <>
      {contextHolder}
      <ModalForm
        title="افزودن خبر"
        trigger={trigger}
        width="800px"
        modalProps={{ okButtonProps: { loading } }}
        labelCol={{ span: 6 }} // Adjust the span value to allocate more space for labels
        // wrapperCol={{ span: 18 }} // Adjust the span value for input fields
        onFinish={async (value) => {
          await run({ data: value as API.RuleListItem });

          return true;
        }}
      >
        <ProFormText
          name="title"
          label={'عنوان'}
          // initialValue={values?.title}
          rules={[
            {
              required: true,
              message: 'ورود این فیلد الزامی است',
            },
          ]}
        />
        <ProFormText
          name="id"
          label={'آیدی خبر'}
          // initialValue={values?.category}
          rules={[
            {
              required: true,
              message: 'ورود این فیلد الزامی است',
            },
          ]}
        />
        <ProFormText
          name="userId"
          label={'آیدی کاربر'}
          // initialValue={values?.category}
          rules={[
            {
              required: true,
              message: 'ورود این فیلد الزامی است',
            },
          ]}
        />
        <ProFormTextArea
          label={'محتوی'}
          name="body"
          // initialValue={values?.content}
          rules={[
            {
              required: true,
              message: 'ورود این فیلد الزامی است',
            },
          ]}
        />
      </ModalForm>
    </>
  );
};

export default AddModal;
