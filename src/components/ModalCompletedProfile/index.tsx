import React, { forwardRef } from 'react';
import { Button } from '@components/Button';

import { Image, Pressable } from 'react-native';


import {
	Content,
	Footer,
	Header,
	IconClose,
} from './styles';

import { Icons } from '@assets/icons';
import { scale } from 'react-native-size-matters';
import Text from '@components/Text';
import { Spacer } from '@components/Spacer';
import { Modalize } from 'react-native-modalize';
import { FigureCompleted } from '@assets/images';
import { useNavigation } from '@react-navigation/native';



interface ModalPresetProps {
	onClose(): void;
}

export const ModalCompletedProfile = forwardRef(
	({
		onClose,
		}: ModalPresetProps,
		ref
	) => {
  const navigation = useNavigation();

  const handleEditProfile = () => {
	 		navigation.navigate('EditProfile');
			onClose();
	};

		return (
			<>
				<Modalize
					ref={ref}
					adjustToContentHeight
					withHandle={false}
					scrollViewProps={{
						showsVerticalScrollIndicator: false,
					}}
					modalStyle={{
						paddingHorizontal: scale(16),
					}}>
					<Spacer h={16} />
					<Header>
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
					<Content>
						<Image source={FigureCompleted} alt={''} />
					</Content>
						<Text
						variant="bold"
						fontSize={24}
						style={{
							textAlign: 'center',
							marginTop:40,
							textTransform:'uppercase',
						}}
						>
						{'COMPLETAR PERFIL'}
						</Text>

						<Text
						variant="regular"
						fontSize={16}
						style={{
							textAlign: 'center',
							marginTop:16,
						}}
						>
						{'Complete seu perfil para ter uma  \n experiência Kuba completa!'}
						</Text>


					<Spacer h={36} />

					<Footer>
						<Button
							title="COMPLETAR PERFIL"
							onPress={handleEditProfile}
						/>
						<Button
							title="MAIS TARDE"
							variant="secondary"
							onPress={onClose}
						/>

					</Footer>
				</Modalize>

			</>
		);
	}
);
