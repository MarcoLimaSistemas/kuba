import api from './api';
import { IUser } from '@models/user';

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
	static async getInfo(userId: number) {
		const response = await api.get<IUser>('/user/' + userId);
		return response.data;
	}

	static editInfo({ userId, data }: IEditInfoProps) {
		return api.put('/user/' + userId, data);
	}
}

export default User;
