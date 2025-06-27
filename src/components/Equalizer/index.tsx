import React, { useEffect, useMemo, useState } from 'react';
import Text from '@components/Text';

import { frequenciesListEmpty } from './data';
import { Spacer } from '@components/Spacer';
import { TouchableOpacity, View } from 'react-native';
import { Icons } from '@assets/icons';
import { scale } from 'react-native-size-matters';
import VerticalSlider from '@components/Slider';

import { NativeModules } from 'react-native';
import Slider from '@react-native-community/slider';

import * as S from './styles';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import { typography } from '../../styles/typography';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPresets } from '@services/preset';
import { useAuth } from '@hooks/auth';
import { IPreset } from '@components/ModalPreset';
import Toast from 'react-native-toast-message';
import { IFrequency } from '@screens/Client/Device';

const { AudioEqualizerModule } = NativeModules;

export interface IFrequenciesListProps{
  frequency: string;
	decibelQuantity: number;
}
interface EqualizerProps {
	handleScrollEnabled: (enabled: boolean) => void;
	handlePreset: (preset: IPreset) => void;
	handleFrequencies: (frequencies: IFrequency[]) => void;
	handleModalEdit: (isEdit: boolean) => void;
	onOpen(): void;
	disabled?: boolean;
	frequenciesList?: IFrequenciesListProps[];
}

