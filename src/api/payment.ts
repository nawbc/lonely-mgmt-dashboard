import { PaginationBody } from '../common/interface/page';
import { ConsumerData } from './consumer';
import { CreateGoodsData } from './goods';
import { req } from './req';

export interface PaymentData {
  id: string;
  goods: CreateGoodsData;
  payTimestamp: Date;
  tradeNo: string;
  alipayTradeNo: string;
  buyerAlipayId: string;
  purchased: boolean;
  payAmount: number;
  json: Record<string, any>;
  user: ConsumerData;
}

export const queryPayments = async function (
  body: Partial<PaymentData> & PaginationBody
) {
  return req.post('/v1/pay/query', body);
};

export const modifyPayment = async function (body: Partial<PaymentData>) {
  return req.post('/v1/pay/modify', body);
};

export const deletePayment = async function (body: Partial<PaymentData>) {
  return req.post('/v1/pay/delete', body);
};
