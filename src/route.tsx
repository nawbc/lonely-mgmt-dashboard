import React from 'react';
import {
  AppstoreOutlined,
  UserOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { Route } from '@ant-design/pro-layout/lib/typings';
import { RouteProps } from 'react-router-dom';
import {
  AppManager,
  AppUpdateManager,
  PaymentsManager,
  UserManager,
  AdminProfile,
} from './page';

import { Login } from './page/Login';
import { Dashboard } from './components/Dashboard';
import { NotFoundPage } from './components/404';
import { SplashNotificationManager } from './page/tools/SplashNotification';
import { TinyToolsPage } from './page/tools/TinyTools';

type FlatRoute = Route & RouteProps;

const createFlatDashboardRoutes = function (route: Route): FlatRoute[] {
  const target: FlatRoute[] = [];
  const func = function (r: Route): any {
    const { routes, ...rest } = r;

    if (r.path) {
      target.push(rest);
    }
    if (routes) {
      for (const rr of routes) {
        func(rr);
      }
    }
  };
  func(route);
  target.push({
    path: '*',
    component: NotFoundPage,
  });
  return target;
};

export const dashboardRoute: Route = {
  routes: [
    {
      path: '/dash/profile',
      component: AdminProfile,
      exact: true,
    },
    {
      name: '用户',
      icon: <UserOutlined />,
      routes: [
        {
          path: '/dash/user/user-manager',
          name: '用户管理',
          component: UserManager,
          exact: true,
        },
        {
          path: '/dash/user/payment-manager',
          name: '订单管理',
          // component: AppManager,
          component: PaymentsManager,
          exact: true,
        },
      ],
    },
    {
      name: '应用',
      icon: <AppstoreOutlined />,
      routes: [
        {
          path: '/dash/app/app-manager',
          name: '应用管理',
          component: AppManager,
          exact: true,
        },
      ],
    },
    {
      name: '工具',
      icon: <ToolOutlined />,
      routes: [
        {
          path: '/dash/tool/app-update',
          name: '更新管理',
          component: AppUpdateManager,
          exact: true,
        },
        {
          path: '/dash/tool/entry-notification',
          name: '初屏通知',
          component: SplashNotificationManager,
          exact: true,
        },
        {
          path: '/dash/tool/tiny',
          name: '小工具',
          component: TinyToolsPage,
          exact: true,
        },
      ],
    },
  ],
};

export const route: RouteProps[] = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/dash',
    component: Dashboard,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

export const flatDashboardRoutes = createFlatDashboardRoutes(dashboardRoute);
