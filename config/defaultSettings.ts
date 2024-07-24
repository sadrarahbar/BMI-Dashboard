import { ProLayoutProps } from '@ant-design/pro-components';

/* @name */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // Dawn Blue
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'پرتال بانک ملی ایران',
  pwa: true,
  logo: '/logo.svg',
  iconfontUrl: '',
  splitMenus: true,
  // siderMenuType: 'group',
  token: {
        // bgLayout:"#ccc",
        // colorTextAppListIcon:"red",
        // colorTextAppListIconHover:"green",
        // colorBgAppListIconHover:"yellow"
    // See ts declaration, demo in the document, modify the style through token
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};

export default Settings;
