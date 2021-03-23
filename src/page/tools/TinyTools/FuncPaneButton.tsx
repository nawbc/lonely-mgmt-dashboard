import React, { useState } from "react";
import { FC } from "react";
import { Button, Modal } from "antd";

export const FuncPaneButton: FC<any> = function (props) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Modal
        title="编辑更新内容"
        centered
        keyboard={false}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width="80%"
      >
        {props.children}
      </Modal>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        {props.title}
      </Button>
    </div>
  );
};
