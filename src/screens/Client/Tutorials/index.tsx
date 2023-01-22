import React, { useCallback, useState } from 'react';
import { Alert, FlatList, Image, RefreshControl } from 'react-native';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import api from '../../../services/api';

import { Navbar } from '@components/Navbar';
import { Button } from '@components/Button';
import { FoneExample, Link } from '@assets/images'

import {
  Box,
  Container,
  ContainerItemTutorial,
  ContainerTutorial,
  Icon,
  Label,
  MessageText,
  Subtitle,
  Title,
  TitleTutorial
} from './styles';

interface TutorialProps {
  id: number
  user_admin_id: number
  nome: string
  is_bluetooth: boolean
  componentTutorials: []
}

export function Tutorials() {
  const navigation = useNavigation() as NavigationProp<ReactNavigation.RootParamList> | any

  const [tutorials, setTutorials] = useState<TutorialProps[]>([])
  const [refreshing, setRefreshing] = useState(false)

  async function getTutorials() {
    try {
      const { data } = await api.get('user/tutorials/1')
      console.log(data)
      setTutorials(data)
      setRefreshing(false)
    } catch (err: any) {
      Alert.alert(err.response.data.message)
    }
  }

  function onRefresh() {
    setRefreshing(true)
    setTutorials([])
    getTutorials()
  }

  useFocusEffect(
    useCallback(() => {
      getTutorials()
    }, [])
  )

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Navbar />

        <Box mt={32}>
          <Title>{'Kuba Disco'}</Title>
          <Subtitle>
            {'Para aprender a usar seu Kuba Disco, basta clicar nos pontos de seleção da imagem'}
          </Subtitle>
        </Box>

        <Box mt={24}>
          <Image source={FoneExample} />
        </Box>

        <ContainerTutorial >
          <Label>Tutoriais</Label>

          {tutorials.length === 0 ?
            <MessageText>No momento não temos nenhum video!</MessageText>
            :
            <FlatList
              data={tutorials}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              keyExtractor={(item) => String(item.id)}
              snapToAlignment={'start'}
              scrollEventThrottle={14}
              renderItem={({ item }) => (
                <ContainerItemTutorial>
                  <TitleTutorial>
                    {item.nome}
                  </TitleTutorial>

                  <Icon onPress={() => navigation.navigate('SettingsEarphone', { TutorialID: item.id })}>
                    <Image source={Link} />
                  </Icon>
                </ContainerItemTutorial>
              )}
            />}
        </ContainerTutorial>

        <Box mt={16}>
          <Button title='Voltar' onPress={() => navigation.goBack()} />
        </Box>
      </KeyboardAwareScrollView>
    </Container>
  );
};