import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import Field from '@ant-design/pro-field';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Descriptions, FormInstance, message } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../../provider';
import { loginJwt, modifyAdminInfo } from '../../api';

export const AdminProfile = function () {
  const ctx = useContext(GlobalContext);
  const [refresh, setRefresh] = useState(false);
  const ref = useRef<FormInstance>();

  useEffect(() => {
    (async function () {
      const { data } = await loginJwt();
      if (data?.code > 0) {
        ctx.setUser(data.data);
      }
    })();
  }, [refresh]);

  return (
    <PageContainer
      ghost
      header={{
        title: '个人设置',
      }}
    >
      <Descriptions column={2}>
        <Descriptions.Item label="用户名">
          <Field
            text={ctx.user.username}
            valueType="text"
            mode="read"
            plain={false}
          />
        </Descriptions.Item>
      </Descriptions>
      <br />
      <ProForm
        formRef={ref}
        submitter={{
          render(props) {
            return [
              <Button
                onClick={() => {
                  props.form?.submit();
                }}
              >
                保存
              </Button>,
            ];
          },
        }}
        onFinish={async (values) => {
          const { data } = await modifyAdminInfo(values);
          if (data?.code > 0) {
            message.success(data.message);
          }
          setRefresh(!refresh);
        }}
      >
        <ProForm.Group>
          <ProFormText
            initialValue={ctx.user?.bilibiliUid}
            name="bilibiliUid"
            label="Bilibili Uid"
            width="lg"
            placeholder="请输入"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormTextArea
            initialValue={ctx.user.bilibiliCookie}
            name="bilibiliCookie"
            label="Bilibili Cookie"
            width="lg"
            placeholder="请输入"
          />
        </ProForm.Group>
      </ProForm>
    </PageContainer>
  );
};
