import React, { useState } from "react";
import { flatRoutes, route } from "./route";
import {
  PageContainer,
  ProSettings,
  RouteContext,
  RouteContextType,
} from "@ant-design/pro-layout";
import ProLayout, { SettingDrawer } from "@ant-design/pro-layout";
import { Button, Result, Space, Statistic } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { Switch, BrowserRouter, Route, useHistory } from "react-router-dom";
import { AppManager } from "./page";

// console.log(flatRoutes);
const Dashboard = function () {
  const [pathname, setPathname] = useState("/");
  const h = useHistory();
  return (
    <ProLayout
      route={route}
      location={{
        pathname,
      }}
      fixedHeader
      menuItemRender={(item, dom) => (
        <a
          onClick={() => {
            h.replace(item.path || "/");
            // setPathname(item.path || "/");
          }}
        >
          {dom}
        </a>
      )}
      rightContentRender={() => <div></div>}
      layout="top"
      navTheme="light"
      title="爆肝工程师的应用管理"
      logo={false}
    >
      <Switch>
        {flatRoutes.map((r, i) => {
          return <Route key={i} {...r} />;
        })}
      </Switch>
    </ProLayout>
  );
};

const App = function () {
  return (
    <div
      id="pro-layout"
      style={{
        height: "100vh",
      }}
    >
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </div>
  );
};

export default App;
