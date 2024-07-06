import { ActionType, ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';

import { FC, ReactElement } from 'react';

interface AddModalProps {
  reload?: ActionType['reload'];

  trigger: ReactElement;
}

const AddModal: FC<AddModalProps> = (props) => {
  const { reload, trigger } = props;
  const [messageApi, contextHolder] = message.useMessage();

  //   const { run, loading } = useRequest(()=>{}, {
  //     manual: true,
  //     onSuccess: () => {
  //       messageApi.success('با موفقیت ویرایش شد');
  //       reload?.();
  //     },
  //     onError: () => {
  //       messageApi.error('عملیات ویرایش ناموفق بود ! دوباره سعی کنید .');
  //     },
  //   });

  return (
    <>
      {contextHolder}
      <ModalForm
        title="افزودن "
        trigger={trigger}
        width="600px"
        // modalProps={{ okButtonProps: { loading } }}
        labelCol={{ span: 6 }} // Adjust the span value to allocate more space for labels
        // wrapperCol={{ span: 18 }} // Adjust the span value for input fields
        onFinish={async (value) => {
          //   await run({ data: value as API.RuleListItem });

          return true;
        }}
      >
        <ProFormText
          name="name"
          label={'نام'}
          rules={[
            {
              required: true,
              message: 'ورود این فیلد الزامی است',
            },
          ]}
        />
        <ProFormText
          name="id"
          label={'آیدی '}
          rules={[
            {
              required: true,
              message: 'ورود این فیلد الزامی است',
            },
          ]}
        />
        <ProFormSelect
          name="status"
          label="وضعیت"
          options={[
            {
              value: 'available',
              label: 'Available',
            },
            {
              value: 'pending',
              label: 'Pending',
            },
            {
              value: 'sold',
              label: 'Sold',
            },
          ]}
        />
      </ModalForm>
    </>
  );
};

export default AddModal;
