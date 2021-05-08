import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { ModalForm } from '@ant-design/pro-form';
import { Button, FormInstance, message, Modal, Tag } from 'antd';
import React, { FC, useRef, useState } from 'react';

import { regexps, useForceUpdate } from '../../../common/utils';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { AddButtonsModal } from './AddButtonsModal';
import { SplashNotificationData } from '../../../api';

interface NotificationModalProps {
  onFinish: (val: Partial<SplashNotificationData>) => Promise<any>;
  title: string;
  packageName?: string;
  size?: any;
  row?: SplashNotificationData;
  disable?: string[];
}

const mdParser = new MarkdownIt();

export const AddNotificationModal: FC<NotificationModalProps> = function (
  props
) {
  const { row } = props;
  const [visible, setVisible] = useState(false);
  const ref = useRef<any>();
  const formRef = useRef<FormInstance>();
  const [buttons, setButtons] = useState<Record<string, any>[]>([]);
  const forceUpdate = useForceUpdate();
  const initValue = {
    html: null,
    text: null,
  };

  const [mdContent, setMdContent] = useState<{
    html: any;
    text: any;
  }>(initValue);

  return (
    <ModalForm
      title={props.title}
      formRef={formRef}
      trigger={
        <Button type="primary" size={props.size}>
          {props.title}
        </Button>
      }
      onVisibleChange={(visible) => {
        if (visible) {
          if (row) {
            setMdContent({
              html: row.descriptionHtml,
              text: row.description,
            });
            setButtons(row.buttons ?? []);
          }
        } else {
          setButtons([]);
          setMdContent(initValue);
        }
        formRef.current?.resetFields();
      }}
      onFinish={async (form) => {
        if (!mdContent.html || !mdContent.text!) {
          message.error('请输入通知内容');
          return;
        }

        return props.onFinish({
          ...form,
          id: row?.id,
          description: mdContent.text!,
          descriptionHtml: mdContent.html!,
          buttons: buttons,
        });
      }}
    >
      <Modal
        title="编辑通知内容"
        centered
        keyboard={false}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width="90%"
      >
        <MdEditor
          onChange={(md) => {
            setMdContent(md);
          }}
          defaultValue={mdContent.text}
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
        />
      </Modal>

      <ProForm.Group>
        <ProFormText
          width="md"
          name="title"
          label="标题"
          initialValue={row?.title}
          rules={[
            {
              required: true,
              message: '请输入',
            },
          ]}
        />

        {!!props.packageName && (
          <ProFormText
            width="md"
            name="packageName"
            label="软件包名"
            initialValue={props.packageName}
            rules={[
              {
                required: true,
                message: '请输入',
              },
              {
                pattern: regexps.androidPackage,
                message: '不合法的软件包名!',
              },
              {
                pattern: regexps.space,
                message: '禁止输入空格',
              },
            ]}
          />
        )}

        <ProFormCheckbox
          initialValue={row?.forceDisplay ?? false}
          name="forceDisplay"
        >
          强制显示
        </ProFormCheckbox>
        <ProFormCheckbox initialValue={row?.display ?? true} name="display">
          显示
        </ProFormCheckbox>
      </ProForm.Group>
      <AddButtonsModal
        title="添加通知按钮"
        onFinish={async (btns) => {
          buttons.push(btns);
          setButtons(buttons);
          forceUpdate();
        }}
      />
      <br />
      <br />

      {buttons.map((val: any, index: number) => {
        return (
          <Tag
            key={String(index)}
            closable
            onClose={() => {
              buttons.splice(index, 1);
              setButtons(buttons);
              forceUpdate();
            }}
          >
            {JSON.stringify(val)}
          </Tag>
        );
      })}
      <br />
      <br />

      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        编辑通知内容
      </Button>
      <div
        ref={ref}
        dangerouslySetInnerHTML={{ __html: mdContent.html! }}
        style={{
          marginTop: 10,
          backgroundColor: '#ebebeb',
          width: '50%',
          height: 200,
          overflow: 'hidden',
        }}
      ></div>
    </ModalForm>
  );
};

AddNotificationModal.defaultProps = {
  disable: [],
};
