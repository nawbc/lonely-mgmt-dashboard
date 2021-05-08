import { req } from '../req';

export interface PaymentQrCodeData {
  packageName: string;
  qrcode: string;
  details: Record<string, any>;
}

export const fetchQrCode = async function (body: Partial<PaymentQrCodeData>) {
  return req.post('/v1/pay/qrcode/', body);
};
