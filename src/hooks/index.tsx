import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { AuthProvider } from './auth';

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>{children}</AuthProvider>
		</ThemeProvider>
	);
};
