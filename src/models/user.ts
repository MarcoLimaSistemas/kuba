export type UserStatus = 'name' | 'email' | 'created_at' | 'client';
export type Role = 'client';

export interface IUser {
	id: number;
	name: string;
	email: string;
	role: Role;
	created_at: string;
	updated_at: string;
	client: IUserClient;
}

interface IUserClient {
	id: number;
	user_id: number;
	description: string;
	phone: string;
	has_kuba_product: boolean;
	birth_date: string;
	profile_url: null;
	created_at: string;
	updated_at: string;
	socialNetworks: ISocialNetworks[];
}

export interface ISocialNetworks {
	name: string;
	link: string;
}
