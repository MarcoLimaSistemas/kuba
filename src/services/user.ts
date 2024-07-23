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

export interface IUserEditInfoRequest {
	profilePhoto?: string;
	name: string;
	description: string;
	email: string;
	birthDate: string;
	facebook: string;
	instagram: string;
	spotify: string;
	qobuzz: string;
}

export interface IEditInfoProps {
	userId: number;
	data: IUserEditInfoRequest;
}

class User {
	static async getInfo() {
		const response = await api.get<IGetInfoResponse>('/user/perfil');
		return response.data;
	}

	static editInfo({ userId, data }: IEditInfoProps) {
		return api.put('/user/' + userId, data);
	}
}

export default User;
