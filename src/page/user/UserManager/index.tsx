import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import React, { useRef } from 'react';
import {
  ConsumerData,
  deleteConsumer,
  forbidConsumer,
  getAllConsumer,
} from '../../../api';

const columns: ProColumns<ConsumerData>[] = [
  {
    title: '用户id',
    dataIndex: 'id',
    width: 100,
    ellipsis: true,
    copyable: true,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 100,
    copyable: true,
    ellipsis: true,
  },
  {
    title: '是否禁用',
    dataIndex: 'forbidden',
    width: 80,
    search: false,
    render: (_dom, row) => {
      return (
        <span style={{ color: row.forbidden ? 'red' : 'green' }}>
          {row.forbidden ? '是' : '否'}
        </span>
      );
    },
  },
  {
    title: '分享任务',
    dataIndex: 'shareTask',
    width: 160,
    search: false,
    render: (_dom, row) => {
      return row?.goods
        ? row.goods.map((ele, index) => {
            return (
              <div key={String(index)}>
                <span>{ele.packageName}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span>{ele.accomplishShareTask ? '是' : '否'}</span>
              </div>
            );
          })
        : null;
    },
  },
  {
    title: '是否关注bilibili',
    dataIndex: 'forbidden',
    width: 80,
    search: false,
    render: (_dom, row) => {
      return (
        <span style={{ color: row.followedBilibili ? 'red' : 'green' }}>
          {row.followedBilibili ? '是' : '否'}
        </span>
      );
    },
  },
  {
    align: 'center',
    title: '操作',
    width: '164px',
    key: 'option',
    valueType: 'option',
    render: (_node, row, i, action) => {
      return [
        <Popconfirm
          key="1"
          title="你确定删除此用户?"
          onConfirm={async () => {
            const { data } = await deleteConsumer({
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
        <Popconfirm
          key="2"
          title={row.forbidden ? '你确定解禁此用户?' : '你确定禁用此用户?'}
          onConfirm={async () => {
            const { data } = await forbidConsumer({
              forbidden: !row.forbidden,
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
            {row.forbidden ? '解禁' : '禁用'}
          </Button>
        </Popconfirm>,
      ];
    },
  },
];

export const UserManager = function () {
  const tableRef = useRef<ActionType>();

  return (
    <PageContainer
      ghost
      header={{
        title: '用户设置',
      }}
    >
      <ProTable<ConsumerData>
        columns={columns}
        request={async (params) => {
          const { data } = await getAllConsumer(params);

          return {
            data: data.code > 0 ? data.data?.list : [],
            success: true,
            total: data.data?.total ?? 0,
          };
        }}
        expandable={{
          expandedRowRender: (r) => (
            <pre>
              <code>{JSON.stringify(r, null, '\t')}</code>
            </pre>
          ),
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 20,
        }}
        actionRef={tableRef}
        rowKey={(r) => r.id}
        dateFormatter="string"
        headerTitle="应用列表"
        bordered
      />
    </PageContainer>
  );
};
