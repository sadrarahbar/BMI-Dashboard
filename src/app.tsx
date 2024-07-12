import { AvatarDropdown, AvatarName, SelectLang } from '@/components';
// import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import './assets/styles/IranSansFont.css';
import { errorConfig } from './requestErrorConfig';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */


export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.loginUserResponse['currentUser'];
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.loginUserResponse['currentUser'] | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      // const msg = await loginUser({ password: '1213', username: 'dfg' });
      // return msg;
      const currentUserData = {
        name: 'فائزه مرادی',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_UP3m1iNsigc_SlmkKuMlPcDeEEfe9DewQYSQCLti-DtNK1BOgkyTHvynZh2frtu3Z7s&usqp=CAU',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        signature: 'The sea embraces all rivers, and tolerance is great',
        title: 'Interaction expert',
        group:
          'Ant Financial Services Group - XXXX Business Group - XXXX Platform Department - XXXX Technology Department - UED',
        tags: [
          {
            key: '0',
            label: 'Very thoughtful',
          },
          {
            key: '1',
            label: 'Focus on design',
          },
          {
            key: '2',
            label: 'Spicy~',
          },
          {
            key: '3',
            label: 'Long legs',
          },
          {
            key: '4',
            label: 'Sichuan girl',
          },
          {
            key: '5',
            label: 'The sea embraces all rivers',
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
            label: 'Hangzhou',
            key: '330100',
          },
        },
        address: 'No. 77 Gongzhuan Road, Xihu District',
        phone: '0752-268888888',
      };
      return currentUserData;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // If it is not a login page, execute
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// APIs supported by ProLayout https://procomponents.ant.design/components/layout

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [
      // Disabled Question
      // <Question key="doc" />,

      // Enabled Languages
      <SelectLang key="SelectLang" />,
    ],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // If not logged in, redirect to login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI document</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // Custom 403 page
    // unAccessible: <div>unAccessible</div>,
    // Add a loading state
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          // Desabled Setting Drawer
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request configuration, you can configure error handling
 * It provides a unified network request and error handling solution based on useRequest of axios and ahooks.
 * @doc https://umijs.org/docs/max/request#Configuration
 */
export const request = {
  ...errorConfig,
};
