import { Footer } from '@/components';
import { history } from '@umijs/max';
// import { login } from '@/services/ant-design-pro/api';
import { loginUser } from '@/services/ant-design-pro/user';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, Helmet, SelectLang, useIntl, useModel, useNavigate } from '@umijs/max';
import { message, Tabs } from 'antd';
import { createStyles } from 'antd-style';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import Settings from '../../../../config/defaultSettings';

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    },
    lang: {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    },
  };
});

const ActionIcons = () => {
  const { styles } = useStyles();

  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.action} />
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.action} />
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.action} />
    </>
  );
};

const Lang = () => {
  const { styles } = useStyles();

  return (
    <div className={styles.lang} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};
// const LoginMessage: React.FC<{
//   content: string;
// }> = ({ content }) => {
//   return (
//     <Alert
//       style={{
//         marginBottom: 24,
//       }}
//       message={content}
//       type="error"
//       showIcon
//     />
//   );
// };

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.loginUserResponse['currentUser']>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const { styles } = useStyles();
  const intl = useIntl();
  const navigate = useNavigate();
  console.log('initialState:', initialState);
  const handleSubmit = async (values: API.loginUserParams) => {
    try {
      // Login
      const res = await loginUser({ ...values });
      if (res?.message?.includes('logged in')) {
        message.success('با موفقیت وارد شدید !');
        const currentUserData = {
          name: 'Serati Ma',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          userid: '00000001',
          email: 'antdesign@alipay.com',
          signature: 'The sea embraces all rivers, and tolerance is great',
          title: 'Interaction Expert',
          group:
            'Ant Financial Services - XXXX Business Group - XXXX Platform Department - XXXX Technology Department - UED',
          tags: [
            {
              key: '0',
              label: 'very thoughtful',
            },
            {
              key: '1',
              label: 'focus on design',
            },
            {
              key: '2',
              label: 'spicy~',
            },
            {
              key: '3',
              label: 'long legs',
            },
            {
              key: '4',
              label: 'Sichuan girl',
            },
            {
              key: '5',
              label: 'the sea embraces all rivers',
            },
          ],
          notifyCount: 12,
          unreadCount: 11,
          country: 'China',
          access: 'admin',
          geographic: {
            province: {
              label: 'Zhejiang Province',
              key: '330000',
            },
            city: {
              label: 'Hangzhou City',
              key: '330100',
            },
          },
          address: 'No. 77, Gongzhuan Road, Xihu District',
          phone: '0752-268888888',
        };
        flushSync(() => {
          setInitialState({
            ...initialState,
            currentUser: currentUserData,
          });
        });
        // setUserLoginState( { token: '123', access: 'admin' });
        // console.log(initialState)
        history.push('/');
        // navigate('/');
        return;
      }

      // setUserLoginState({ token: '123', access: 'admin' });
      // If failed, set user error message
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: 'Login failed, please try again! ',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  //   const { status, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'menu.login',
            defaultMessage: 'Login page',
          })}
          - {Settings.title}
        </title>
      </Helmet>
      <Lang />
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          // title="پورتال بانک ملی ایران"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            // <FormattedMessage
            //   key="loginWith"
            //   id="pages.login.loginWith"
            //   defaultMessage="Other login methods"
            // />,
            // <ActionIcons key="icons" />,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.loginUserParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              // {
              //   key: 'account',
              //   label: intl.formatMessage({
              //     id: 'pages.login.accountLogin.tab',
              //     defaultMessage: 'Account password login',
              //   }),
              // },
              // {
              //   key: 'mobile',
              //   label: intl.formatMessage({
              //     id: 'pages.login.phoneLogin.tab',
              //     defaultMessage: 'Mobile phone number login',
              //   }),
              // },
            ]}
          />

          {/* {status === 'error' && loginType === 'account' && (
          <LoginMessage
          content={intl.formatMessage({
          id: 'pages.login.accountLogin.errorMessage',
          defaultMessage: 'Wrong account or password (admin/ant.design)',
          })}
          />
          )} */}
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: 'Username: admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="Please enter username!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: 'Password: ant.design',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="Please enter password!"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}

          {/* {status === 'error' && loginType === 'mobile' && <LoginMessage content="Verification code error" />} */}
          {type === 'mobile' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined />,
                }}
                name="mobile"
                placeholder={intl.formatMessage({
                  id: 'pages.login.phoneNumber.placeholder',
                  defaultMessage: 'Mobile phone number',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.required"
                        defaultMessage="Please enter your mobile phone number!"
                      />
                    ),
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: (
                      <FormattedMessage
                        id="pages.login.phoneNumber.invalid"
                        defaultMessage="Mobile phone number format is wrong!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormCaptcha
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                captchaProps={{
                  size: 'large',
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.captcha.placeholder',
                  defaultMessage: 'Please enter the verification code',
                })}
                captchaTextRender={(timing, count) => {
                  if (timing) {
                    return `${count} ${intl.formatMessage({
                      id: 'pages.getCaptchaSecondText',
                      defaultMessage: 'Get verification code',
                    })}`;
                  }
                  return intl.formatMessage({
                    id: 'pages.login.phoneLogin.getVerificationCode',
                    defaultMessage: 'Get verification code',
                  });
                }}
                name="captcha"
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.captcha.required"
                        defaultMessage="Please enter the verification code!"
                      />
                    ),
                  },
                ]}
                onGetCaptcha={async () =>
                  // phone
                  {
                    // const result = await getFakeCaptcha({
                    // phone,
                    // });
                    // if (!result) {
                    // return;
                    // }
                    message.success('Get verification code successfully! Verification code: 1234');
                  }
                }
              />
            </>
          )}
          
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="Automatic login" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="Forgot password" />
            </a>
          </div>
        </LoginForm>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
