import { AxiosPromise } from 'axios';
import { IUserFeatureDTO } from '../global/types.ts';
import server from '../services/server.ts';

const USER_URI = 'v1/users';

export function getUsers(
  size: number, 
  current: number, 
  keyword?: string, 
  emailVerified?: boolean
): AxiosPromise {
  let url = `/${USER_URI}?size=${size}&current=${current + 1}`;
  
  if (keyword && keyword.trim()) {
    url += `&keyword=${encodeURIComponent(keyword.trim())}`;
  }
  
  if (emailVerified !== undefined) {
    url += `&emailVerified=${emailVerified}`;
  }
  
  return server.get(url);
}

export function getUser(id: number | string): AxiosPromise {
  return server.get(`/${USER_URI}/${id}`);
}

export function deleteUser(id: number | string): AxiosPromise {
  return server.delete(`/${USER_URI}/${id}`);
}

export function createUser(data: { firstName: string | undefined; lastName: string | undefined; email: string | undefined; password: string | undefined }): AxiosPromise {
  return server.post(`/${USER_URI}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function updateUser(data: {
  id: string | undefined;
  email: string | undefined;
  username: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  phoneNum: string | undefined;
  address: string | undefined;
  avatarUrl: string | undefined;
  introduction: string | undefined;
  blog: string | undefined;
  profession: string | undefined;
  backgroundImg: string | undefined;
  photoImg: string | undefined;
  features: IUserFeatureDTO | undefined;
}): AxiosPromise {
  return server.put(`/${USER_URI}/${data.id}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function updateUserRoles(id: number | string, roles: string[]): AxiosPromise {
  return server.put(`/${USER_URI}/${id}/roles`, roles);
}

export function resendVerificationEmail(email: string): AxiosPromise {
  return server.post('/v1/auth/resend-verification', { email });
}
