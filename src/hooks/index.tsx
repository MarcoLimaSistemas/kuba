import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { AuthProvider } from './auth';
import { ModalProvider } from './modal';

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <AuthProvider>{children}</AuthProvider>
      </ModalProvider>
    </ThemeProvider>
  );
};
