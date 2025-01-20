import React from 'react';

import { ELocalStorageKeys } from '../../global/enums.ts';
import * as AuthService from '../../services/AuthService.ts';
import { Action } from '../types';

export async function loginUser(dispatch: React.Dispatch<Action>, signInPayload: any) {
  const response = await AuthService.login(signInPayload);
  const data = response.data;

  if (data.userProfile) {
    dispatch({ type: 'LOGIN_SUCCESS', payload: data.userProfile });
    localStorage.setItem(ELocalStorageKeys.CURRENT_USER, JSON.stringify(data.userProfile));
    localStorage.setItem(ELocalStorageKeys.ACCESS_TOKEN, data.accessToken);
    localStorage.setItem(ELocalStorageKeys.REFRESH_TOKEN, data.refreshToken);
    localStorage.setItem(ELocalStorageKeys.AUTHORITIES, JSON.stringify(data.authorities));
    return data.userProfile;
  }
}