export const Equalizer = ({
	handleScrollEnabled,
	handleModalEdit,
	handlePreset,
	handleFrequencies,
	onOpen,
	disabled = false,
	frequenciesList,
}: EqualizerProps) => {
	const [currentPreset, setCurrentPreset] = useState<ValueType | null>(null);

	const [preAmpDB, setPreAmpDB] = useState(0);
	const [frequencies, setFrequencies] = useState(frequenciesList ?? frequenciesListEmpty);

	const [openDropdown, setOpenDropdown] = useState(false);

	const { user } = useAuth();

	const { data, isLoading, isFetched } = useInfiniteQuery({
		queryKey: ['MyPresets'],
		queryFn: ({ pageParam }) =>
			getPresets(user?.id, undefined, pageParam, true, 15),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
	});

	const myPresets = useMemo(() => {
		return (
			data?.pages
				.flatMap(page => page.data)
				.map(preset => ({
					label: preset.name,
					value: preset.id,
					isPublic: preset.is_public,
					genreId: preset.genre_id,
					description: preset.description,
					settings: preset.settings,
				})) ?? []
		);
	}, [data]);

	const handleBandGain = async (band: number, level: number) => {
		try {
			await AudioEqualizerModule.setBandGain(band, level);
		} catch (error) {
			console.log(error);
		}
	};

	const handlePreAmpGain = async (level: number) => {
		try {
			await AudioEqualizerModule.setInputGain(level);
		} catch (error) {
			console.log(error);
		}
	};

	const handlePreAmpDB = (level: number) => {
		setPreAmpDB(level);
	};

	const handleValueChange = (index: number, value: number) => {
		const updatedFrequencies = [...frequencies];
		updatedFrequencies[index].decibelQuantity = value;
		setFrequencies(updatedFrequencies);
		adjustAudio(index, value);
	};

	const adjustAudio = (index: number, value: number) => {
		handleBandGain(index, value);

		console.log(
			`Ajustando frequência ${frequencies[index].frequency} para ${value} dB`
		);
	};

	useEffect(() => {
		handleFrequencies(frequenciesListEmpty);
	}, [frequenciesListEmpty]);

	useEffect(()=>{
		setFrequencies(frequenciesList ?? frequenciesListEmpty);
	},[frequenciesList]);

	useEffect(() => {
		if (myPresets.length > 0) {
			const item = myPresets[0];
			setCurrentPreset(item.value);
			handlePreset({
				id: item.value,
				name: item.label,
				description: item.description,
			  genreId: String(item.genreId),
				isPublic: item.isPublic,
				settings: item.settings,
			});
		}
	}, [isFetched]);

	useEffect(() => {
		handlePreAmpGain(preAmpDB);
	}, [preAmpDB]);
console.log('frequenciesList',frequenciesList);
	return (
		<>
			<S.Container>
				<S.Header>
					<Text variant="bold" color="#656565">
						Equalizador
					</Text>

					<View
						style={{
							flexDirection: 'row',
						}}>
						<TouchableOpacity
							disabled={disabled}
							onPress={() => {
								onOpen();
								handleModalEdit(false);
							}}>
							<Icons.Plus
								width={scale(32)}
								height={scale(32)}
								color={disabled ? '#d7d7d7' : '#6E6E6E'}
							/>
						</TouchableOpacity>

						<Spacer w={16} />

						<TouchableOpacity
							disabled={disabled}
							onPress={() => {
								if (currentPreset) {
									onOpen();
									handleModalEdit(true);
								} else {
									Toast.show({
										type: 'info',
										text1: 'Selecione um preset!',
									});
								}
							}}>
							<Icons.Pencil
								width={scale(32)}
								height={scale(32)}
								color={disabled ? '#d7d7d7' : '#6E6E6E'}
							/>
						</TouchableOpacity>
					</View>
				</S.Header>

				<S.ContainerDropdown>
					<DropDownPicker
						open={openDropdown}
						value={currentPreset}
						items={myPresets}
						loading={isLoading}
						setOpen={setOpenDropdown}
						setValue={setCurrentPreset}
						onSelectItem={(item: any) =>
							handlePreset({
								id: item.value,
								name: item.label,
								description: item.description,
								genreId: item.genreId,
								settings: item.settings,
								isPublic: item.isPublic,
							})
						}
						// setItems={setPresets}
						selectedItemContainerStyle={{
							backgroundColor: '#e4e1e1',
						}}
						showTickIcon={false}
						textStyle={{
							color: '#656565',
							fontFamily: typography['Lato-Regular'].fontFamily,
							fontSize: scale(16),
						}}
						listItemLabelStyle={{
							fontFamily: typography['Lato-Regular'].fontFamily,
							color: '#656565',
						}}
						labelProps={{
							numberOfLines: 1,
						}}
						style={{
							borderColor: 'transparent',
							paddingLeft: 0,
							width: '41%',
						}}
						dropDownContainerStyle={{
							borderColor: 'transparent',
							width: '60%',
							elevation: 4,
							borderRadius: 0,
						}}
						flatListProps={{
							ItemSeparatorComponent: () => <S.LineSeparator />,
						}}
					/>
				</S.ContainerDropdown>

				<S.ContainerBars>
					{frequencies.map((bar, index) => (
						<S.ContainerBar
							key={bar.frequency}
							style={{ width: 32 }}
							onTouchStart={() => handleScrollEnabled(false)}
							onTouchEnd={() => handleScrollEnabled(true)}
							onTouchCancel={() => handleScrollEnabled(true)}>
							<VerticalSlider
								disabled={disabled}
								min={-10}
								max={100}
								step={1}
								value={bar.decibelQuantity}
								onValueChange={value =>
									handleValueChange(index, value)
								}
							/>

							<Spacer h={16} />
							<Text
								fontSize={12}
								color={disabled ? '#d7d7d7' : '#242424'}>
								{bar.frequency}
							</Text>
						</S.ContainerBar>
					))}
				</S.ContainerBars>

				<Spacer h={16} />

				<Text
					fontSize={12}
					style={{ textAlign: 'center' }}
					color={disabled ? '#d7d7d7' : '#242424'}>
					PREAMP/dB
				</Text>

				<Spacer h={16} />

				<S.ContainerSlider>
					<Text
						fontSize={12}
						color={disabled ? '#d7d7d7' : '#242424'}>
						-12
					</Text>

					<View
						style={{
							height: 2,
							width: '80%',
							justifyContent: 'center',
							alignItems: 'center',
						}}
						onTouchStart={() => handleScrollEnabled(false)}
						onTouchEnd={() => handleScrollEnabled(true)}
						onTouchCancel={() => handleScrollEnabled(true)}>
						<Slider
							disabled={disabled}
							minimumValue={-12}
							maximumValue={12}
							step={1}
							value={preAmpDB}
							onValueChange={value => handlePreAmpDB(value)}
							minimumTrackTintColor="transparent"
							maximumTrackTintColor="transparent"
							thumbTintColor={disabled ? '#d7d7d7' : '#242424'}
							style={{
								width: '100%',
								height: 2,
							}}
						/>
						<View
							style={{
								position: 'absolute',
								width: '90%',
								height: 2,
								backgroundColor: disabled
									? '#d7d7d7'
									: '#242424',
								zIndex: -10,
							}}
						/>
					</View>

					<Text
						fontSize={12}
						color={disabled ? '#d7d7d7' : '#242424'}>
						+12
					</Text>
				</S.ContainerSlider>

				<Spacer h={16} />
			</S.Container>
		</>
	);
};
