import api from './api';
import { IUser } from '@models/user';

export interface IUserEditInfoRequest {
	profilePhoto?: string;
	name: string;
	description: string;
	birthDate: string;
	facebook: string;
	instagram: string;
	spotify: string;
	qobuzz: string;
}

export interface IEditInfoProps {
	userId: number;
	data: FormData;
}

class User {
	static async getInfo(userId: number | undefined) {
		const response = await api.get<IUser>('/user/' + userId);
		return response.data;
	}

	static editInfo({ userId, data }: IEditInfoProps) {
		return api.put('/user/' + userId, data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	}
}

export default User;
