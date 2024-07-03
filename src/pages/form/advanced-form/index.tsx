import type { ProColumnType } from '@ant-design/pro-components';
import {
  EditableProTable,
  PageContainer,
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTimePicker,
} from '@ant-design/pro-components';
import { Button, Card, Col, Flex, Form, Row, message } from 'antd';
import type { FC } from 'react';
import { useState } from 'react';
import { fakeSubmitForm } from './service';
import useStyles from './style.style';
interface TableFormDateType {
  key: string;
  workId?: string;
  name?: string;
  department?: string;
  isNew?: boolean;
  editable?: boolean;
}
type InternalNamePath = (string | number)[];
const fieldLabels = {
  name: 'نام انبار',
  url: 'نام دامنه انبار',
  owner: 'مدیر انبار',
  approver: 'تصویب کننده',
  dateRange: 'از تاریخ تا تاریخ',
  type: 'نوع انبار',
  name2: 'نام وظیفه',
  url2: 'جزئیات ماموریت',
  owner2: 'مجری',
  approver2: 'مسئول',
  dateRange2: 'تاریخ اجرا',
  type2: 'نوع وظیفه',
};

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];
interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}
const AdvancedForm: FC<Record<string, any>> = () => {
  const { styles } = useStyles();
  const [error, setError] = useState<ErrorField[]>([]);

  console.log(error);

  // const getErrorInfo = (errors: ErrorField[]) => {
  //   const errorCount = errors.filter((item) => item.errors.length > 0).length;
  //   if (!errors || errorCount === 0) {
  //     return null;
  //   }
  //   const scrollToField = (fieldKey: string) => {
  //     const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
  //     if (labelNode) {
  //       labelNode.scrollIntoView(true);
  //     }
  //   };
  //   const errorList = errors.map((err) => {
  //     if (!err || err.errors.length === 0) {
  //       return null;
  //     }
  //     const key = err.name[0] as 'name' | 'url' | 'owner' | 'approver' | 'dateRange' | 'type';
  //     return (
  //       <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
  //         <CloseCircleOutlined className={styles.errorIcon} />
  //         <div className={styles.errorMessage}>{err.errors[0]}</div>
  //         <div className={styles.errorField}>{fieldLabels[key]}</div>
  //       </li>
  //     );
  //   });
  //   return (
  //     <span className={styles.errorIcon}>
  //       <Popover
  //         title="اطلاعات تایید فرم"
  //         content={errorList}
  //         overlayClassName={styles.errorPopover}
  //         trigger="click"
  //         getPopupContainer={(trigger: HTMLElement) => {
  //           if (trigger && trigger.parentNode) {
  //             return trigger.parentNode as HTMLElement;
  //           }
  //           return trigger;
  //         }}
  //       >
  //         <CloseCircleOutlined />
  //       </Popover>
  //       {errorCount}
  //     </span>
  //   );
  // };
  const onFinish = async (values: Record<string, any>) => {
    setError([]);
    try {
      await fakeSubmitForm(values);
      message.success('با موفقیت ثبت شد');
    } catch {
      // console.log
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };
  const columns: ProColumnType<TableFormDateType>[] = [
    {
      title: 'نام عضو',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'شماره شغل',
      dataIndex: 'workId',
      key: 'workId',
      width: '20%',
    },
    {
      title: 'بخش',
      dataIndex: 'department',
      key: 'department',
      width: '40%',
    },
    {
      title: 'عملیات',
      key: 'action',
      valueType: 'option',
      render: (_, record: TableFormDateType, index, action) => {
        return [
          <a
            key="eidit"
            onClick={() => {
              action?.startEditable(record.key);
            }}
          >
            ویرایش کنید
          </a>,
        ];
      },
    },
  ];

  return (
    <ProForm
      submitter={{
        // Configure the button text
        searchConfig: {
          resetText: 'reset',
          submitText: 'submit',
        },
        // Configure the properties of the button
        resetButtonProps: {
          style: {
            // Hide the reset button
            display: 'none',
          },
        },
        submitButtonProps: {},

        // Fully customize the entire area
        render: (props) => {
          console.log(props);
          return [
            <Flex gap="middle" className={styles.footer} key="submitBtns">
              <Form.Item>
                <Button key="submit" onClick={() => props.form?.submit?.()} type="primary">
                  ثبت
                </Button>
              </Form.Item>
              <Form.Item>
                <Button key="rest" onClick={() => props.form?.resetFields()} htmlType="reset">
                  انصراف
                </Button>
              </Form.Item>
            </Flex>,
          ];
        },
      }}
      layout="vertical"
      initialValues={{
        members: tableData,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer content="فرم‌های پیشرفته معمولاً در سناریوهایی استفاده می‌شوند که مقادیر زیادی داده در یک زمان وارد و ارسال می‌شوند.">
        <Card title="مدیریت انبار" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={fieldLabels.name}
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'لطفا نام انبار را وارد کنید',
                  },
                ]}
                placeholder="لطفا نام انبار را وارد کنید"
              />
            </Col>
            <Col
              xl={{
                span: 6,
                offset: 2,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <ProFormText
                label={fieldLabels.url}
                name="url"
                rules={[
                  {
                    required: true,
                    message: 'لطفا انتخاب کنید',
                  },
                ]}
                fieldProps={{
                  style: {
                    width: '100%',
                  },
                  addonBefore: 'http://',
                  addonAfter: '.com',
                }}
                placeholder="لطفا وارد کنید"
              />
            </Col>
            <Col
              xl={{
                span: 8,
                offset: 2,
              }}
              lg={{
                span: 10,
              }}
              md={{
                span: 24,
              }}
              sm={24}
            >
              <ProFormSelect
                label={fieldLabels.owner}
                name="owner"
                rules={[
                  {
                    required: true,
                    message: 'لطفاً یک مدیر انتخاب کنید',
                  },
                ]}
                options={[
                  {
                    label: 'فو شیائوکسیائو',
                    value: 'xiao',
                  },
                  {
                    label: 'ژو مائومائو',
                    value: 'mao',
                  },
                ]}
                placeholder="لطفاً یک مدیر انتخاب کنید"
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={fieldLabels.approver}
                name="approver"
                rules={[
                  {
                    required: true,
                    message: 'لطفاً یک تأیید کننده انتخاب کنید',
                  },
                ]}
                options={[
                  {
                    label: 'فو شیائوکسیائو',
                    value: 'xiao',
                  },
                  {
                    label: 'ژو مائومائو',
                    value: 'mao',
                  },
                ]}
                placeholder="لطفاً یک تأیید کننده انتخاب کنید"
              />
            </Col>
            <Col
              xl={{
                span: 6,
                offset: 2,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <ProFormDateRangePicker
                label={fieldLabels.dateRange}
                name="dateRange"
                fieldProps={{
                  style: {
                    width: '100%',
                  },
                }}
                rules={[
                  {
                    required: true,
                    message: 'لطفا تاریخ انتخاب کنید',
                  },
                ]}
              />
            </Col>
            <Col
              xl={{
                span: 8,
                offset: 2,
              }}
              lg={{
                span: 10,
              }}
              md={{
                span: 24,
              }}
              sm={24}
            >
              <ProFormSelect
                label={fieldLabels.type}
                name="type"
                rules={[
                  {
                    required: true,
                    message: 'لطفا نوع انبار را انتخاب کنید',
                  },
                ]}
                options={[
                  {
                    label: 'خصوصی',
                    value: 'private',
                  },
                  {
                    label: 'عمومی',
                    value: 'public',
                  },
                ]}
                placeholder="لطفا نوع انبار را انتخاب کنید"
              />
            </Col>
          </Row>
        </Card>
        <Card title="مدیریت کارها" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormText
                label={fieldLabels.name2}
                name="name2"
                rules={[
                  {
                    required: true,
                    message: 'لطفا وارد کنید',
                  },
                ]}
              />
            </Col>
            <Col
              xl={{
                span: 6,
                offset: 2,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <ProFormText
                label={fieldLabels.url2}
                name="url2"
                rules={[
                  {
                    required: true,
                    message: 'لطفا انتخاب کنید',
                  },
                ]}
              />
            </Col>
            <Col
              xl={{
                span: 8,
                offset: 2,
              }}
              lg={{
                span: 10,
              }}
              md={{
                span: 24,
              }}
              sm={24}
            >
              <ProFormSelect
                label={fieldLabels.owner2}
                name="owner2"
                rules={[
                  {
                    required: true,
                    message: 'لطفاً یک مدیر انتخاب کنید',
                  },
                ]}
                options={[
                  {
                    label: 'xiao',
                    value: 'xiao',
                  },
                  {
                    label: 'mao',
                    value: 'mao',
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <ProFormSelect
                label={fieldLabels.approver2}
                name="approver2"
                rules={[
                  {
                    required: true,
                    message: 'لطفاً یک تأیید کننده انتخاب کنید',
                  },
                ]}
                options={[
                  {
                    label: 'xiao',
                    value: 'xiao',
                  },
                  {
                    label: 'mao',
                    value: 'mao',
                  },
                ]}
                placeholder="لطفاً یک تأیید کننده انتخاب کنید"
              />
            </Col>
            <Col
              xl={{
                span: 6,
                offset: 2,
              }}
              lg={{
                span: 8,
              }}
              md={{
                span: 12,
              }}
              sm={24}
            >
              <ProFormTimePicker
                label={fieldLabels.dateRange2}
                name="dateRange2"
                rules={[
                  {
                    required: true,
                    message: 'لطفا وارد کنید',
                  },
                ]}
                placeholder="زمان یادآوری"
                fieldProps={{
                  style: {
                    width: '100%',
                  },
                }}
              />
            </Col>
            <Col
              xl={{
                span: 8,
                offset: 2,
              }}
              lg={{
                span: 10,
              }}
              md={{
                span: 24,
              }}
              sm={24}
            >
              <ProFormSelect
                label={fieldLabels.type2}
                name="type2"
                rules={[
                  {
                    required: true,
                    message: 'لطفا نوع انبار را انتخاب کنید',
                  },
                ]}
                options={[
                  {
                    label: 'خصوصی',
                    value: 'private',
                  },
                  {
                    label: 'عمومی',
                    value: 'public',
                  },
                ]}
                placeholder="لطفا نوع انبار را انتخاب کنید"
              />
            </Col>
          </Row>
        </Card>
        <Card title="مدیریت اعضا" bordered={false}>
          <ProForm.Item name="members">
            <EditableProTable<TableFormDateType>
              recordCreatorProps={{
                record: () => {
                  return {
                    key: `0${Date.now()}`,
                  };
                },
              }}
              columns={columns}
              rowKey="key"
            />
          </ProForm.Item>
        </Card>
      </PageContainer>
    </ProForm>
  );
};
export default AdvancedForm;
