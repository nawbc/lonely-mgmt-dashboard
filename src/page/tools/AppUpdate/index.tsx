import { PageContainer } from "@ant-design/pro-layout";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { Button, message, Popconfirm, Result, Tabs } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  addUpdateRecord,
  CreateGoodsData,
  fetchGoodsList,
  forceUpdate,
  modifyUpdateRecord,
} from "../../../api";
import { updateHistory, UpdateRecordData } from "../../../api";
import { LimitTr } from "../../../components";
import { AddUpdateModal } from "./AddUpdateModal";

const { TabPane } = Tabs;

const columns: ProColumns<UpdateRecordData>[] = [
  {
    title: "id",
    dataIndex: "id",
    hideInTable: true,
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
    title: "版本",
    dataIndex: "semver",
    width: 80,
  },
  {
    title: "更新内容",
    dataIndex: "description",
    render: (_dom, row) => {
      return <LimitTr width={120} content={row.description} />;
    },
  },
  {
    dataIndex: "descriptionHtml",
    hideInTable: true,
  },
  {
    title: "强制更新",
    render: (_dom, row) => {
      return (
        <span style={{ color: row.forceUpdate ? "red" : "green" }}>
          {row.forceUpdate ? "是" : "否"}
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
        <Popconfirm
          title="你确定修改此应用?"
          onConfirm={async () => {
            const { data } = await forceUpdate({
              id: row.id,
              forceUpdate: !row.forceUpdate ?? false,
            });
            if (data.code > 0) {
              message.success(data.message);
            }
            action.reload();
          }}
          okText="确认"
          cancelText="取消"
        >
          <Button size="small" type={row.forceUpdate ? "default" : "primary"}>
            {row.forceUpdate ? "取消强制" : "强制更新"}
          </Button>
        </Popconfirm>,
        <AddUpdateModal
          title="修改"
          size="small"
          disable={["semver"]}
          row={row}
          onFinish={async (body) => {
            const { data } = await modifyUpdateRecord(body);
            if (data.code > 0) {
              message.success(data.message);
              action.reload();
              return true;
            } else {
              return false;
            }
          }}
        />,
      ];
    },
  },
];

export const AppUpdateManager = function () {
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
        title: "应用更新管理",
      }}
    >
      {!fetching && goods?.length === 0 && <Result subTitle="请先创建商品" />}
      <Tabs defaultActiveKey="1">
        {goods.map((g, i) => {
          return (
            <TabPane tab={g.goodsName} key={String(i)}>
              <ProTable<UpdateRecordData>
                columns={columns}
                search={false}
                request={async (params) => {
                  const { data } = await updateHistory({
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
                  <AddUpdateModal
                    packageName={g.packageName}
                    title="添加更新"
                    onFinish={async (body) => {
                      const { data } = await addUpdateRecord(body);
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
            </TabPane>
          );
        })}
      </Tabs>
    </PageContainer>
  );
};
