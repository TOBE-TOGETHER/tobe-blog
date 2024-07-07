import { AxiosPromise } from 'axios';

import { server } from '.';

const CONTENT_URI = 'v1/contents';
const CONTENT_ADMIN_URI = 'v1/content-admin';

export function getContents(size: number, current: number): AxiosPromise {
  return server.get(`/${CONTENT_URI}?size=${size}&current=${current + 1}`);
}

export function banContent(id: string): AxiosPromise {
  return server.put(`/${CONTENT_ADMIN_URI}/${id}/ban`);
}

export function recommendContent(id: string): AxiosPromise {
  return server.put(`/${CONTENT_ADMIN_URI}/${id}/recommend`);
}
