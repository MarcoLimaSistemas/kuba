import React from 'react';
import { View } from 'react-native';
import { scale } from 'react-native-size-matters';

export const Spacer = ({ w, h }: { w?: number; h?: number }) => {
	return (
		<View
			style={{
				width: scale(w ?? 0),
				height: scale(h ?? 0),
			}}
		/>
	);
};
