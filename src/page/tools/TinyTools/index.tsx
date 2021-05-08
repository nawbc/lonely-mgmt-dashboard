import { PageContainer } from '@ant-design/pro-layout';
import { Button, message, Tabs } from 'antd';
import { bakDb, CreateGoodsData, fetchGoodsList } from '../../../api';
import React, { useEffect, useState } from 'react';
import { QrCodePane } from './QrCodePane';
import { FuncPaneButton } from './FuncPaneButton';

const { TabPane } = Tabs;

export const TinyToolsPage = function () {
  const [goods, setGoods] = useState<CreateGoodsData[]>([]);

  useEffect(() => {
    (async function () {
      const { data } = await fetchGoodsList();
      if (data?.data) {
        setGoods(data.data);
      }
    })();
  }, []);

  return (
    <PageContainer
      ghost
      header={{
        title: '小工具',
      }}
    >
      <Button
        onClick={() => {
          window.open('https://sentry.io/organizations');
        }}
      >
        打开Sentry
      </Button>
      &nbsp;
      <Button
        onClick={async () => {
          const { data } = await bakDb();
          if (data.code > 0) {
            message.success(data.message);
          }
        }}
      >
        备份数据库
      </Button>
      &nbsp;
      <br />
      <br />
      <br />
      <i>需要注册一个同管理员账号相同的的client用户</i>
      <Tabs defaultActiveKey="1">
        {goods.map((g, i) => {
          return (
            <TabPane tab={g.goodsName} key={String(i)}>
              <FuncPaneButton title={'支付二维码'}>
                <QrCodePane packageName={g.packageName} />
              </FuncPaneButton>
              <br />
            </TabPane>
          );
        })}
      </Tabs>
    </PageContainer>
  );
};
