import { PageContainer } from "@ant-design/pro-layout";
import React, { FC } from "react";
import { Tabs } from "antd";
import { PurchaseLonely } from "./PurchaseLonely";
import { DemoClient } from "./DemoClient";

const { TabPane } = Tabs;

export const DemoHome: FC = function () {
  return (
    <PageContainer
      ghost
      header={{
        title: "Demo -- 支持Lonely",
      }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="购买" key="1">
          <PurchaseLonely />
        </TabPane>
        <TabPane tab="客户端" key="2">
          <DemoClient />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};
