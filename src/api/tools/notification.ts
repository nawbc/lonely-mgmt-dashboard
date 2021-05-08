import { PaginationBody } from './../../common/interface/page';
import { AdminData } from '../admin';
import { CreateGoodsData } from '../goods';
import { req } from '../req';

export interface SplashNotificationData {
  id: string;
  goods: CreateGoodsData;
  releaseTimestamp: Date;
  title: string;
  description: string;
  descriptionHtml: string;
  releaseBy: AdminData;
  forceDisplay: boolean;
  display: boolean;
  buttons: Record<string, any>[];
  packageName: string;
}

export const notificationHistory = async function (
  body: PaginationBody & { packageName: string }
) {
  return req.post('/v1/tools/splash_notification/history', body);
};

export const addSplashNotification = async function (
  body: Partial<SplashNotificationData>
) {
  return req.post('/v1/tools/splash_notification/add', body);
};

export const modifySplashNotification = async function (
  body: Partial<SplashNotificationData>
) {
  return req.post('/v1/tools/splash_notification/modify', body);
};

export const deleteSplashNotification = async function (
  body: Partial<SplashNotificationData>
) {
  return req.post('/v1/tools/splash_notification/delete', body);
};
