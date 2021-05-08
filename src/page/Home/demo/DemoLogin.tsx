import React, { FC, useState } from 'react';
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormCaptcha, ProFormText } from '@ant-design/pro-form';
import { MailOutlined, SafetyOutlined, MailTwoTone } from '@ant-design/icons';
import Bowser from 'bowser';
import { message } from 'antd';
import {
  fetchRegisterCaptchaClient,
  loginClient,
  registerClient,
} from '../../../api';
import { regexps } from '../../../common/utils';
const bowser = Bowser.parse(window.navigator.userAgent);

const deviceInfo = {
  os: bowser.os?.name,
  osVersion: bowser.os?.version,
  brand: 'hp',
  modelName: 'envy13',
};

interface DemoLoginProps {
  onLogin(v: boolean): void;
}

export const DemoLogin: FC<DemoLoginProps> = function (props) {
  const [tip, setTip] = useState(deviceInfo);

  return (
    <div
      style={{
        display: 'flex',
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
            onFinish={async (values: any) => {
              const { data } = await loginClient({
                packageName: import.meta.env.VITE_PACKAGENAME,
                ...values,
              });
              if (data.code > 0) {
                message.success(data.message);
                localStorage.setItem('client_auth', data.data.auth);
                props.onLogin(true);
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
                  pattern: regexps.email,
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
        </ProCard.TabPane>
        <ProCard.TabPane key="register-tab" tab="注册">
          <ProForm
            onFinish={async (values: any) => {
              const { data } = await registerClient({
                device: deviceInfo,
                packageName: import.meta.env.VITE_PACKAGENAME as string,
                ...values,
              });

              if (data.code > 0) {
                message.success(data.message);
                setTip(data.data);
              }
            }}
            submitter={{
              searchConfig: {
                submitText: '注册',
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
                  pattern: regexps.email,
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
                {
                  pattern: regexps.space,
                  message: '不能含有空格!',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <MailTwoTone />,
              }}
              captchaProps={{
                size: 'large',
              }}
              name="captcha"
              phoneName="username"
              rules={[
                {
                  required: true,
                  message: '请输入验证码',
                },
                {
                  pattern: regexps.space,
                  message: '不能含有空格!',
                },
              ]}
              placeholder="请输入验证码"
              onGetCaptcha={async (username) => {
                const { data } = await fetchRegisterCaptchaClient({ username });
                if (data?.code > 0) {
                  message.success('验证码发送成功!');
                } else {
                  message.error('验证码发送成功!');
                }
              }}
            />
            <div style={{ height: 10 }} />
          </ProForm>

          <br />
          <span>mock的设备信息 注册需要带上</span>
          <pre>
            <code>{JSON.stringify(tip, null, '\t')}</code>
          </pre>
        </ProCard.TabPane>
      </ProCard>
    </div>
  );
};
