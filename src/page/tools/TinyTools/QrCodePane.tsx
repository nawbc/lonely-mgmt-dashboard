import React, { useEffect, useState } from "react";
import { FC } from "react";
import { fetchQrCode } from "../../../api";
import { Button, Image } from "antd";

export const QrCodePane: FC<any> = function (props) {
  const [data, setData] = useState<any>({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async function () {
      const { data } = await fetchQrCode({ packageName: props.packageName });
      if (data?.code > 0) {
        setData(data.data);
      }
    })();
  }, [refresh]);

  return (
    <div>
      <Button
        onClick={() => {
          setRefresh(!refresh);
        }}
      >
        刷新
      </Button>
      <br />
      <br />
      <Image src={data.qrcode} />
      <br />
      <br />
      <pre>
        <code>{JSON.stringify(data, null, "\t")}</code>
      </pre>
    </div>
  );
};
