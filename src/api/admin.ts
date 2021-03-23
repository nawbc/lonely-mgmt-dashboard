import { User } from '../provider/GlobalProvider';
import { req } from './req';

export interface AdminData {
  id: string;
  username: string;
  password: string;
  createTime: string;
  updateTime: string;
}

export interface LoginBody {
  username: string;
  password: string;
}

export const login = async function (body: LoginBody) {
  return req.post('/v1/dashboard/admin/login_pwd', body);
};

export const loginJwt = async function () {
  return req.post('/v1/dashboard/admin/login_jwt');
};

export const modifyAdminInfo = async function (body: Partial<User>) {
  return req.post('/v1/dashboard/admin/modify', body);
};
