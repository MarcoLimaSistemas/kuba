import React, { ReactNode, useEffect, useState } from 'react';
import { ScrollView, Switch } from 'react-native';

import { Button } from '@components/Button';
import { Header } from '@components/Header';

import { profile } from '@assets/images';
import {
  FacebookLogo,
  InstagramLogo,
  QobuzzLogo,
  SpotifyLogo,
} from '@assets/sociais';

import {
  BoxButtons,
  BoxText,
  Container,
  ContainerSocial,
  ContainerSwitch,
  Description,
  ImageProfile,
  LogoSocial,
  Name,
  Separator,
  Text,
  TextBold,
  TextSwitch,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';
import api from '../../../services/api';

export function Profile() {
  const navigation = useNavigation();
  const { logout } = useAuth()

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  async function onProductKuba() {
    try {
      const res = await api.get('/user/perfil/update/product/kuba', {
        params: {
          kuba_product: isEnabled
        }
      })

      console.log(res.data)
    } catch (err) {
      console.log(err)
    } finally {

    }
  }

  useEffect(() => {
    onProductKuba()
  }, [isEnabled])

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Perfil" activeButtonGoBack={true} />
        <ImageProfile source={profile} />
        <Name>Kabir McKinney</Name>

        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget
          porttitor urna. In gravida, orci vel pretium lobortis, lorem purus
          auctor mauris, in sollicitudin orci enim vel enim. Integer consequat
          ex id tortor molestie accumsan. Quisque egestas, mi sed porta auctor,
          turpis sapien dignissim purus, et volutpat urna lorem blandit lectus.
        </Description>

        <ContainerSwitch>
          <Switch
            trackColor={{ false: '#656565', true: '#D4BD85' }}
            thumbColor={isEnabled ? '#656565' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <TextSwitch>Tenho um produto Kuba</TextSwitch>
        </ContainerSwitch>

        <ContainerSocial>
          <LogoSocial source={FacebookLogo} />
          <LogoSocial source={InstagramLogo} />
          <LogoSocial source={SpotifyLogo} />
          <LogoSocial source={QobuzzLogo} />
        </ContainerSocial>

        <BoxText>
          <Separator>
            <TextBold>Data de nascimento</TextBold>
            <Text>{'05/08/1999'}</Text>
          </Separator>

          <TextBold>Email</TextBold>
          <Text>{'teste@gmail.com'}</Text>
        </BoxText>

        <BoxButtons>
          <Button title="Loggout" onPress={logout} />
          <Button title="Editar Perfil" onPress={() => navigation.navigate('EditProfile')} />
          <Button title="Alterar Senha" variant="secondary" onPress={() => navigation.navigate('ChangePassword')} />
        </BoxButtons>
      </ScrollView>
    </Container>
  );
}
