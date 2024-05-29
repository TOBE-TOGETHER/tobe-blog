import axios from 'axios';

import { AuthService } from '.';
import { LOCAL_STORAGE_KEYS } from '../commons';
import { URL } from '../routes';

const server = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ROOT_URL,
  timeout: 60000,
});

server.defaults.headers.post['Content-Type'] = 'application/json';
server.defaults.headers.put['Content-Type'] = 'application/json';

/**
 * Request Interceptor
 * Add Authorization header too all requests besides the refresh token request
 *
 * 请求拦截器
 * 为除了更换访问令牌请求之外的所有请求添加访问令牌
 */
server.interceptors.request.use(
  config => {
    // @ts-expect-error, refresh token request NOT need to be authed
    if (!config.headers['Refresh-Token']) {
      // @ts-expect-error, the header exist
      config.headers.common['Authorization'] = getAccessToken() || '';
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * usage:
 *  - Refresh token and retry when got 401 error from server(excluding refresh token and login api)
 *  - If can't get new access token with the refresh token, redirect uses to login page
 *
 * 返回拦截器
 * 作用：
 *  - 除登录和刷新访问令牌之外请求，如果状态码为401则会进行刷新令牌并重试原请求的操作
 *  - 如果换访问令牌失败则跳转到登录页面
 */
server.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    // 401 means access token invalid or expired,
    // should refresh token and retry for the requests besides fresh token and login
    if (error.response.status === 401 && error.config.url.indexOf('login') === -1) {
      try {
        // try to renewal access token with the refresh token
        const res = await AuthService.refreshToken(getRefreshToken() || '');
        // if successfully get the new accessToken, save in localStorage
        if (res.data) {
          // save new access token back to local storage
          localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, res.data);
          // update the Authorization header value
          error.config.headers.Authorization = res.data;
          return server(error.config);
        }
        // if got nothing, redirect to login page
        else {
          window.location.href = URL.SIGN_OUT;
        }
      } catch (error) {
        console.error('Server error: ' + JSON.stringify(error));
      }
    }
    return Promise.reject(error);
  }
);

function getAccessToken() {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
}

function getRefreshToken() {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
}

export default server;
