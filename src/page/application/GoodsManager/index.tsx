import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { Button, message, Popconfirm } from "antd";
import React, { useRef } from "react";
import {
  createGoods,
  CreateGoodsData,
  deleteGoods,
  disableGoods,
  fetchGoodsList,
  modifyGoods,
} from "../../../api";
import { CreateGoodsModal } from "./CreateGoodsModal";

const columns: ProColumns<CreateGoodsData>[] = [
  {
    title: "应用名称",
    dataIndex: "goodsName",
    copyable: true,
    width: 100,
    ellipsis: true,
    fixed: "left",
  },

  {
    title: "包名",
    dataIndex: "packageName",
    copyable: true,
    width: 100,
    ellipsis: true,
  },

  {
    title: "价格",
    dataIndex: "price",
    width: 80,
  },
  {
    title: "折扣价格",
    dataIndex: "discount",
    width: 80,
  },
  {
    title: "创建者",
    width: 120,
    ellipsis: true,
    dataIndex: "createBy",
    render: (_dom, row) => {
      return <span>{row.createBy.username}</span>;
    },
  },
  {
    title: "支付宝回调url",
    dataIndex: "alipayCallback",
    width: 150,
    ellipsis: true,
    copyable: true,
  },
  {
    title: "支付宝网关url",
    dataIndex: "alipayGateway",
    width: 150,
    ellipsis: true,
    copyable: true,
  },
  {
    title: "分享跳转url",
    dataIndex: "shareUrl",
    width: 150,
    ellipsis: true,
    copyable: true,
  },
  {
    title: "禁用",
    dataIndex: "disabled",
    copyable: true,
    width: 50,
    render: (_dom, row) => {
      return (
        <span style={{ color: row.disabled ? "red" : "green" }}>
          {row.disabled ? "是" : "否"}
        </span>
      );
    },
  },
  {
    title: "支付描述",
    dataIndex: "alipayDesc",
    valueType: "select",
    width: 120,
    ellipsis: true,
  },
  {
    title: "操作",
    width: 200,
    key: "option",
    valueType: "option",
    fixed: "right",
    render: (_node, row, _i, action) => {
      return [
        <CreateGoodsModal
          row={row}
          title={"修改"}
          size="small"
          onFinish={async (form) => {
            if (form.price < form.discount) {
              message.error("折扣价大于价格");
              return;
            }

            const { data } = await modifyGoods(
              Object.assign({}, { id: row.id }, form)
            );
            if (data.code > 0) {
              message.success(data.message);
              action.reload();
              return true;
            } else {
              return false;
            }
          }}
        />,
        <Popconfirm
          title="你确定修改此应用?"
          onConfirm={async () => {
            const { data } = await disableGoods({
              id: row.id,
              disabled: !row.disabled ?? false,
            });
            if (data.code > 0) {
              message.success(data.message);
            }
            action.reload();
          }}
          okText="确认"
          cancelText="取消"
        >
          <Button size="small" type="ghost" danger>
            {row.disabled ? "解禁" : "禁用"}
          </Button>
        </Popconfirm>,
        <Popconfirm
          title="你确定删除此应用?"
          onConfirm={async () => {
            const { data } = await deleteGoods({
              id: row.id,
            });
            if (data.code > 0) {
              message.success(data.message);
            }
            action.reload();
          }}
          okText="确认"
          cancelText="取消"
        >
          <Button size="small" type="ghost" danger>
            删除
          </Button>
        </Popconfirm>,
      ];
    },
  },
];

export const AppManager = function () {
  const tableRef = useRef<ActionType>();

  return (
    <PageContainer
      ghost
      header={{
        title: "应用设置",
      }}
    >
      <ProTable<CreateGoodsData>
        columns={columns}
        search={false}
        scroll={{ x: 1500 }}
        request={async () => {
          const { data } = await fetchGoodsList();
          return {
            data: data.data ?? [],
            success: true,
          };
        }}
        pagination={{
          showQuickJumper: true,
        }}
        actionRef={tableRef}
        rowKey={(r) => r.id}
        dateFormatter="string"
        headerTitle="应用列表"
        toolBarRender={() => [
          <CreateGoodsModal
            title="新建应用"
            onFinish={async (form) => {
              if (form.price < form.discount) {
                message.error("折扣价大于价格");
                return;
              }
              const { data } = await createGoods(form);
              if (data.code > 0) {
                message.success(data.message);
                tableRef.current?.reload();
                return true;
              } else {
                return false;
              }
            }}
          />,
        ]}
        bordered
      />
    </PageContainer>
  );
};
