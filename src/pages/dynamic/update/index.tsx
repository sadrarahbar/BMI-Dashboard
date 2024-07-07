import { PageContainer, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { history, useModel, useParams } from '@umijs/max';
import { Button, Card, Flex } from 'antd';
import React from 'react';
import useStyles from './style.style';

const Update: React.FC = () => {
  const { styles: classes } = useStyles();
  const { initialState } = useModel('@@initialState');
  const { location } = history;
  const { id } = useParams();

  const isCreateMode = location.pathname === '/content/dynamic/create';
  const record: API.Pet = location.state;
  const handleCancel = () => {
    history.push('/content/dynamic'); // Navigate to a specific URL
  };
  return (
    <PageContainer>
      <Card
        styles={{
          body: {
            backgroundImage:
              initialState?.settings?.navTheme === 'realDark'
                ? 'background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)'
                : 'background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)',
          },
        }}
      >
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
          onFinish={async (values) => console.log(values)}
        >
          <ProFormText
            name="id"
            label={'آیدی '}
            initialValue={record?.id}
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
            initialValue={record?.name}
            rules={[
              {
                required: true,
                message: 'ورود این فیلد الزامی است',
              },
            ]}
          />
          <ProFormSelect
            initialValue={record?.status}
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
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default Update;
