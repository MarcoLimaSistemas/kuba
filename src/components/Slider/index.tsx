import React from 'react';
import { StyleSheet, View } from 'react-native';
import Slider from '@react-native-community/slider';

interface VerticalSliderProps {
	disabled?: boolean;
	min: number;
	max: number;
	step: number;
	value: number;
	onValueChange: (value: number) => void;
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({
	min,
	max,
	step,
	value,
	disabled = false,
	onValueChange
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.sliderContainer}>
				<Slider
					disabled={disabled}
					style={styles.slider}
					minimumValue={min}
					maximumValue={max}
					step={step}
					value={value}
					onValueChange={onValueChange}
					minimumTrackTintColor="transparent"
					maximumTrackTintColor="transparent"
					thumbTintColor={disabled ? '#d7d7d7' : '#242424'}
				/>
				<View
					style={[
						styles.track,
						{ backgroundColor: disabled ? '#d7d7d7' : '#242424' }
					]}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 200,
		width: 50,
		justifyContent: 'center',
		alignItems: 'center'
	},
	sliderContainer: {
		height: 8,
		width: 200,
		transform: [{ rotate: '-90deg' }],
		justifyContent: 'center',
		alignItems: 'center'
	},
	slider: {
		position: 'absolute',
		width: 200, // height of slider
		height: 8 // width of slider
	},
	track: {
		position: 'absolute',
		width: 180, // height of slider
		height: 2, // width of the bar
		zIndex: -1
	}
});

export default VerticalSlider;
