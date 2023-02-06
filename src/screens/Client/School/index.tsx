import React, { useCallback, useEffect, useState } from 'react'
import api from '../../../services/api'

import { Alert, FlatList, RefreshControl, StatusBar } from 'react-native'

import { Button } from '@components/Button'
import { CardVideo } from '@components/CardVideo'
import { Navbar } from '@components/Navbar'
import { Search } from '@components/Search'

import { Container, ContainerButton, ContainerVideos, MessageText } from './styles'
import { useFocusEffect, useNavigation } from '@react-navigation/native'

export function School() {
  const navigation = useNavigation()

  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState<string>()

  const [videos, setVideos] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState(false)

  async function getVideosSchool() {
    try {
      const { data } = await api
        .get('user/school/kuba/index', {
          params: {
            keyword: search
          }
        })
      console.log(data)
      setVideos(data)
      setRefreshing(false)
    } catch (err: any) {
      Alert.alert(err.response.data.message)
    }
  }

  function onRefresh() {
    setRefreshing(true)
    setVideos([])
    getVideosSchool()
  }

  useFocusEffect(
    useCallback(() => {
      getVideosSchool()
    }, [])
  )

  async function getSearch() {
    try {
      setLoading(true)
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  useEffect(() => {
    getVideosSchool();
  }, [search])

  return (
    <Container>
      <StatusBar barStyle='light-content' />
      <Navbar darkTheme={true} />
      <Search
        searchCallback={getSearch}
        search={setSearch}
        loading={loading}
        placeholder="Procurar vídeos"
        value={search}
        onChangeText={text => setSearch(text)}
      />

      <ContainerVideos>
        {videos.length === 0 ?
          <MessageText>No momento não temos nenhum video!</MessageText>
          :
          <FlatList
            data={videos}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            keyExtractor={(item) => String(item.id)}
            showsHorizontalScrollIndicator={false}
            horizontal
            snapToAlignment={'start'}
            scrollEventThrottle={14}
            renderItem={({ item }) => (
              <CardVideo title={item.title} thumbnail={item.thumbnail} link={item.link} />
            )}
          />}
      </ContainerVideos>

      <ContainerButton>
        <Button
          title="Voltar"
          variant="secondary"
          onPress={() => navigation.goBack()}
        />
      </ContainerButton>
    </Container>
  )
}
