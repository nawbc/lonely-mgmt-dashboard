import ProForm, { ProFormText } from '@ant-design/pro-form';
import { MailOutlined, SafetyOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import ProCard from '@ant-design/pro-card';
import { login, LoginBody } from '../../api';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../provider';

export type TableListItem = {
  key: number;
  name: string;
  creator: string;
  createdAt: number;
};

const DemoLoginUserInfo = function () {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <br />
      <div>管理员名: demo@demo.com</div>
      <div>密码: demo123456</div>
    </div>
  );
};

export const Login = function () {
  const h = useHistory();
  const ctx = useContext(GlobalContext);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ProCard
        style={{ width: 350 }}
        tabs={{
          type: 'line',
        }}
      >
        <ProCard.TabPane key="login-tab" tab="登录">
          <ProForm
            onFinish={async (values: LoginBody) => {
              const { data } = await login(values);
              if (data.code > 0) {
                localStorage.setItem('t', data.data.auth);
                ctx.setUser(data.data);
                h.replace('/dash');
              }
            }}
            submitter={{
              searchConfig: {
                submitText: '登录',
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
          >
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined />,
              }}
              name="username"
              placeholder="邮箱"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
                {
                  pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                  message: '不合法的用户名!',
                },
              ]}
            />
            <div style={{ height: 10 }} />
            <ProFormText.Password
              fieldProps={{
                size: 'large',
                prefix: <SafetyOutlined />,
              }}
              name="password"
              placeholder="密码"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
            />
            <div style={{ height: 10 }} />
          </ProForm>
          {import.meta.env.MODE === 'demo' ? <DemoLoginUserInfo /> : ''}
        </ProCard.TabPane>
      </ProCard>
    </div>
  );
};
