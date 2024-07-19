import { AxiosPromise } from 'axios';
import {
	IResetPassword,
	ISendEmail,
	ISendToken,
	ISignInCredentials
} from '../models/auth';

import api from './api';

class User {
	static getInfo(): AxiosPromise<any> {
		return api.get('/user/perfil');
	}
}

export default User;
