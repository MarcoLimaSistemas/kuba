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
import { IUserClient } from '../models/user';
import api from '../services/api';
import Auth from '../services/auth';

interface AuthContextData {
	user: IUserClient;
	token: string | null;
	emailForgetPassword: string;

	signIn: (data: ISignInCredentials) => Promise<void>;
	sendEmailResetPassword: (data: ISendEmail) => Promise<void>;
	validateToken: (data: ISendToken) => Promise<void>;
	updatePassword: (data: IResetPassword) => Promise<void>;
	logout(): void;
}
interface AuthProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProps): ReactElement {
	const [user, setUser] = useState<IUserClient>({} as IUserClient);
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
				const storage = await AsyncStorage.getItem('@KubaApp:data');

				if (storage !== null) {
					const storageData = JSON.parse(storage);

					api.defaults.headers.common.Authorization = `Bearer ${storageData.data.token}`;

					setUser(storageData.user[0]);
					setToken(storageData.data.token);
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
			const response = await Auth.signin(data);
			console.log('🚀 ~ signIn ~ response:', response.data);
			await AsyncStorage.setItem(
				'@KubaApp:data',
				JSON.stringify(response.data)
			);

			api.defaults.headers.common['Authorization'] =
				`Bearer ${response.data.token}`;

			setToken(response.data.token);
			setUser(response.data);

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
		AsyncStorage.clear();
		setUser({} as IUserClient);
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
