import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import { Button } from '@components/Button';
import { ModalDelete } from '@components/ModalDelete';

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, Switch, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


import { IPreset, IPresets } from '../../models/preset';

import {
	ContainerButtonDelete,
	ContainerSwitch,
	Footer,
	Header,
	IconClose,
	Input,
	InputContainer
} from './styles';

import { Icons } from '@assets/icons';
import { scale } from 'react-native-size-matters';
import Text from '@components/Text';
import { Spacer } from '@components/Spacer';
import theme from '../../styles/theme';
import { typography } from '../../styles/typography';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createPreset, editPreset, getGenres } from '@services/preset';
import { Modalize } from 'react-native-modalize';
import { queryClient } from '../../../App';

import { useValuesEqualizer } from '@hooks/useValuesEqualizer';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_PRESET } from '@config/storage';
import { getDataPresets, updatePresetInternal } from '@services/internal-storage';

// export interface IPreset {
// 	id: number;
// 	name: string;
// 	description: string;
// 	settings: string;
// 	genreId: string;
// 	isPublic: boolean;
// }

interface ModalPresetProps {
	isEdit: boolean;
	currentPreset: IPreset | null;
	onOpen?(): void;
	onClose(): void;
}

export const ModalPreset = forwardRef(
	(
		{
			isEdit,
			onClose,
			currentPreset,
		}: ModalPresetProps,
		ref
	) => {
		const [open, setOpen] = useState(false);
		const [value, setValue] = useState<number>(0);
		const [isEnabled, setIsEnabled] = useState(false);

		const modalizeRef = useRef<Modalize>(null);

		const openModal = () => modalizeRef.current?.open();
		const closeModal = () => modalizeRef.current?.close();


		const {
			frequency,
			gain,
			quality,
			selectedOptionBand
		} = useValuesEqualizer()


		const {
			setValue: setValueForm,
			handleSubmit,
			control,
			formState: { errors }
		} = useForm<IPresets>();


		const { data: profilesData } = useQuery({
			queryKey: ['MyPresets'],
			queryFn: async () => await getDataPresets(),
			//enabled: isFetched
		});
		const profiles = useMemo(() => {
			return profilesData ?? [];
		}, [profilesData]);


		const { mutateAsync, isPending } = useMutation({
			mutationFn: (data: IPresets[]) => updatePresetInternal(data),
			onSuccess: async res => {
				await queryClient.invalidateQueries({
					queryKey: ['MyPresets']
				});
				Toast.show({
					type: 'success',
					text1: 'Preset criado com sucesso!'
				});
				onClose();
			},
			onError(error) {
				console.error(error);
			}
		});

		const { mutateAsync: mutateAsyncEdit, isPending: isPendingEdit } = useMutation({
			mutationFn: (data: IPresets[]) => updatePresetInternal(data),
			onSuccess: async res => {
				await queryClient.invalidateQueries({
					queryKey: ['MyPresets']
				});
				Toast.show({
					type: 'success',
					text1: 'Preset editado com sucesso!'
				});
				onClose();
			},
			onError(error) {
				console.error(error);
			}
		});

		const toggleSwitch = () => {
			setIsEnabled(previousState => !previousState);
		};

		const savePreset = async (data: IPresets) => {
			try {

				const settings = {

					equalizerConfigs: [{
						"frequency": frequency,
						"decibel_quantity": gain,
						"quality": quality,
						"band": Number(selectedOptionBand),
					}]
				}
				const form = { id: profiles?.length + 1, ...data, ...settings } as unknown as IPresets

				const existingData = await AsyncStorage.getItem(STORAGE_PRESET)
				const parsedData = existingData ? JSON.parse(existingData) as IPresets[] : [];

				if (parsedData.length >= 10) {
					Toast.show({
						type: 'error',
						text1: 'Máximo de 10 perfis permitido.'
					});
					onClose();
				}
				const updatedData = [...parsedData, form] as IPresets[];

				mutateAsync(updatedData);
			} catch (err) {
				console.error("Error", err)
			}

		};

		const editPresetUser = async (data: IPresets) => {
			try {

				const settings = {

					equalizerConfigs: [{
						"frequency": frequency,
						"decibel_quantity": gain,
						"quality": quality,
						"band": Number(selectedOptionBand),
					}]
				}

				const form = { ...data, ...settings } as unknown as IPresets

				const existingData = await AsyncStorage.getItem(STORAGE_PRESET);
				const parsedData = existingData ? JSON.parse(existingData) : [];

				const updatedData = parsedData.map((item: IPresets) =>
					item.id === currentPreset?.id ? { ...item, ...form } : item
				);
				mutateAsyncEdit(updatedData)
			} catch (err) {
				console.error("Error", err)
			}


		};


		const genres = [
			{ value: 1, label: "Rock" },
			{ value: 2, label: "Reggae" },
			{ value: 3, label: 'Hip Hop' },
			{ value: 4, label: 'Eletrônica' },
			{ value: 5, label: 'Clássica' },
			{ value: 6, label: 'Pop' },
		]
		useEffect(() => {
			if (isEdit) {
				setValueForm('name', currentPreset?.name ?? '');
				setValueForm('description', currentPreset?.description ?? '');
				setValueForm('equalizerConfigs', currentPreset?.equalizerConfigs ?? []);
				setValue(currentPreset?.genre_id ?? 0);
				setIsEnabled(currentPreset?.is_public ?? false);
			} else {
				setValueForm('name', '');
				setValueForm('description', '');
				setValueForm('equalizerConfigs', []);
				setValue(0);
				setIsEnabled(false);
			}
		}, [isEdit, currentPreset]);

		useEffect(() => {
			setValueForm('genreId', value);
		}, [value]);

		useEffect(() => {
			setValueForm('isPublic', isEnabled);
		}, [isEnabled]);

		return (
			<>
				<Modalize
					ref={ref}
					adjustToContentHeight
					withHandle={false}
					scrollViewProps={{
						showsVerticalScrollIndicator: false
					}}
					modalStyle={{
						paddingHorizontal: scale(16)
					}}>
					<Spacer h={16} />
					<Header>
						<Text variant="bold">
							{isEdit ? 'Editar Preset' : 'Salvar Preset'}
						</Text>
						<Pressable
							onPress={() => {
								onClose();
							}}>
							<IconClose>
								<Icons.Close
									width={scale(12)}
									height={scale(12)}
								/>
							</IconClose>
						</Pressable>
					</Header>

					<Spacer h={32} />

					<InputContainer>
						<Controller
							name="name"
							control={control}
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder={'Nome do preset'}
									placeholderTextColor={theme.COLORS.gray_200}
									onChangeText={onChange}
									value={value}
								/>
							)}
						/>

						<Spacer h={16} />

						<Controller
							name="description"
							control={control}
							render={({ field: { onChange, value } }) => (
								<Input
									onChangeText={text => onChange(text)}
									value={value}
									placeholder="Descrição (opcional)"
									placeholderTextColor={theme.COLORS.gray_200}
									multiline
									keyboardType="default"
								/>
							)}
						/>

						<Spacer h={16} />

						<DropDownPicker
							open={open}
							value={value}
							items={genres}
							setOpen={setOpen}
							setValue={setValue}
							// setItems={setItems}
							//loading={isLoading}
							placeholder={'Gênero'}
							style={{
								borderWidth: 2,
								borderColor: theme.COLORS.black,
								height: scale(48)
							}}
							textStyle={{
								fontFamily:
									typography['Lato-Regular'].fontFamily,
								color: theme.COLORS.gray_200,
								fontSize: scale(14)
							}}
						/>
					</InputContainer>

					<Spacer h={16} />

					{/* <ContainerSwitch>
						<Switch
							trackColor={{
								false: '#656565',
								true: '#D4BD85'
							}}
							thumbColor={isEnabled ? '#656565' : '#f4f3f4'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
						<Text variant="bold" fontSize={12}>
							Tornar Público
						</Text>
					</ContainerSwitch> */}
					<Spacer h={32} />

					<Footer>
						<Button
							activeLoad={isPending}
							title="Salvar"
							onPress={handleSubmit(data =>
								isEdit ? editPresetUser(data) : savePreset(data)
							)}
						/>
						<Button
							title="Voltar"
							variant="secondary"
							onPress={onClose}
						/>
						{isEdit && (
							<TouchableOpacity
								onPress={() => {
									openModal();
									onClose();
								}}>
								<ContainerButtonDelete>
									<Text
										variant="bold"
										fontSize={12}
										style={{
											textDecorationLine: 'underline'
										}}>
										Excluir preset
									</Text>
									<Spacer w={8} />
									<Icons.Trash
										width={scale(20)}
										height={scale(20)}
									/>
								</ContainerButtonDelete>
								<Spacer h={16} />
							</TouchableOpacity>
						)}
					</Footer>
				</Modalize>

				<ModalDelete
					ref={modalizeRef}
					onClose={closeModal}
					currentPreset={currentPreset}
				/>
			</>
		);
	}
);
