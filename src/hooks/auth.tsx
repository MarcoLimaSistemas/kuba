import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
	createContext,
	ReactElement,
	ReactNode,
	useContext,
	useEffect,
	useState
} from 'react';
import Toast from 'react-native-toast-message';
import {
	IResetPassword,
	ISendEmail,
	ISendToken,
	ISignInCredentials
} from '../models/auth';
import { IUser } from '../models/user';
import api from '../services/api';
import Auth from '../services/auth';
import { STORAGE_KEY } from '@config/storage';
import User from '@services/user';

interface AuthContextData {
	user: IUser;
	token: string | null;
	emailForgetPassword: string;

	signIn: (data: ISignInCredentials) => Promise<void>;
	sendEmailResetPassword: (data: ISendEmail) => Promise<void>;
	validateToken: (data: ISendToken) => Promise<void>;
	updatePassword: (data: IResetPassword) => Promise<void>;
	logout(): void;
}

export interface ISignInData {
	id: number;
	name: string;
	token: {
		type: string;
		token: string;
		expires_at: string;
	};
}

interface AuthProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProps): ReactElement {
	const [user, setUser] = useState<IUser>({} as IUser);
	const [token, setToken] = useState('');

	const [emailForgetPassword, setEmailForgetPassword] = useState('');

	const showToast = () => {
		Toast.show({
			type: 'success',
			text1: 'Sucesso',
			text2: 'Login realizado'
		});
	};

	useEffect(() => {
		async function loadStorageData(): Promise<void> {
			try {
				const storage = await AsyncStorage.getItem(STORAGE_KEY);

				if (storage !== null) {
					const storageData: ISignInData = JSON.parse(storage);

					api.defaults.headers.common.Authorization = `Bearer ${storageData.token.token}`;

					setToken(storageData.token.token);
				}
			} catch (error: any) {
				Toast.show({
					type: 'error',
					text1: 'Error',
					text2: 'Logout realizado!'
				});

				logout();
			}
		}

		loadStorageData();
	}, []);

	async function signIn(data: ISignInCredentials) {
		try {
			const response = await Auth.signIn(data);

			await AsyncStorage.setItem(
				STORAGE_KEY,
				JSON.stringify(response.data)
			);

			api.defaults.headers.common['Authorization'] =
				`Bearer ${response.data.token.token}`;

			setToken(response.data.token.token);
<<<<<<< HEAD
			setUser(response.data);
=======

			//get user info
			const userInfoResponse = await User.getInfo(response.data.id);

			setUser({
				id: userInfoResponse.id,
				name: userInfoResponse.name,
				email: userInfoResponse.email,
				role: userInfoResponse.role,
				created_at: userInfoResponse.created_at,
				updated_at: userInfoResponse.updated_at,
				client: {
					id: userInfoResponse.client.id,
					user_id: userInfoResponse.client.user_id,
					description: userInfoResponse.client.description,
					phone: userInfoResponse.client.phone,
					has_kuba_product: userInfoResponse.client.has_kuba_product,
					birth_date: userInfoResponse.client.birth_date,
					profile_url: userInfoResponse.client.profile_url,
					created_at: userInfoResponse.client.created_at,
					updated_at: userInfoResponse.client.updated_at,
					socialNetworks: userInfoResponse.client.socialNetworks
				}
			});
>>>>>>> 6444ad45f7823d9b6797b55695317b97ef198eb8

			showToast();
		} catch (err: any) {
			throw new Error(err?.response.data.message);
		}
	}

	async function sendEmailResetPassword(data: ISendEmail) {
		try {
			const response = await Auth.sendEmailResetPassword(data);
			setEmailForgetPassword(response?.data?.user?.email);
			Toast.show({
				type: 'success',
				text1: response.data.message
			});
		} catch (error: any) {
			console.log(error?.response.data);
			Toast.show({
				type: 'error',
				text1: error.response.data.message
			});
			throw new Error(error?.response.data);
		}
	}

	async function validateToken(data: ISendToken) {
		try {
			const response = await Auth.validateToken(data);
			Toast.show({
				type: 'success',
				text1: response.data.message
			});
		} catch (error: any) {
			console.log(error?.response.data);
			Toast.show({
				type: 'error',
				text1: error.response.data.message
			});
			throw new Error(error?.response.data);
		}
	}

	async function updatePassword(data: IResetPassword) {
		try {
			const response = await Auth.resetPassword(data);
			Toast.show({
				type: 'success',
				text1: response.data.message
			});
		} catch (error: any) {
			console.log(error?.response.data);
			Toast.show({
				type: 'error',
				text1: error.response.data.message
			});
			throw new Error(error?.response.data);
		}
	}

	async function logout() {
		await AsyncStorage.clear();
		setUser({} as IUser);
		setToken('');
		!!user;
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				signIn,
				emailForgetPassword,
				sendEmailResetPassword,
				validateToken,
				updatePassword,
				token,
				logout
			}}>
			{children}
		</AuthContext.Provider>
	);
}
export function useAuth(): AuthContextData {
	const context = useContext(AuthContext);

	return context;
}
