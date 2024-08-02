import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import Text from '@components/Text';

export function Loading() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			}}>
			<ActivityIndicator color={'#D4BD85'} size={32} />
		</View>
	);
}
