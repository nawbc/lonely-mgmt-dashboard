import { AdminData } from ".";
import { req } from "./req";

export interface CreateGoodsData {
  alipayCallback: string;
  alipayDesc: string;
  createBy: AdminData;
  goodsName: string;
  id: string;
  packageName: string;
  price: number;
  discount: number;
  disabled: boolean;
  shareUrl: string;
  alipayGateway: string;
}

export const fetchGoodsList = async function () {
  return req.post("/v1/goods/query");
};

export const createGoods = async function (body: Partial<CreateGoodsData>) {
  return req.post("/v1/goods/create", body);
};

export const modifyGoods = async function (body: Partial<CreateGoodsData>) {
  return req.post("/v1/goods/modify", body);
};

export const deleteGoods = async function (body: Pick<CreateGoodsData, "id">) {
  return req.post("/v1/goods/delete", body);
};

export const disableGoods = async function (
  body: Pick<CreateGoodsData, "id" | "disabled">
) {
  return req.post("/v1/goods/disable", body);
};
