import { AxiosPromise } from 'axios';

import { server } from '.';

const AUTH_URI = 'v1/auth';
const requestOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export function login(data: any): AxiosPromise {
  return server.post(`/${AUTH_URI}/login`, data, requestOptions);
}

export function refreshToken(refreshToken: string) {
  return server({
    url: `${AUTH_URI}/refresh`,
    method: 'GET',
    headers: {
      'Refresh-Token': refreshToken,
    },
  });
}
