import { AxiosPromise } from 'axios';
import server from './server.ts';

const EMAIL_VERIFICATION_URI = 'v1/email-verification';

export function verifyEmail(email: string, token: string): AxiosPromise {
  return server.get(`/${EMAIL_VERIFICATION_URI}/verify`, {
    params: {
      email,
      token,
    },
  });
}

export function resendVerificationEmail(email: string): AxiosPromise {
  return server.post(`/${EMAIL_VERIFICATION_URI}/resend`, null, {
    params: {
      email,
    },
  });
}

export function checkEmailVerificationStatus(email: string): AxiosPromise {
  return server.get(`/${EMAIL_VERIFICATION_URI}/status`, {
    params: {
      email,
    },
  });
} 