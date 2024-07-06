import { ActionType, ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';

// import { addRule } from '@/services/ant-design-pro/api';
import { FC, ReactElement } from 'react';

interface EditModalProps {
  reload?: ActionType['reload'];
  values: API.Pet;
  trigger: ReactElement;
}

const EditModal: FC<EditModalProps> = (props) => {
  const { reload, trigger, values } = props;

  const [messageApi, contextHolder] = message.useMessage();

  //   const { run, loading } = useRequest(addRule, {
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
        title="ویرایش "
        trigger={trigger}
        width="600px"
        // modalProps={{ okButtonProps: { loading } }}
        labelCol={{ span: 6 }} // Adjust the span value to allocate more space for labels
        onFinish={async (value) => {
          //   await run({ data: value as API.RuleListItem });

          return true;
        }}
      >
        <ProFormText
          name="id"
          label={'آیدی '}
          initialValue={values?.id}
          rules={[
            {
              required: true,
              message: 'ورود این فیلد الزامی است',
            },
          ]}
        />
        <ProFormText
          name="name"
          label={'نام'}
          initialValue={values?.name}
          rules={[
            {
              required: true,
              message: 'ورود این فیلد الزامی است',
            },
          ]}
        />
        <ProFormSelect
          initialValue={'available'}
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
          name="status"
          label="وضعیت"
        />
      </ModalForm>
    </>
  );
};

export default EditModal;
