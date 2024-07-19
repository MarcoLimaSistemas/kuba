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

	static editInfo(data: any): AxiosPromise<any> {
		return api.put('/user/perfil', data);
	}
}

export default User;
