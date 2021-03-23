import { Tooltip } from "antd";
import React, { FC } from "react";

interface LimitTrProps {
  width?: number;
  content: string;
}

export const LimitTr: FC<LimitTrProps> = function (props) {
  const { width, content } = props;
  return (
    <Tooltip title={content}>
      <div
        style={{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width: width,
          overflow: "hidden",
        }}
      >
        {content}
      </div>
    </Tooltip>
  );
};
