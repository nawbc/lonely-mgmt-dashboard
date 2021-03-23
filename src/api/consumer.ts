import { req } from "./req";
import { PaginationBody } from "../common/interface/page";

export interface DeviceData {
  os: string;
  osVersion: string;
  brand: string;
  totalMemory?: number;
  modelName: string;
}

export interface Goods {
  id: string;
  goodsName: string;
  packageName: string;
  price: number;
  discount: number;
  disabled: boolean;
  shareUrl: string;
  alipayCallback: string;
  alipayGateway: string;
  alipayDesc: string;
  accomplishShareTask: boolean;
}
export interface ConsumerData {
  createTime: string;
  device: DeviceData;
  forbidden: boolean;
  id: string;
  password: string;
  updateTime: string;
  username: string;
  followedBilibili: boolean;
  accomplishShareTask: boolean;
  goods: Goods[];
}

export const getAllConsumer = async function (body?: PaginationBody) {
  return req.post("/v1/dashboard/consumer/query", body);
};

export const forbidConsumer = async function (body?: Partial<ConsumerData>) {
  return req.post("/v1/dashboard/consumer/forbid", body);
};

export const deleteConsumer = async function (body?: Partial<ConsumerData>) {
  return req.post("/v1/dashboard/consumer/delete", body);
};
