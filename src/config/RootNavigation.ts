import { createRef } from 'react';

import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createRef<NavigationContainerRef<any>>();

// esse navigation serve para ser usado dentro de context api
export function navigate(name: string, params?: Record<string, unknown>) {
  navigationRef.current?.navigate(name, params);
}
