import React from 'react';

import { ReactNode, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { Button } from '@components/Button';
import { CardVideo } from '@components/CardVideo';
import { Navbar } from '@components/Navbar';
import { Search } from '@components/Search';

import { Container, ContainerVideos } from './styles';

interface SchoolProps {
  children: ReactNode;
}

export function School() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

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
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ContainerVideos>
          <CardVideo title="Kuba Responde #1: Dicionário do Áudio" />
          <CardVideo title="Kuba Responde #1: Dicionário do Áudio" />
          <CardVideo title="Kuba Responde #1: Dicionário do Áudio" />
          <CardVideo title="Kuba Responde #1: Dicionário do Áudio" />
          <Button title="Voltar" variant="secondary" />
        </ContainerVideos>
      </ScrollView>
    </Container>
  );
}
