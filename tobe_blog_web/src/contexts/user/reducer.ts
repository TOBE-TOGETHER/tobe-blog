import { ELocalStorageKeys } from '../../global/enums.ts';
import { Action, AuthState } from '../types';

const user: any = localStorage.getItem(ELocalStorageKeys.CURRENT_USER) ? JSON.parse(localStorage.getItem(ELocalStorageKeys.CURRENT_USER) ?? '') : '';

export const initialState: AuthState = {
  user: user,
};

export const AuthReducer = (initialState: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        user: null,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
