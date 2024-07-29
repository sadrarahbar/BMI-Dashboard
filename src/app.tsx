import { AvatarDropdown, AvatarName, SelectLang } from '@/components';
// import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';
import { CrownFilled, CrownTwoTone, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import './assets/styles/IranSansFont.css';
import DynamicPage from './pages/dynamic/index';
import { errorConfig } from './requestErrorConfig';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';

/*
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

const dynamicRoutes = [
  {
    icon: <CrownTwoTone />,
    path: '/content/dynamic/news',
    name: 'اخبار',
    element: <DynamicPage />,
  },
  {
    path: '/content/dynamic/news/edit/:id',
    access: 'canUpdateNews',
    name: 'به روز رسانی خبر',
    element: <DynamicPage />,
    hideInMenu: true,
  },
  {
    path: '/content/dynamic/news/create',
    access: 'canAddNews',
    name: 'ایجاد خبر جدید',
    element: <DynamicPage />,
    hideInMenu: true,
  },

  {
    icon: <CrownFilled />,
    path: '/content/dynamic/journals',
    name: 'نشریات',
    element: <DynamicPage />,
  },
  {
    path: '/content/dynamic/journals/edit/:id',
    name: 'به روز رسانی نشریه',
    element: <DynamicPage />,
    hideInMenu: true,
  },
  {
    icon: <CrownTwoTone />,
    path: '/content/dynamic/journals/create',
    name: 'ایجاد نشریه جدید',
    element: <DynamicPage />,
    hideInMenu: true,
  },
];

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
        access: 'admin  deleteNews addNews updateNews',
        dynamicRoutes: dynamicRoutes,
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

export function patchClientRoutes({ routes }) {
        // console.log('patchClientRoutes', routes);
      
        const mergedRoutes = routes?.map(mr => {
          if (mr.id === 'ant-design-pro-layout') {
                console.log(mr)
            return {
              ...mr,
              routes: mr.routes.map(r => {
                if (r.path === '/content') {
                  return {
                    ...r,
                    children: r.children.map(ir => {
                      if (ir.path === '/content/dynamic') {
                        return { ...ir, routes: dynamicRoutes, children: dynamicRoutes };
                      }
                      return ir;
                    }),
                  };
                }
                return r;
              }),
              children: mr.children.map(r => {
                if (r.path === '/content') {
                        console.log(r)
                  return {
                    ...r,
                    children: r.children.map(ir => {
                      if (ir.path === '/content/dynamic') {
                        console.log(ir)
                        console.log({ ...ir, routes: dynamicRoutes, children: dynamicRoutes })
                        return { ...ir, routes: dynamicRoutes, children: dynamicRoutes };
                      }
                      
                      return ir;
                    }),
                  };
                }
                return r;
              }),
            };
          }
          return mr;
        });  
      
        console.log("mergedRoutes:",mergedRoutes)
        mergedRoutes.map(r=>routes.unshift(r))
      }
// APIs supported by ProLayout https://procomponents.ant.design/components/layout

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  console.log('Initial State:', initialState);

  //   const { currentUser } = initialState || {};
  //   const dynamicRoutes = currentUser?.dynamicRoutes ? currentUser.dynamicRoutes : [];

  console.log('Dynamic Routes Array:', dynamicRoutes);

  return {
    menu: {
      params: initialState?.currentUser,
      request: async (params, defaultMenuData) => {
        // console.log('Default Menu Data:', defaultMenuData);
        // console.log('Dynamic Routes:', dynamicRoutes);
        const mergedMenuData = defaultMenuData?.map((r) => {
          if (r.path === '/content') {
            return {
              ...r,
              children: r?.children.map((ir) => {
                if (ir.path === '/content/dynamic') {
                  return { ...ir, routes: dynamicRoutes, children: dynamicRoutes };
                }
                return ir;
              }),
              routes: r?.routes.map((ir) => {
                if (ir.path === '/content/dynamic') {
                  return { ...ir, routes: dynamicRoutes, children: dynamicRoutes };
                }
                return ir;
              }),
            };
          }
          return r;
        });
        // console.log('mergedMenuData :', mergedMenuData);
        return mergedMenuData;
      },
    },
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
    //     unAccessible: <div>unAccessible</div>,
    // Add a loading state

    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {
            // Desabled Setting Drawer

            isDev && (
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
            )
          }
        </>
      );
    },

    ...initialState?.settings,
  };
};

/*
 * @name request configuration, you can configure error handling
 * It provides a unified network request and error handling solution based on useRequest of axios and ahooks.
 * @doc https://umijs.org/docs/max/request#Configuration
 */

export const request = {
  ...errorConfig,
};
