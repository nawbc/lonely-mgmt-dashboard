import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { Button, message, Popconfirm } from "antd";
import React, { useRef } from "react";

import {
  deletePayment,
  modifyPayment,
  PaymentData,
  queryPayments,
} from "../../../api";
import { CreatePaymentModal } from "./CreatePaymentModal";

const columns: ProColumns<PaymentData>[] = [
  {
    title: "订单号",
    dataIndex: "tradeNo",
    width: 150,
    ellipsis: true,
    copyable: true,
  },
  {
    dataIndex: "id",
    hideInTable: true,
    search: false,
  },
  {
    title: "用户名",
    width: 120,
    copyable: true,
    dataIndex: "username",
    renderText(_dom, row) {
      return row.user.username;
    },
  },
  {
    title: "支付宝订单",
    dataIndex: "alipayTradeNo",
    width: 150,
    ellipsis: true,
    copyable: true,
  },
  {
    title: "支付宝id",
    dataIndex: "buyerAlipayId",
    width: 80,
    ellipsis: true,
    copyable: true,
  },
  {
    title: "是否支付",
    dataIndex: "purchased",
    width: 50,
    search: false,
    render: (_dom, row) => {
      return (
        <span style={{ color: row.purchased ? "red" : "green" }}>
          {row.purchased ? "是" : "否"}
        </span>
      );
    },
  },

  {
    title: "支付金额",
    dataIndex: "payAmount",
    width: 80,
    search: false,
  },
  {
    title: "商品",
    width: 80,
    render: (_dom, row) => {
      return <span>{row.goods.goodsName}</span>;
    },
  },
  {
    align: "center",
    title: "操作",
    width: "164px",
    key: "option",
    valueType: "option",
    render: (_node, row, i, action) => {
      return [
        <CreatePaymentModal
          title="修改"
          size="small"
          row={row}
          onFinish={async (form) => {
            const { data } = await modifyPayment(form);
            action.reload();
            if (data.code > 0) {
              message.success(data.message);
              return true;
            } else {
              return false;
            }
          }}
        />,
        <Popconfirm
          title="你确定删除此订单?"
          onConfirm={async (form) => {
            const { data } = await deletePayment({ id: row.id });
            action.reload();
            if (data.code > 0) {
              message.success(data.message);
              return true;
            } else {
              return false;
            }
          }}
          okText="确认"
          cancelText="取消"
        >
          <Button size="small" type="ghost" danger>
            删除
          </Button>
        </Popconfirm>,
        <Popconfirm
          title={""}
          onConfirm={async () => {
            // if (data.code > 0) {
            //   message.success(data.message);
            // }
            action.reload();
          }}
          okText="确认"
          cancelText="取消"
        >
          <Button size="small" type="ghost" danger></Button>
        </Popconfirm>,
      ];
    },
  },
];

export const PaymentsManager = function () {
  const tableRef = useRef<ActionType>();

  return (
    <PageContainer
      ghost
      header={{
        title: "订单管理",
      }}
    >
      <ProTable<PaymentData>
        columns={columns}
        request={async (params) => {
          const { data } = await queryPayments(params);

          return {
            data: data.data?.list ?? [],
            success: true,
            total: data.data?.total,
          };
        }}
        expandable={{
          expandedRowRender: (r) => (
            <pre>
              <code>{JSON.stringify(r, null, "\t")}</code>
            </pre>
          ),
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 20,
        }}
        actionRef={tableRef}
        rowKey="id"
        dateFormatter="string"
        headerTitle="应用列表"
        toolBarRender={() => []}
        bordered
      />
    </PageContainer>
  );
};
