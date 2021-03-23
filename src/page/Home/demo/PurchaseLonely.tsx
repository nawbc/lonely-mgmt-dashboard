import React, { FC, useEffect, useState } from "react";
import { Button, Image, message } from "antd";
import ProCard from "@ant-design/pro-card";
import { getQrCodeWithoutLogin, queryTrade } from "../../../api/demo";

export const PurchaseLonely: FC = function (props) {
  const [qrData, setQrData] = useState<any>({});
  const [github, setGithub] = useState<any>();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async function () {
      const { data } = await getQrCodeWithoutLogin({
        packageName: import.meta.env.VITE_PACKAGENAME as any,
      });

      if (data?.code > 0) {
        setQrData(data.data);
      }
    })();
  }, [refresh]);

  return (
    <div>
      <Button
        style={{ float: "right" }}
        onClick={() => {
          setRefresh(!refresh);
        }}
      >
        刷新
      </Button>
      <div
        style={{
          width: 400,
          height: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        <div>
          <Image src={qrData.qrcode} style={{ width: 200, height: 200 }} />
        </div>
        <h3>{qrData?.bizContent?.total_amount}￥</h3>
        <br />
        <strong>
          订单号:
          {qrData?.details?.alipay_trade_precreate_response?.out_trade_no}
        </strong>
        <br />
        <span style={{ fontSize: 13 }}>
          支付后点击验证 获取github仓库地址 包含前后端两个仓库
        </span>
        <span style={{ fontSize: 13 }}>该支付 不会保存到数据库</span>
        <strong style={{ fontSize: 13, color: "red" }}>
          验证之前 请勿刷新，会导致订单丢失
        </strong>
        <br />
        <Button
          onClick={async () => {
            let { data } = await queryTrade(qrData?.bizContent);

            if (
              data.data?.alipay_trade_query_response?.trade_status ===
              "TRADE_SUCCESS"
            ) {
              message.success(data.message);
              setGithub("https://github.com/sewerganger/lonely-manager");
            }
          }}
        >
          验证支付
        </Button>
      </div>
      <p>
        Github仓库地址:{" "}
        {github ? <a href={github}>{github}</a> : "XXXXXXXXXXXXXXXXXXXXXXXXX"}
      </p>

      <ProCard
        title="查看接口返回详情"
        headerBordered
        collapsible
        defaultCollapsed
        onCollapse={(collapse) => console.log(collapse)}
      >
        <pre>
          <code>{JSON.stringify(qrData, null, "\t")}</code>
        </pre>
      </ProCard>
    </div>
  );
};
