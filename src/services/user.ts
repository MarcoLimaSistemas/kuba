import { AxiosPromise } from 'axios';

import api from './api';
import { UserInfoFormData } from '@screens/Client/EditProfile';
import { ISocialNetworks, UserType } from '@models/user';

interface IGetInfoResponse {
	user: {
		id: number;
		name: string;
		email: string;
		user_type: UserType;
		created_at: string;
		updated_at: string;
	};
	userClient: {
		id: number;
		user_id: number;
		description: string | null;
		phone: string | null;
		kuba_product: string | null;
		birth_date: string;
		created_at: string;
		updated_at: string;
	};
	socialNetworks: ISocialNetworks[];
}

interface IUserEditInfoRequest {
	name: string;
	description: string;
	email: string;
	birthDate: string;
	facebook: string;
	instagram: string;
	spotify: string;
	qobuzz: string;
}

class User {
	static getInfo(): AxiosPromise<IGetInfoResponse> {
		return api.get('/user/perfil');
	}

	static editInfo(data: IUserEditInfoRequest): AxiosPromise<any> {
		return api.put('/user/perfil', data);
	}
}

export default User;
