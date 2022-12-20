import { AxiosPromise } from 'axios';
import { IResetPassword, ISendEmail, ISendToken, ISignInCredentials } from '../models/auth';

import api from './api';

class Auth {
  static signin(data: ISignInCredentials): AxiosPromise<any> {
    return api.post('/signin', data);
  }
  static sendEmailResetPassword(data: ISendEmail): AxiosPromise<any> {
    return api.post('/auth/forgot-password', data);
  }
  static validateToken(data: ISendToken): AxiosPromise<any> {
    return api.post('/auth/validate-code', data);
  }

  static resetPassword(data: IResetPassword): AxiosPromise<any> {
    return api.post('/auth/reset-password', data);
  }
};

export default Auth;
