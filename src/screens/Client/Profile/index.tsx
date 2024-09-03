import React, {useState} from 'react';
import {Linking, ScrollView, Switch, View} from 'react-native';

import {Button} from '@components/Button';
import {Header} from '@components/Header';

import {
  FacebookLogo,
  InstagramLogo,
  QobuzzLogo,
  SpotifyLogo,
} from '@assets/sociais';

import {useAuth} from '@hooks/auth';
import {useNavigation} from '@react-navigation/native';
import {timestampToDate} from '@utils/date';
import {
  ButtonExternalLink,
  Container,
  ContainerSocial,
  ImageProfile,
  LogoSocial,
} from './styles';
import {userDetails} from '../../../react-query/userDetails';
import {Spacer} from '@components/Spacer';
import {Loading} from '@components/Loading';
import Text from '@components/Text';
import {scale} from 'react-native-size-matters';
import {useEditUser} from '@react-query/mutateEditUser';
import {useMutation} from '@tanstack/react-query';
import User, {IEditInfoProps} from '@services/user';
import Toast from 'react-native-toast-message';
import {queryClient} from '../../../../App';

export function Profile() {
  const navigation = useNavigation();

  const {logout} = useAuth();

  const {data: user, isLoading} = userDetails({});

  const socialNetworks = user?.client.socialNetworks ?? [];

  const hasProduct = user?.client?.has_kuba_product ?? false;

  const {mutateAsync, isPending} = useMutation({
    mutationFn: ({userId, data}: IEditInfoProps) =>
      User.editInfo({
        userId,
        data,
      }),
    onSuccess: () => {
      queryClient.setQueryData(['userDetails'], {
        ...user,
        client: {...user?.client, has_kuba_product: !hasProduct},
      });
    },
    onError: error => {
      console.error('error :', error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao atualizar perfil!',
      });
    },
  });

  function handleOpenBrowser(url:string) {
    Linking.openURL(`${url}`);
  }



  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header title="Perfil" />
      <Spacer h={16} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Spacer h={16} />
        <ImageProfile
          source={
            user?.client.profile_url
              ? {uri: user.client.profile_url}
              : require('@assets/images/avatar.png')
          }
        />

        <Spacer h={16} />
        <Container>
          <Text fontSize={24} variant="bold" style={{textAlign: 'center'}}>
            {user?.name}
          </Text>

          <Spacer h={16} />

          <Text>{user?.client?.description ?? 'Sem descrição.'}</Text>

  
          <Spacer h={48} />

          <ContainerSocial>
            {socialNetworks.map(e => {
              const name = e.name;
              switch (name) {
                case 'Facebook':
                  return (
                  <ButtonExternalLink onPress={()=> handleOpenBrowser(e.link)}>
                    <LogoSocial source={FacebookLogo} />
                  </ButtonExternalLink> 
                  )
                case 'Instagram':
                  return (
                    <ButtonExternalLink onPress={()=> handleOpenBrowser(e.link)}>
                      <Spacer w={16} />
                      <LogoSocial source={InstagramLogo} />
                    </ButtonExternalLink>
                  );
                case 'Spotify':
                  return (
                    <ButtonExternalLink onPress={()=> handleOpenBrowser(e.link)}>
                      <Spacer w={16} />
                      <LogoSocial source={SpotifyLogo} />
                    </ButtonExternalLink>
                  );
                case 'Qobuzz':
                  return (
                    <ButtonExternalLink onPress={()=> handleOpenBrowser(e.link)}>
                      <Spacer w={16} />
                      <LogoSocial source={QobuzzLogo} />
                    </ButtonExternalLink>
                  );

                default:
                  return null;
              }
            })}
          </ContainerSocial>

          <Spacer h={32} />

          <Text style={{lineHeight: scale(24)}}>
            <Text variant="bold">Data de nascimento</Text>
            <Text>
              {'\n' + timestampToDate(user?.client?.birth_date ?? '')}
            </Text>
          </Text>

          <Spacer h={16} />
          <Text style={{lineHeight: scale(24)}}>
            <Text variant="bold">Email</Text>
            <Text>{'\n' + user?.email}</Text>
          </Text>
          <Spacer h={32} />
        </Container>

        <View style={{flex: 1}} />

        <Container>
          <Button title="Sair" onPress={logout} />
          <Button
            title="Editar Perfil"
            onPress={() => navigation.navigate('EditProfile')}
          />
          <Button
            title="Alterar Senha"
            variant="secondary"
            onPress={() => navigation.navigate('ChangePassword')}
          />
        </Container>
      </ScrollView>
    </>
  );
}
