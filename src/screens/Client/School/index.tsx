import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

import { Alert, FlatList } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button } from '@components/Button';
import { CardVideo } from '@components/CardVideo';
import { Navbar } from '@components/Navbar';
import { Search } from '@components/Search';

import { Container, ContainerVideos, MessageText } from './styles';
import { useNavigation } from '@react-navigation/native';

export function School() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState<string>();

  const [videos, setVideos] = useState<any[]>([]);

  async function getVideosSchool() {
    try {
      const { data } = await api.get('user/school/kuba/index')
      console.log(data)
      setVideos(data)
    } catch (err: any) {
      Alert.alert(err.response.data.message)
    }
  }

  useEffect(() => {
    getVideosSchool()
  }, [])


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
      <Navbar darkTheme={true} />
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
          {videos.length === 0 ?
            <MessageText>No momento não temos nenhum video!</MessageText>
            :
            <FlatList
              data={videos}
              keyExtractor={(item) => String(item.id)}
              showsHorizontalScrollIndicator={false}
              horizontal
              snapToAlignment={'start'}
              scrollEventThrottle={14}
              renderItem={({ item }) => (
                <CardVideo title={item.title} thumbnail={item.thumbnail} link={item.link} />
              )}
            />}

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
