// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
// import 'antd/dist/antd.min.css';
// import 'antd/dist/antd.variable.min.css';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  /**
   * @name Enable hash mode
   * @description Include a hash suffix in the build output. Commonly used for incremental releases and to avoid browser cache.
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,

  /**
   * @name Compatibility settings
   * @description IE11 compatibility may not be perfect. Check all dependencies used.
   * @doc https://umijs.org/docs/api/config#targets
   */
  // targets: {
  //   ie: 11,
  // },
  /**
   * @name Routing configuration. Files not included in the routes will not be compiled.
   * @description Only supports path, component, routes, redirect, wrappers, and title configurations.
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @name Theme configuration
   * @description Although called a theme, it is actually just a Less variable setting.
   * @doc Ant Design theme settings https://ant.design/docs/react/customize-theme-cn
   * @doc Umi theme configuration https://umijs.org/docs/api/config#theme
   */
  theme: {
    // If you don't want to dynamically set the theme with configProvide, set this to default
    // Only when set to variable can configProvide be used to dynamically set the primary color
    'root-entry-name': 'variable',
    fontFamily: 'IRANSans',
  },
  /**
   * @name Internationalization configuration for moment.js
   * @description If internationalization is not required, enabling this can reduce the size of the JS bundle.
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  /**
   * @name Proxy configuration
   * @description Allows your local server to proxy to your server, enabling you to access server data.
   * @see Note that the proxy can only be used during local development and will not be used after building.
   * @doc Proxy introduction https://umijs.org/docs/guides/proxy
   * @doc Proxy configuration https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  /**
   * @name Fast hot reload configuration
   * @description A great hot reload component that preserves state during updates.
   */
  fastRefresh: true,
  //============== The following are all max plugin configurations ===============
  /**
   * @name Data flow plugin
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * A global initial data flow that can be used to share data between plugins
   * @description Can be used to store global data, such as user information or global states. The global initial state is created at the very beginning of the Umi project.
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%68
   */
  initialState: {},
  /**
   * @name layout plugin
   * @doc https://umijs.org/docs/max/layout-menu
   */
  title: 'Ant Design Pro',
  layout: {
    locale: true, // Use locale settings
    ...defaultSettings,
  },
  /**
   * @name moment2dayjs plugin
   * @description Replaces moment with dayjs in the project
   * @doc https://umijs.org/docs/max/moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  /**
   * @name internationalization plugin
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    // default zh-CN
    default: 'fa-IR',
    antd: true, // Use Ant Design's internationalization
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },

  /**
   * @name Ant Design plugin
   * @description Built-in babel import plugin
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},
  /**
   * @name Network request configuration
   * @description It provides a unified network request and error handling solution based on axios and ahooks' useRequest.
   * @doc https://umijs.org/docs/max/request
   */
  request: {
    dataField: '',
  },
  /**
   * @name Access control plugin
   * @description An access control plugin based on initialState. initialState must be enabled first.
   * @doc https://umijs.org/docs/max/access
   */
  access: {},
  /**
   * @name Extra scripts in <head>
   * @description Configures extra scripts in the <head> section
   */
  headScripts: [
    // Solve the problem of white screen during the first load
    { src: '/scripts/loading.js', async: true },
  ],
  //================ pro plugin configuration =================
  presets: ['umi-presets-pro'],
  /**
   * @name Configuration of the openAPI plugin
   * @description Generates serve and mock based on the openapi specification, which can reduce a lot of boilerplate code
   * @doc https://pro.ant.design/zh-cn/docs/openapi/
   */
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      // Or use the online version
      schemaPath: 'https://petstore.swagger.io/v2/swagger.json',
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      //       schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  mfsu: {
    strategy: 'normal',
  },
  esbuildMinifyIIFE: true,
  requestRecord: {},
  chainWebpack(config) {
    config.externals({
      // ... other externals
      //   '@ant-design/plots': 'ant-design/plots', // Replace with the appropriate external name if needed
    });
  },
});
