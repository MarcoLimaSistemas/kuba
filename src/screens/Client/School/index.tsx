import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button } from '@components/Button';
import { CardVideo } from '@components/CardVideo';
import { Navbar } from '@components/Navbar';
import { Search } from '@components/Search';

import { Container, ContainerVideos } from './styles';
import { useNavigation } from '@react-navigation/native';

import { Text } from 'react-native'

export function School() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<any>();

  async function getSearch() {
    try {
      setLoading(true);
    } catch (error: any) {
      setLoading(false);
      throw new Error(error);
    }
  }

  return (
    <Container>
      <Navbar />
      <Search
        searchCallback={getSearch}
        search={setSearch}
        loading={loading}
        placeholder="Procurar vídeos"
        value={search}
        onChangeText={text => setSearch(text)}
      />

      <KeyboardAwareScrollView>
        <ContainerVideos>
          <CardVideo title="Kuba Responde #1: Dicionário do Áudio" />
          <CardVideo title="Kuba Responde #1: Dicionário do Áudio" />
          <CardVideo title="Kuba Responde #1: Dicionário do Áudio" />
          <CardVideo title="Kuba Responde #1: Dicionário do Áudio" />

          <Button
            title="Voltar"
            variant="secondary"
            onPress={() => navigation.goBack()}
          />
        </ContainerVideos>

      </KeyboardAwareScrollView>
    </Container>
  );
}
