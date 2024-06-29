import {
  PageContainer,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import type { FormInstance } from 'antd';
import { Alert, Button, Card, Descriptions, Divider, Result, Statistic } from 'antd';
import React, { useRef, useState } from 'react';
import type { StepDataType } from './data.d';
import useStyles from './style.style';
const StepDescriptions: React.FC<{
  stepData: StepDataType;
  bordered?: boolean;
}> = ({ stepData, bordered }) => {
  const { payAccount, receiverAccount, receiverName, amount } = stepData;
  return (
    <Descriptions column={1} bordered={bordered}>
      <Descriptions.Item label="حساب پرداخت"> {payAccount}</Descriptions.Item>
      <Descriptions.Item label="حساب های دریافتنی"> {receiverAccount}</Descriptions.Item>
      <Descriptions.Item label="نام گیرنده پرداخت"> {receiverName}</Descriptions.Item>
      <Descriptions.Item label="مقدار انتقال">
        <Statistic
          value={amount}
          suffix={
            <span
            // style={{
            //   fontSize: 14,
            // }}
            >
              元
            </span>
          }
          precision={2}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

const StepResult: React.FC<{
  onFinish: () => Promise<void>;
  children?: React.ReactNode;
}> = (props) => {
  const { styles } = useStyles();
  return (
    <Result
      status="success"
      title="عملیات موفقیت آمیز"
      subTitle="انتظار می رود تا دو ساعت دیگر برسد"
      extra={
        <>
          <Button type="primary" onClick={props.onFinish}>
            مبلغ دیگری را انتقال دهید
          </Button>
          <Button>مشاهده صورتحساب</Button>
        </>
      }
      className={styles.result}
    >
      {props.children}
    </Result>
  );
};
const StepForm: React.FC<Record<string, any>> = () => {
  const { styles } = useStyles();
  const [stepData, setStepData] = useState<StepDataType>({
    payAccount: 'ant-design@alipay.com',
    receiverAccount: 'test@example.com',
    receiverName: 'Alex',
    amount: '500',
    receiverMode: 'alipay',
  });
  const [current, setCurrent] = useState(0);
  const formRef = useRef<FormInstance>();

  return (
    <PageContainer content="یک کار طولانی یا ناآشنا را به چند مرحله تقسیم کنید و کاربران را از طریق آن راهنمایی کنید.">
      <Card bordered={false}>
        <StepsForm
          containerStyle={{
            width: '100%',
          }}
          // containerStyle={styles.containerStyle}
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            render: (props, dom) => {
              if (props.step === 2) {
                return null;
              }
              return dom;
            },
          }}
        >
          <StepsForm.StepForm<StepDataType>
            formRef={formRef}
            title="اطلاعات انتقال را پر کنید"
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              return true;
            }}
          >
            <ProFormSelect
              label="حساب پرداخت"
              // width="md"
              name="payAccount"
              rules={[
                {
                  required: true,
                  message: 'لطفا حساب پرداخت را انتخاب کنید',
                },
              ]}
              valueEnum={{
                'ant-design@alipay.com': 'ant-design@alipay.com',
              }}
            />

            {/* <ProForm.Group title="حساب های دریافتنی" >
              <ProFormSelect
                name="receiverMode"
                rules={[
                  {
                    required: true,
                    message: 'لطفا حساب پرداخت را انتخاب کنید',
                  },
                ]}
                valueEnum={{
                  alipay: 'Alipay',
                  bank: 'حساب بانکی',
                }}

              />
              <ProFormText
                name="receiverAccount"
                rules={[
                  {
                    required: true,
                    message: 'لطفا حساب دریافت کننده را وارد کنید',
                  },
                  {
                    type: 'email',
                    message: 'نام حساب کاربری باید در قالب ایمیل باشد',
                  },
                ]}
                placeholder="test@example.com"
              />
            </ProForm.Group> */}
            <ProFormText
              label="نام گیرنده پرداخت"
              // width="md"
              name="receiverName"
              rules={[
                {
                  required: true,
                  message: 'لطفا نام گیرنده پرداخت را وارد کنید',
                },
              ]}
              placeholder="لطفا نام گیرنده پرداخت را وارد کنید"
            />
            <ProFormDigit
              label="مقدار انتقال"
              name="amount"
              // width="md"
              rules={[
                {
                  required: true,
                  message: 'لطفا مبلغ انتقال را وارد کنید',
                },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: 'لطفا یک عدد مبلغ قانونی وارد کنید',
                },
              ]}
              placeholder="لطفا مبلغ را وارد کنید"
              fieldProps={{
                prefix: '￥',
              }}
            />
            <Divider
              style={{
                margin: '24px 0',
              }}
            />
          </StepsForm.StepForm>

          <StepsForm.StepForm title="اطلاعات انتقال را تایید کنید">
            <div className={styles.result}>
              <Alert
                closable
                showIcon
                message="پس از تایید انتقال، وجوه مستقیماً به حساب طرف مقابل واریز می شود و قابل برگشت نیست."
                // style={{
                //   marginBottom: 24,
                // }}
              />
              <StepDescriptions stepData={stepData} bordered />

              <ProFormText.Password
                label="رمز پرداخت"
                // width="md"
                name="password"
                required={false}
                rules={[
                  {
                    required: true,
                    message: 'برای پرداخت به رمز عبور پرداخت نیاز است',
                  },
                ]}
              />
              <Divider
                style={{
                  margin: '24px 0',
                }}
              />
            </div>
          </StepsForm.StepForm>
          <StepsForm.StepForm title="پایان">
            <StepResult
              onFinish={async () => {
                setCurrent(0);
                formRef.current?.resetFields();
              }}
            >
              <StepDescriptions stepData={stepData} />
            </StepResult>
          </StepsForm.StepForm>
        </StepsForm>
        {/* <Divider
          style={{
            margin: '40px 0 24px',
          }}
        /> */}
        {/* <div>
          <h3>نشان دادن</h3>
          <h4>انتقال به حساب Alipay</h4>
          <p>
            در صورت نیاز، می توانید سوالات متداول در مورد محصول را در اینجا قرار دهید. در صورت نیاز،
            می توانید سوالات متداول در مورد محصول را در اینجا قرار دهید. در صورت نیاز، می توانید
            سوالات متداول در مورد محصول را در اینجا قرار دهید.
          </p>
          <h4>انتقال به کارت بانکی</h4>
          <p>
            در صورت نیاز، می توانید سوالات متداول در مورد محصول را در اینجا قرار دهید. در صورت نیاز،
            می توانید سوالات متداول در مورد محصول را در اینجا قرار دهید. در صورت نیاز، می توانید
            سوالات متداول در مورد محصول را در اینجا قرار دهید.
          </p>
        </div> */}
      </Card>
    </PageContainer>
  );
};
export default StepForm;
