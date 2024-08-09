import React, {useMemo, useState} from 'react';

import {FlatList, RefreshControl, StatusBar, View} from 'react-native';

import {Button} from '@components/Button';
import {CardVideo} from '@components/CardVideo';
import {Search} from '@components/Search';

import {
  Container,
  ContainerButton,
  ContainerVideos,
  ContainerBody,
} from './styles';

import {useNavigation} from '@react-navigation/native';
import {Header} from '@components/Header';
import {useInfiniteQuery} from '@tanstack/react-query';
import {getClasses} from '@services/kubaSchool';
import {useAuth} from '@hooks/auth';
import {Spacer} from '@components/Spacer';
import Text from '@components/Text';
import theme from '../../../styles/theme';

export function School() {
  const [search, setSearch] = useState<string>();
  const {user} = useAuth();
  const navigation = useNavigation();

  const {data, refetch, isLoading} = useInfiniteQuery({
    queryKey: ['kubaSchool'],
    queryFn: ({pageParam}) =>
      getClasses({
        userId: user?.id,
        page: pageParam,
        perPage: undefined,
        search,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.data.last_page,
  });

  const classes = useMemo(() => {
    const classes: any[] = [];
    data?.pages.forEach(e => classes.push(...e.data.data));
    return classes;
  }, [data]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          backgroundColor: theme.COLORS.black,
        }}>
        <Header typeLogo="white" />
        <Search
          searchCallback={() => {
            refetch();
          }}
          loading={false}
          placeholder="Procurar vídeos"
          value={search}
          onChangeText={text => setSearch(text)}
        />
      </View>

      <Container
        contentContainerStyle={{
          flexGrow: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }>
        <ContainerBody>
          <ContainerVideos>
            {classes.length === 0 ? (
              <Text>No momento não temos nenhum video!</Text>
            ) : (
              <FlatList
                data={classes}
                ItemSeparatorComponent={() => <Spacer h={16} />}
                scrollEnabled={false}
                keyExtractor={item => String(item.id)}
                showsHorizontalScrollIndicator={false}
                snapToAlignment={'start'}
                scrollEventThrottle={14}
                renderItem={({item}) => (
                  <CardVideo
                    title={item.title}
                    thumbnail={item.thumbnail}
                    link={item.link}
                  />
                )}
              />
            )}
          </ContainerVideos>
        </ContainerBody>

        <View style={{flex: 1}} />

        <ContainerButton>
          <Button
            title="Voltar"
            variant="secondary"
            onPress={() => navigation.goBack()}
          />
        </ContainerButton>
      </Container>
    </>
  );
}
