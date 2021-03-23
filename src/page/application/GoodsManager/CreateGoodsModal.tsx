import ProForm, {
  ModalForm,
  ProFormDigit,
  ProFormText,
} from "@ant-design/pro-form";
import { Button, FormInstance } from "antd";
import React, { FC, useRef } from "react";
import { CreateGoodsData } from "../../../api";
import { regexps } from "../../../common/utils";

interface CreateGoodsModalProps {
  onFinish: (val: CreateGoodsData) => Promise<any>;
  title: string;
  row?: CreateGoodsData;
  size?: any;
}

export const CreateGoodsModal: FC<CreateGoodsModalProps> = function (props) {
  const ref = useRef<FormInstance>();

  return (
    <ModalForm<CreateGoodsData>
      title={props.title}
      trigger={
        <Button type="primary" size={props.size}>
          {props.title}
        </Button>
      }
      onFinish={props.onFinish}
      onVisibleChange={(visible) => {
        if (visible) {
          ref.current?.resetFields();
        }
      }}
      formRef={ref}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="goodsName"
          label="商品名称"
          placeholder="请输入商品名称"
          initialValue={props.row?.goodsName ?? ""}
          rules={[
            {
              required: true,
              message: "请输入",
            },
            {
              pattern: regexps.space,
              message: "禁止输入空格",
            },
          ]}
        />

        <ProFormText
          width="md"
          name="packageName"
          label="软件包名"
          placeholder="请输入软件包名"
          initialValue={props.row?.packageName ?? ""}
          rules={[
            {
              required: true,
              message: "请输入",
            },
            {
              pattern: regexps.androidPackage,
              message: "不合法的软件包名!",
            },
            {
              pattern: regexps.space,
              message: "禁止输入空格",
            },
          ]}
        />
        <ProFormDigit
          width="md"
          name="price"
          label="价格"
          placeholder="请输入价格"
          min={0.01}
          initialValue={props.row?.price ?? ""}
          rules={[
            {
              required: true,
              message: "请输入",
            },
            {
              pattern: regexps.space,
              message: "禁止输入空格",
            },
          ]}
        />
        <ProFormDigit
          width="md"
          name="discount"
          label="折扣价格(选填)"
          min={0}
          initialValue={props.row?.discount ?? 0}
        />
        <ProFormText
          width="md"
          name="alipayCallback"
          label="支付宝回调url"
          initialValue={props.row?.alipayCallback ?? ""}
          placeholder="输入支付宝回调"
          rules={[
            {
              required: true,
              message: "请输入",
            },
            {
              pattern: regexps.uri,
              message: "请输入合法回调",
            },
            {
              pattern: regexps.space,
              message: "禁止输入空格",
            },
          ]}
        />
        <ProFormText
          width="md"
          name="shareUrl"
          label="分享跳转链接"
          initialValue={props.row?.shareUrl ?? ""}
          rules={[
            {
              pattern: regexps.uri,
              message: "请输入合法链接",
            },
            {
              pattern: regexps.space,
              message: "禁止输入空格",
            },
          ]}
        />
        <ProFormText
          width="md"
          name="alipayGateway"
          label="支付宝网关url"
          initialValue={props.row?.alipayGateway ?? ""}
          rules={[
            {
              required: true,
              message: "请输入",
            },
            {
              pattern: regexps.uri,
              message: "请输入合法回调",
            },
            {
              pattern: regexps.space,
              message: "禁止输入空格",
            },
          ]}
        />
        <ProFormText
          width="md"
          name="alipayDesc"
          initialValue={props.row?.alipayDesc ?? ""}
          label="支付描述"
          placeholder="用户跳转支付时的提示"
          rules={[
            {
              required: true,
              message: "请输入",
            },
          ]}
        />
      </ProForm.Group>
    </ModalForm>
  );
};
