import React from 'react';

import { LOCAL_STORAGE_KEYS } from '../../commons';
import { AuthService } from '../../services';
import { Action } from '../types';

export async function loginUser(dispatch: React.Dispatch<Action>, signInPayload: any) {
  try {
    const response = await AuthService.login(signInPayload);
    const data = response.data;

    if (data.userProfile) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.userProfile });
      localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_USER, JSON.stringify(data.userProfile));
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken);
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTHORITIES, JSON.stringify(data.authorities));
      return data.userProfile;
    }
    return;
  } catch (error) {
    throw error;
  }
}
