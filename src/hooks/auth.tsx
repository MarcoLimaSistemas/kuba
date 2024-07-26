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
	ISignInCredentials,
	IUserAuth
} from '../models/auth';
import api from '../services/api';
import Auth from '../services/auth';
import { STORAGE_KEY } from '@config/storage';

interface AuthContextData {
	user: IUserAuth | null;
	emailForgetPassword: string;

	signIn: (data: ISignInCredentials) => Promise<void>;
	sendEmailResetPassword: (data: ISendEmail) => Promise<void>;
	validateToken: (data: ISendToken) => Promise<void>;
	updatePassword: (data: IResetPassword) => Promise<void>;
	logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({
	children
}: {
	children: ReactNode;
}): ReactElement {
	const [user, setUser] = useState<IUserAuth | null>(null);

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
					const storageData = JSON.parse(storage);

					api.defaults.headers.common.Authorization = `Bearer ${storageData.token.token}`;
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

	async function signIn(credentials: ISignInCredentials) {
		try {
			const { data } = await Auth.signIn(credentials);

			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));

			api.defaults.headers.common['Authorization'] =
				`Bearer ${data.token.token}`;

			setUser(data);

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
		setUser(null);
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
