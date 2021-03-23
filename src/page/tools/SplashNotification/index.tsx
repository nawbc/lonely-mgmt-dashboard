import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { Button, message, Popconfirm, Result, Tabs } from "antd";
import {
  CreateGoodsData,
  deleteSplashNotification,
  fetchGoodsList,
  modifySplashNotification,
  SplashNotificationData,
} from "../../../api";
import { addSplashNotification, notificationHistory } from "../../../api";
import { AddNotificationModal } from "./AddNotificationModal";
import React, { useEffect, useRef, useState } from "react";
import { LimitTr } from "../../../components";

const { TabPane } = Tabs;

const columns: ProColumns<SplashNotificationData>[] = [
  {
    title: "id",
    dataIndex: "id",
    render: (_dom, row) => {
      return <LimitTr width={60} content={row.id} />;
    },
  },
  {
    title: "更新标题",
    dataIndex: "title",
  },
  {
    title: "发布时间",
    render: (_dom, row) => {
      return (
        <LimitTr content={new Date(row.releaseTimestamp).toLocaleString()} />
      );
    },
  },

  {
    title: "更新内容",
    dataIndex: "description",
    render: (_dom, row) => {
      return <LimitTr width={120} content={row.description} />;
    },
  },
  {
    title: "通知按钮",
    dataIndex: "buttons",
    render: (_dom, row) => {
      return <LimitTr width={120} content={JSON.stringify(row.buttons)} />;
    },
  },
  {
    dataIndex: "descriptionHtml",
    hideInTable: true,
  },
  {
    title: "强制显示",
    render: (_dom, row) => {
      return (
        <span style={{ color: row.forceDisplay ? "red" : "green" }}>
          {row.forceDisplay ? "是" : "否"}
        </span>
      );
    },
  },
  {
    title: "显示",
    render: (_dom, row) => {
      return (
        <span style={{ color: row.display ? "red" : "green" }}>
          {row.display ? "是" : "否"}
        </span>
      );
    },
  },
  {
    title: "创建者",
    dataIndex: "createBy",
    width: 80,
    render: (_dom, row) => {
      return <LimitTr width={80} content={row.releaseBy?.username} />;
    },
  },
  {
    title: "操作",
    width: "164px",
    key: "option",
    valueType: "option",
    render: (_node, row, _i, action) => {
      return [
        <AddNotificationModal
          title="修改"
          row={row}
          size="small"
          onFinish={async (form) => {
            const { data } = await modifySplashNotification({
              ...form,
            });

            if (data.code > 0) {
              message.success(data.message);
              action.reload();
            }
            return true;
          }}
        />,
        <Popconfirm
          title="你确定修改此应用?"
          onConfirm={async () => {
            const { data } = await deleteSplashNotification({
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
          <Button size="small" danger>
            删除
          </Button>
        </Popconfirm>,
      ];
    },
  },
];

export const SplashNotificationManager = function () {
  const tableRef = useRef<ActionType>();
  const [goods, setGoods] = useState<CreateGoodsData[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    (async function () {
      const { data } = await fetchGoodsList();
      setFetching(false);
      if (data?.data) {
        setGoods(data.data);
      }
    })();
  }, []);

  return (
    <PageContainer
      ghost
      header={{
        title: "初屏通知管理",
      }}
    >
      {!fetching && goods?.length === 0 && <Result subTitle="请先创建商品" />}
      <Tabs defaultActiveKey="1">
        {goods.map((g, i) => {
          return (
            <TabPane tab={g.goodsName} key={String(i)}>
              <ProTable<SplashNotificationData>
                columns={columns}
                search={false}
                request={async (params) => {
                  const { data } = await notificationHistory({
                    packageName: g.packageName,
                    ...params,
                  });

                  return {
                    data: data.data?.list ?? [],
                    success: true,
                    total: data.data?.total,
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
                  <AddNotificationModal
                    title="添加通知"
                    onFinish={async (form) => {
                      const { data } = await addSplashNotification({
                        packageName: g.packageName,
                        ...form,
                      });

                      if (data.code > 0) {
                        message.success(data.message);
                        tableRef.current?.reload();
                      }
                      return true;
                    }}
                  />,
                ]}
                bordered
              />
            </TabPane>
          );
        })}
      </Tabs>
    </PageContainer>
  );
};
