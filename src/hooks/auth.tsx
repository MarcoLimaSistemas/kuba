import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Toast from 'react-native-toast-message';
import {
  IResetPassword,
  ISendEmail,
  ISendToken,
  ISignInCredentials,
} from '../models/auth';
import { IUserClient } from '../models/user';
import api from '../services/api';
import Auth from '../services/auth';

interface AuthContextData {
  user: IUserClient;
  token: string | null;
  emailForgetPassaword: string;

  signIn: (data: ISignInCredentials) => Promise<void>;
  sendEmailResetPassword: (data: ISendEmail) => Promise<void>;
  validateToken: (data: ISendToken) => Promise<void>;
  updatePassword: (data: IResetPassword) => Promise<void>;
  // signed: boolean;
  logout(): void;
}
interface AuthProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProps): ReactElement {
  const [user, setUser] = useState<IUserClient>({} as IUserClient);
  const [token, setToken] = useState('');

  const [emailForgetPassaword, setEmailForgetPassaword] = useState('');

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Sucesso',
      text2: 'Login realizado',
    });
  };

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      try {
        const [storagedUser, storagedToken] = await AsyncStorage.multiGet([
          '@KubaApp:user',
          '@KubaApp:token',
        ]);

        if (storagedUser[1] && storagedToken[1]) {
          // console.log('storage', storagedUser[1]);

          api.defaults.headers.common.Authorization = `Bearer ${storagedToken[1]}`;
          setUser(JSON.parse(storagedUser[1]));
          setToken(storagedToken[1]);
        }
      } catch (error: any) {
        console.log('Erro:', error);
        throw new Error(error);
      }
    }

    loadStoragedData();
  }, []);

  async function signIn(data: ISignInCredentials) {
    try {
      const response = await Auth.signin(data);
      // console.log('Response', response.data);
      console.log('Token', response.data.data.token);

      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.data.token}`;

      setUser(response.data.user[0]);
      setToken(response.data.data.token);
      showToast();
      await AsyncStorage.multiSet([
        ['@KubaApp:token', response.data.token.token],
        ['@KubaApp:user', JSON.stringify(response.data.user[0])],
      ]);
    } catch (error: any) {
      console.log(error?.response?.data?.error?.message);
      throw new Error(error);
    }
  }

  async function sendEmailResetPassword(data: ISendEmail) {
    try {
      const response = await Auth.sendEmailResetPassword(data);

      setEmailForgetPassaword(response?.data?.user?.email);
    } catch (error: any) {
      console.log(error?.response?.data?.error?.message);
      throw new Error(error);
    }
  }

  async function validateToken(data: ISendToken) {
    try {
      const response = await Auth.validateToken(data);
    } catch (error: any) {
      console.log(error?.response?.data?.error?.message);
      throw new Error(error);
    }
  }

  async function updatePassword(data: IResetPassword) {
    try {
      const response = await Auth.resetPassword(data);
      // console.log(response.data);
    } catch (error: any) {
      console.log(error?.response?.data?.error?.message);
      throw new Error(error);
    }
  }

  async function logout() {
    localStorage.clear();
    setUser({} as IUserClient);
    setToken('');
    !!user;
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        emailForgetPassaword,
        sendEmailResetPassword,
        validateToken,
        updatePassword,
        token,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
