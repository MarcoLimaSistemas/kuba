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
	data: IUserEditInfoRequest;
}

class User {
	static async getInfo(userId: number | undefined) {
		const response = await api.get<IUser>('/user/' + userId);
		return response.data;
	}

	static editInfo({ userId, data }: IEditInfoProps) {
		console.log('🚀 ~ User ~ editInfo ~ data:', data);
		return api.putForm('/user/' + userId, data);
	}
}

export default User;
