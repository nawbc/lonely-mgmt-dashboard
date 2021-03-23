import { req, reqClient } from './req';

export interface RegisterBody {
  username: string;
  password: string;
  packageName: string;
  device: object;
  captcha: string;
}

const prodUrl =
  import.meta.env.MODE === 'demo'
    ? (import.meta.env.VITE_PROD_API as string)
    : null;

export const getQrCodeWithoutLogin = async function (body: {
  packageName: string;
}) {
  return req.post('/v1/pay/qrcode_n', body, {
    baseURL: prodUrl,
  });
};

export const queryTrade = async function (body) {
  return req.post('/v1/pay/query_trade', body, {
    baseURL: prodUrl,
  });
};

export const loginClient = function (body) {
  return req.post('/v1/client/user/login_pwd', body);
};

// export const loginClient = function (body) {
//   return req.post("/v1/client/user/login_pwd", body);
// };

export const registerClient = function (body: RegisterBody) {
  return req.post('/v1/client/user/register', body);
};

export const getShareLinkClient = function () {
  return reqClient.post('/v1/client/user/share_goods_url');
};

export const fetchRegisterCaptchaClient = function (body: {
  username: string;
}) {
  return req.post('/v1/client/user/register_captcha', body);
};
