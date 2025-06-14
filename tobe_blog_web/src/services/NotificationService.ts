import { AxiosPromise } from 'axios';
import { INotificationPageDTO } from '../global/types';
import server from './server';

const NOTIFICATION_URI = 'v1/notifications';

export function getUserNotifications(
  page: number,
  size: number,
  isRead?: boolean
): AxiosPromise<INotificationPageDTO> {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('size', size.toString());
  if (isRead !== undefined) {
    params.append('isRead', isRead.toString());
  }
  
  return server.get(`/${NOTIFICATION_URI}?${params.toString()}`);
}

export function getUnreadCount(): AxiosPromise<number> {
  return server.get(`/${NOTIFICATION_URI}/unread-count`);
}

export function markAsRead(notificationId: number): AxiosPromise<void> {
  return server.put(`/${NOTIFICATION_URI}/${notificationId}/read`);
}

export function markAllAsRead(): AxiosPromise<number> {
  return server.put(`/${NOTIFICATION_URI}/mark-all-read`);
} 