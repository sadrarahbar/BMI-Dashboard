import { ActionType, ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { message } from 'antd';

import { addRule } from '@/services/ant-design-pro/api';
import { FC, ReactElement } from 'react';

interface EditModalProps {
  reload?: ActionType['reload'];
  values: API.NewsItem;
  trigger: ReactElement;
}

const EditModal: FC<EditModalProps> = (props) => {
  const { reload, trigger, values } = props;

  const [messageApi, contextHolder] = message.useMessage();
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  // const intl = useIntl();

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
        title="ویرایش خبر"
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
          initialValue={values?.title}
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
          initialValue={values?.id}
          rules={[
            {
              required: true,
              message: 'ورود این فیلد الزامی است',
            },
          ]}
        />
        <ProFormText
          name="userId"
          label={'آیدی کابر'}
          initialValue={values?.userId}
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
          initialValue={values?.body}
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

export default EditModal;
