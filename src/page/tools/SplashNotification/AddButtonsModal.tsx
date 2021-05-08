import ProForm, { ProFormList, ProFormText } from '@ant-design/pro-form';
import { ModalForm } from '@ant-design/pro-form';
import { Button } from 'antd';
import React, { FC } from 'react';
import 'react-markdown-editor-lite/lib/index.css';

interface NotificationModalProps {
  onFinish: (val: Record<string, any>) => Promise<any>;
  title: string;
  packageName?: string;
  size?: any;
  disable?: string[];
}

export const AddButtonsModal: FC<NotificationModalProps> = function (props) {
  return (
    <ModalForm
      title={props.title}
      trigger={
        <Button type="primary" size={props.size}>
          {props.title}
        </Button>
      }
      onVisibleChange={() => {}}
      onFinish={async (form) => {
        if (Object.keys(form.buttons)?.length <= 0) {
          return;
        }

        const result = form.buttons?.map((val: any) => {
          return { [val.prop]: val.value };
        }) as Record<string, any>[];

        await props.onFinish(Object.assign({}, ...result));
        return true;
      }}
    >
      <ProFormList
        name="buttons"
        initialValue={[]}
        creatorButtonProps={{
          position: 'bottom',
        }}
      >
        <ProForm.Group>
          <ProFormText name="prop" label="属性" />
          <ProFormText name="value" label="值" />
        </ProForm.Group>
      </ProFormList>
    </ModalForm>
  );
};
