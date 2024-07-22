/*
 * @name Umi routing configuration
 * @description Only supports configuration of path, component, routes, redirect, wrappers, name, and icon.
 * @param path Path only supports two types of placeholder configuration: the first is the dynamic parameter :id, and the second is the * wildcard, which can only appear at the end of the route string.
 * @param component Configures the React component path to be rendered after location and path match. It can be an absolute path or a relative path. If it is a relative path, it will start searching from src/pages.
 * @param routes Configures child routes. It is usually used when you need to add a layout component to multiple paths.
 * @param redirect Configures route redirection.
 * @param wrappers Configures wrapper components for route components. Through wrapper components, more functions can be combined into the current route component. For example, it can be used for route-level permission verification.
 * @param name Configures the title of the route. By default, it reads the value of menu.xxxx in the internationalization file menu.ts. For example, if name is configured as login, the value of menu.login in menu.ts is read as the title.
 * @param icon Configures the icon of the route. Refer to https://ant.design/components/icon-cn for values. Note that the style suffix and case should be removed. For example, if you want to configure the icon as <StepBackwardOutlined />, the value should be stepBackward or StepBackward. If you want to configure the icon as <UserOutlined />, the value should be user or User.
 * @doc https://umijs.org/docs/guides/routes
 */

// import { useModel } from '@umijs/max';

const Routes = ({}) => {
  if (true) {
    return [
      {
        //     path: '/user',
        path: '/login',
        layout: false,
        name: 'login',
        component: './auth/Login',
        //     routes: [
        //       {
        //       },
        //     ],
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'smile',
        component: './dashboard',
      },
      {
        path: '/content',
        name: 'محتوا',
        icon: 'smile',
        routes: [
          {
            path: '/content',
            redirect: '/content/dynamic',
          },
          {
            icon: 'smile',
            name: 'محتوای داینامیک',
            path: '/content/dynamic',
            routes: [
              {
                path: '/content/dynamic/news',
                name: 'اخبار',
                component: './dynamic/news',
              },
              {
                path: '/content/dynamic/news/edit/:id',
                access: 'canUpdateNews',
                name: 'به روز رسانی خبر',
                component: './dynamic/news/update',
                hideInMenu: true,
              },
              {
                icon: 'smile',
                path: '/content/dynamic/news/create',
                access: 'canAddNews',
                name: 'ایجاد خبر جدید',
                component: './dynamic/news/update',
                hideInMenu: true,
              },

              {
                path: '/content/dynamic/journals',
                name: 'نشریات',
                component: './dynamic/journals',
              },
              {
                path: '/content/dynamic/journals/edit/:id',
                name: 'به روز رسانی نشریه',
                component: './dynamic/journals/update',
                hideInMenu: true,
              },
              {
                icon: 'smile',
                path: '/content/dynamic/journals/create',
                name: 'ایجاد نشریه جدید',
                component: './dynamic/journals/update',
                hideInMenu: true,
              },
            ],
          },
          {
            icon: 'smile',
            name: 'محتوای استاتیک',
            path: '/content/static',
            routes: [
              {
                path: '/content/static',
                name: 'تنظیمات',
                component: './404',
              },
            ],
          },
        ],
      },
      {
        path: '/admin',
        name: 'پروفایل',
        icon: 'crown',
        access: 'canAdmin',
        routes: [
          {
            path: '/admin',
            redirect: '/admin/sub-page',
          },
          {
            path: '/admin/sub-page',
            name: 'پروفایل',
            component: './admin',
          },
        ],
      },
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        path: '*',
        layout: false,
        component: './404',
      },
    ];
  } else {
    return [
      {
        //     path: '/user',
        path: '/login',
        layout: false,
        name: 'login',
        component: './auth/Login',
        //     routes: [
        //       {
        //       },
        //     ],
      },
    ];
  }
};

export default Routes({});
