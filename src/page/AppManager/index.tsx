import { PageContainer } from "@ant-design/pro-layout";
import { Button } from "antd";
import React, { useCallback } from "react";

export const AppManager = function () {
  const createApp = useCallback(() => {}, []);

  return (
    <PageContainer
      ghost
      header={{
        title: "应用设置",
        extra: [
          <Button key="1" type="primary">
            创建应用
          </Button>,
        ],
      }}
    ></PageContainer>
  );
};
