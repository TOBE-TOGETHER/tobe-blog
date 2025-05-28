import { AxiosPromise } from 'axios';
import server from '../../../services/server';

const CONTENT_ADMIN_URI = 'v1/content-admin';

export function getContents(
  size: number, 
  current: number, 
  keyword?: string, 
  status?: string
): AxiosPromise {
  const params = new URLSearchParams();
  params.append('size', size.toString());
  params.append('current', (current + 1).toString());
  
  if (keyword) {
    params.append('keyword', keyword);
  }
  
  if (status) {
    params.append('status', status);
  }
  
  return server.get(`/v1/contents?${params.toString()}`);
}

export function banContent(id: string): AxiosPromise {
  return server.put(`/${CONTENT_ADMIN_URI}/${id}/ban`);
}

export function unbanContent(id: string): AxiosPromise {
  return server.put(`/${CONTENT_ADMIN_URI}/${id}/unban`);
}

export function recommendContent(id: string): AxiosPromise {
  return server.put(`/${CONTENT_ADMIN_URI}/${id}/recommend`);
}

export function unrecommendContent(id: string): AxiosPromise {
  return server.put(`/${CONTENT_ADMIN_URI}/${id}/unrecommend`);
}
