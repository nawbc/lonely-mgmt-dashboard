import React from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Route } from "@ant-design/pro-layout/lib/typings";
import { RouteProps } from "react-router-dom";
import { AppManager } from "./page";

type FlatRoute = Route & RouteProps;

const createFlatRoutes = function (route: Route): FlatRoute[] {
  const target: FlatRoute[] = [];
  const func = function (r: Route): any {
    const { routes, ...rest } = r;
    target.push(rest);
    if (routes) {
      for (const rr of routes) {
        func(rr);
      }
    }
  };
  func(route);
  return target;
};

export const route: Route = {
  path: "/",
  exact: true,
  routes: [
    {
      path: "/user-manager",
      name: "用户管理",
      icon: <UserOutlined />,
      exact: true,
    },
    {
      path: "/app-manager",
      name: "应用管理",
      icon: <AppstoreOutlined />,
      exact: true,
      routes: [
        {
          path: "/app-manager/create-app",
          name: "应用",
          component: AppManager,
        },
      ],
    },
  ],
};

export const flatRoutes = createFlatRoutes(route);
