import { AxiosPromise } from 'axios';
import server from '../../../../services/server';

const USER_URI = 'v1/tags';

export function getTags(keyword: string): AxiosPromise {
  return server.get(`/${USER_URI}?keyword=${keyword}`);
}

export function createTag(keyword: string): AxiosPromise {
  return server.post(
    `/${USER_URI}`,
    {
      keyword: keyword,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
