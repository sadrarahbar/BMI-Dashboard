import { ActionType, ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';

import { FC, ReactElement } from 'react';

interface ViewModalProps {
  reload?: ActionType['reload'];
  values: API.NewsItem;
  trigger: ReactElement;
}

const ViewModal: FC<ViewModalProps> = (props) => {
  const { trigger, values } = props;

  return (
    <>
      <ModalForm
        readonly
        title="مشاهده جزئیات خبر"
        trigger={trigger}
        width="800px"
        labelCol={{ span: 6 }} // Adjust the span value to allocate more space for labels
        // wrapperCol={{ span: 18 }} // Adjust the span value for input fields
      >
        <ProFormText
          name="title"
          label={'عنوان'}
          // labelClassName={}
          initialValue={values?.title}
        />
        <ProFormText name="id" label={'آیدی خبر'} initialValue={values?.id} />
        <ProFormText name="userId" label={'آیدی کاربر'} initialValue={values?.userId} />
        <ProFormTextArea label={'محتوی'} name="body" initialValue={values?.body} />
      </ModalForm>
    </>
  );
};

export default ViewModal;
