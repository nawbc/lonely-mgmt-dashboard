import { PaginationBody } from "./../../common/interface/page";
import { AdminData } from "../admin";
import { CreateGoodsData } from "../goods";
import { req } from "../req";

export interface UpdateRecordData {
  id: string;
  goods: CreateGoodsData;
  releaseTimestamp: Date;
  title: string;
  description: string;
  descriptionHtml: string;
  semver: string;
  releaseBy: AdminData;
  forceUpdate: boolean;
  disabled: boolean;
}

export const updateHistory = async function (
  body: PaginationBody & { packageName: string }
) {
  return req.post("/v1/tools/app_update/history", body);
};

export const addUpdateRecord = async function (
  body: Partial<UpdateRecordData>
) {
  return req.post("/v1/tools/app_update/add", body);
};

export const modifyUpdateRecord = async function (
  body: Partial<UpdateRecordData>
) {
  return req.post("/v1/tools/app_update/modify", body);
};

export const disableUpdate = async function (body: {
  id: string;
  disabled: boolean;
}) {
  return req.post("/v1/tools/app_update/disable", body);
};

export const forceUpdate = async function (body: {
  id: string;
  forceUpdate: boolean;
}) {
  return req.post("/v1/tools/app_update/force_update", body);
};
