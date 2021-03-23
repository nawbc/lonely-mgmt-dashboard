import { ModalForm } from '@ant-design/pro-form';
import { Button } from 'antd';

import React, { FC, useState } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import { getShareLinkClient } from '../../../api/demo';

interface DemoShareModalProps {
  title: string;
}

export const DemoShareModal: FC<DemoShareModalProps> = function (props) {
  const [shareLink, setShareLink] = useState('');

  return (
    <ModalForm<Partial<DemoShareModalProps>>
      title={props.title}
      trigger={<Button type="primary">{props.title}</Button>}
    >
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Button
          onClick={async () => {
            const { data } = await getShareLinkClient();
            if (data.code > 0) {
              setShareLink(
                new URL(
                  data.data.path as string,
                  import.meta.env.VITE_API as string,
                ).href,
              );
            }
          }}
        >
          获取分享链接
        </Button>
        <br />
        <br />
        <a href={shareLink} target="_blank">
          {shareLink}
        </a>
      </div>
    </ModalForm>
  );
};
