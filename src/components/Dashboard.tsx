import React, { FC, useContext } from 'react';
import ProLayout from '@ant-design/pro-layout';
import { Route, Switch, useHistory } from 'react-router-dom';
import { dashboardRoute, flatDashboardRoutes } from '../route';
import { GlobalContext } from '../provider';
import Avatar from 'antd/lib/avatar/avatar';
import { is } from '../common/utils';
import { Button, Dropdown, Menu } from 'antd';

export const UserSettingMenu = () => {
  const h = useHistory();

  return (
    <Menu>
      <Menu.Item>
        <Button
          type="text"
          onClick={() => {
            localStorage.clear();
            location.reload();
          }}
        >
          退出登录
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          type="text"
          onClick={() => {
            h.push('/dash/profile');
          }}
        >
          个人设置
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export const Dashboard: FC = function () {
  const h = useHistory();
  const ctx = useContext(GlobalContext);

  return (
    <ProLayout
      key="ProLayout"
      route={dashboardRoute}
      fixedHeader
      menuItemRender={(item, dom) => {
        return (
          <a
            onClick={() => {
              h.push(item.path || '/');
            }}
          >
            {dom}
          </a>
        );
      }}
      rightContentRender={() => (
        <div>
          <Dropdown overlay={UserSettingMenu()} placement="bottomLeft">
            <Avatar style={{ backgroundColor: '#1890ff' }} shape="circle">
              {is.string(ctx.user.username)
                ? ctx.user.username[0].toUpperCase()
                : ''}
            </Avatar>
          </Dropdown>
        </div>
      )}
      navTheme="light"
      title="Lonely"
      logo={false}
    >
      <Switch>
        {flatDashboardRoutes.map((r, i) => {
          return <Route key={i} {...r} />;
        })}
      </Switch>
    </ProLayout>
  );
};
