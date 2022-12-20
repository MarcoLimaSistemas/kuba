import React from 'react';
import { Button } from '@components/Button';
import { CardPersonalities } from '@components/CardProfile/CardPersonalities';
import { Navbar } from '@components/Navbar';
import { Search } from '@components/Search';
import { ReactNode, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { Container, ContainerPersonalities, Title } from './styles';

interface PersonalitiesProps {
  children: ReactNode;
}

export function Personalities() {
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
      <Title>Personaliades</Title>
      <Search
        searchCallback={getSearch}
        search={setSearch}
        loading={loading}
        placeholder="Procurar personalidades"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ContainerPersonalities>
          <CardPersonalities />
          <CardPersonalities />
          <CardPersonalities />
          <Button title="Voltar" variant="secondary" />
        </ContainerPersonalities>
      </ScrollView>
    </Container>
  );
}
