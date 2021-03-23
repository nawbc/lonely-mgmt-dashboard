import ProForm, { ProFormCheckbox, ProFormText } from "@ant-design/pro-form";
import { ModalForm } from "@ant-design/pro-form";
import { Button, FormInstance, message, Modal } from "antd";
import React, { FC, useRef, useState } from "react";
import { UpdateRecordData } from "../../../api";
import { regexps } from "../../../common/utils";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";

interface CreateUpdateModalProps {
  onFinish: (val: Partial<UpdateRecordData>) => Promise<any>;
  title: string;
  packageName?: string;
  size?: any;
  row?: UpdateRecordData;
  disable?: string[];
}

const mdParser = new MarkdownIt();

export const AddUpdateModal: FC<CreateUpdateModalProps> = function (props) {
  const { row } = props;
  const [visible, setVisible] = useState(false);
  const formRef = useRef<FormInstance>();
  const ref = useRef<any>();
  const initValue = {
    html: null,
    text: null,
  };

  const [mdContent, setMdContent] = useState<{
    html: any;
    text: any;
  }>(initValue);

  return (
    <ModalForm<Partial<UpdateRecordData>>
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
          }
        } else {
          setMdContent(initValue);
        }
        formRef.current?.resetFields();
      }}
      onFinish={async (form) => {
        if (!mdContent.html || !mdContent.text!) {
          message.error("请输入更新内容");
          return;
        }
        if (!visible) {
          await props.onFinish({
            ...form,
            id: row?.id,
            description: mdContent.text!,
            descriptionHtml: mdContent.html!,
          });
        }
        return !visible;
      }}
    >
      <Modal
        title="编辑更新内容"
        centered
        keyboard={false}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={"90%"}
      >
        <MdEditor
          onChange={(md) => {
            setMdContent(md);
          }}
          defaultValue={mdContent.text}
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
        />
      </Modal>
      <ProForm.Group>
        <ProFormText
          allowClear
          width="md"
          name="title"
          label="更新主题"
          initialValue={row?.title}
          rules={[
            {
              required: true,
              message: "请输入",
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
                message: "请输入",
              },
              {
                pattern: regexps.androidPackage,
                message: "不合法的软件包名!",
              },
              {
                pattern: regexps.space,
                message: "禁止输入空格",
              },
            ]}
          />
        )}

        <ProFormText
          width="md"
          name="semver"
          label="版本号"
          disabled={props.disable!.includes("semver")}
          initialValue={row?.semver}
          rules={[
            {
              required: true,
              message: "请输入",
            },
            {
              pattern: regexps.space,
              message: "禁止输入空格",
            },
          ]}
        />

        <ProFormCheckbox
          fieldProps={{ defaultChecked: row?.forceUpdate ?? false }}
          name="forceUpdate"
        >
          强制更新
        </ProFormCheckbox>
      </ProForm.Group>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        更新内容
      </Button>

      <div
        ref={ref}
        dangerouslySetInnerHTML={{ __html: mdContent.html! }}
        style={{
          marginTop: 10,
          backgroundColor: "#ebebeb",
          width: "50%",
          height: 200,
          overflow: "hidden",
        }}
      ></div>
    </ModalForm>
  );
};

AddUpdateModal.defaultProps = {
  disable: [],
};
