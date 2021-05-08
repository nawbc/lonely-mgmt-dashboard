import ProForm, { ProFormCheckbox } from '@ant-design/pro-form';
import { ModalForm } from '@ant-design/pro-form';
import { Button, FormInstance } from 'antd';
import React, { FC, useRef } from 'react';
import { PaymentData } from '../../../api';
import 'react-markdown-editor-lite/lib/index.css';

interface CreatePaymentModalProps {
  onFinish: (val: Partial<PaymentData>) => Promise<any>;
  title: string;
  packageName?: string;
  size?: any;
  row?: PaymentData;
  disable?: string[];
}

export const CreatePaymentModal: FC<CreatePaymentModalProps> = function (
  props
) {
  const { row } = props;

  const formRef = useRef<FormInstance>();

  return (
    <ModalForm<Partial<CreatePaymentModalProps>>
      title={props.title}
      formRef={formRef}
      trigger={
        <Button type="primary" size={props.size}>
          {props.title}
        </Button>
      }
      onVisibleChange={(visible) => {
        if (visible) {
          formRef.current?.resetFields();
        }
      }}
      onFinish={async (form) => {
        return props.onFinish({
          ...form,
          id: row?.id,
        });
      }}
    >
      <ProForm.Group>
        <ProFormCheckbox
          fieldProps={{ defaultChecked: row?.purchased ?? false }}
          name="purchased"
        >
          是否支付
        </ProFormCheckbox>
      </ProForm.Group>
    </ModalForm>
  );
};
