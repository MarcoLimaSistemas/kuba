import React, { useEffect } from 'react';
import { Button } from '@components/Button';
import { ModalDelete } from '@components/ModalDelete';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, Pressable, Switch, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { IPresets } from '../../models/preset';

import {
	Container,
	ContainerButtonDelete,
	ContainerModal,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation } from '@tanstack/react-query';
import { createPreset } from '@services/preset';
import { useAuth } from '@hooks/auth';

interface ModalPresetProps {
	isEdit: boolean;
	isOpen: boolean;
	onOpen?(): void;
	onClose(): void;
}

export function ModalPreset({ isOpen, isEdit, onClose }: ModalPresetProps) {
	const [showModalDelete, setShowModalDelete] = useState(false);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');
	const [isEnabled, setIsEnabled] = useState(false);
	const [items, setItems] = useState([
		{ label: 'Rock ', value: '1' },
		{ label: 'sertanejo', value: '1' }
	]);

	const {
		setValue: setValueForm,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<IPresets>();

	const { user } = useAuth();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: (data: IPresets) => createPreset(data, user.id),
		onSuccess: () => {
			onClose();
		},
		onError(error) {
			console.log(error);
		}
	});

	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	const navigation = useNavigation();

	const savePreset = (data: IPresets) => {
		//TODO: implement logic to settings
		const settings = {
			settings: '0,0,0,0,0,0,0,0,0'
		};
		mutateAsync({ ...data, ...settings });
	};

	useEffect(() => {
		setValueForm('genreId', value);
	}, [value]);

	useEffect(() => {
		setValueForm('isPublic', isEnabled);
	}, [isEnabled]);

	return (
		<>
			<Modal animationType="slide" transparent={true} visible={isOpen}>
				<Container>
					<KeyboardAwareScrollView
						contentContainerStyle={{ flexGrow: 1 }}
						showsVerticalScrollIndicator={false}>
						<View style={{ flex: 1 }} />
						<ContainerModal>
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
									render={({
										field: { onChange, value }
									}) => (
										<Input
											placeholder={'Nome do preset'}
											placeholderTextColor={
												theme.COLORS.gray_200
											}
											onChangeText={onChange}
											value={value}
										/>
									)}
								/>

								<Spacer h={16} />

								<Controller
									name="description"
									control={control}
									render={({
										field: { onChange, value }
									}) => (
										<Input
											onChangeText={text =>
												onChange(text)
											}
											value={value}
											placeholder="Descrição (opcional)"
											placeholderTextColor={
												theme.COLORS.gray_200
											}
											multiline
											keyboardType="default"
										/>
									)}
								/>

								<Spacer h={16} />

								<DropDownPicker
									open={open}
									value={value}
									items={items}
									setOpen={setOpen}
									setValue={setValue}
									setItems={setItems}
									placeholder={'Gênero'}
									style={{
										borderWidth: 2,
										borderColor: theme.COLORS.black,
										height: scale(48)
									}}
									textStyle={{
										fontFamily:
											typography['Lato-Regular']
												.fontFamily,
										color: theme.COLORS.gray_200,
										fontSize: scale(14)
									}}
								/>
							</InputContainer>

							<Spacer h={16} />

							<ContainerSwitch>
								<Switch
									trackColor={{
										false: '#656565',
										true: '#D4BD85'
									}}
									thumbColor={
										isEnabled ? '#656565' : '#f4f3f4'
									}
									ios_backgroundColor="#3e3e3e"
									onValueChange={toggleSwitch}
									value={isEnabled}
								/>
								<Text variant="bold" fontSize={12}>
									Tornar Público
								</Text>
							</ContainerSwitch>
							<Spacer h={32} />

							<Footer>
								<Button
									activeLoad={isPending}
									title="Salvar"
									onPress={handleSubmit(savePreset)}
								/>
								<Button
									title="Voltar"
									variant="secondary"
									onPress={() => navigation.goBack()}
								/>
								{isEdit && (
									<TouchableOpacity
										onPress={() => {
											setShowModalDelete(true);
											onClose();
										}}>
										<ContainerButtonDelete>
											<Text
												variant="bold"
												fontSize={12}
												style={{
													textDecorationLine:
														'underline'
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
						</ContainerModal>
					</KeyboardAwareScrollView>
				</Container>
			</Modal>

			<ModalDelete
				visible={showModalDelete}
				onClose={() => setShowModalDelete(false)}
			/>
		</>
	);
}
