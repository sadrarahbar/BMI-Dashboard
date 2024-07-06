import { ActionType, ModalForm, ProFormText } from '@ant-design/pro-components';

import { FC, ReactElement } from 'react';

interface ViewModalProps {
  reload?: ActionType['reload'];
  values: API.Pet;
  trigger: ReactElement;
}

const ViewModal: FC<ViewModalProps> = (props) => {
  const { trigger, values } = props;

  return (
    <>
      <ModalForm
        // readonly
        submitter={false}
        title=" جزئیات "
        trigger={trigger}
        width="500px"
        labelCol={{ span: 6 }} // Adjust the span value to allocate more space for labels
      >
        <ProFormText name="id" label={'آیدی '} disabled initialValue={values?.id} />
        <ProFormText name="name" label={'نام '} disabled initialValue={values?.name} />
        <ProFormText name="status" label={'وضعیت '} disabled initialValue={values?.status} />
      </ModalForm>
    </>
  );
};

export default ViewModal;
