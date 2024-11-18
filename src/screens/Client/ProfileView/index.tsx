import React, {useMemo, useState} from 'react';
import {Linking, ScrollView, Switch, TouchableOpacity, View} from 'react-native';

import {Button} from '@components/Button';
import {Header} from '@components/Header';

import {
  FacebookLogo,
  InstagramLogo,
  QobuzzLogo,
  SpotifyLogo,
} from '@assets/sociais';

import {useAuth} from '@hooks/auth';
import {useNavigation, useRoute} from '@react-navigation/native';
import {timestampToDate} from '@utils/date';
import {
  ButtonExternalLink,
  Container,
  ContainerPreset,
  ContainerSocial,
  Footer,
  ImageProfile,
  LogoSocial,
  Wrapper,
} from './styles';

import {Spacer} from '@components/Spacer';
import {Loading} from '@components/Loading';
import Text from '@components/Text';

import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import User from '@services/user';
import { getPresets } from '@services/preset';

interface PresetsProps{
  title:string;
  type:string;
  onPress:()=>void;
}
function Preset({title, type, onPress}:PresetsProps){
  return(
   <ContainerPreset onPress={onPress}>
      <Text 
      fontSize={18} 
      variant="bold"
      >{title}</Text>

      <Text 
      fontSize={16} 
      variant="regular" 
      >{type}</Text>

   </ContainerPreset> 
  )
}
export function ProfileView() {
  const navigation = useNavigation<any>();

  const route = useRoute();

	const { userId } = route.params as any ;


  const { data: user, isLoading } = useQuery({
		queryKey: ['details-profile'],
    queryFn: () => User.getInfo(userId),
	});
  const { data, isLoading:isLoadingPresets, refetch } = useInfiniteQuery({
		queryKey: ['presets',userId],
		queryFn: ({ pageParam }) => getPresets(userId, '', pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    }
	});
  const presets = useMemo(() => {
		return data?.pages.flatMap(page => page.data) ?? [];
	}, [data]);


  const socialNetworks = user?.client?.socialNetworks ?? [];
  
  function handleOpenBrowser(url:string) {
    Linking.openURL(`${url}`);
  }

  if (isLoading) {
    return <Loading />;
  }

  
  return (
    <Wrapper>
      <Header title="Perfil" />
      <Spacer h={16} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <Spacer h={16} />
        <ImageProfile
          source={
            user?.client?.profile_url
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

  
          <Spacer h={32} />
     
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
        </Container>


        <Footer>
    
        {presets.length > 0 &&(
       <>
          <Text variant='bold' fontSize={18}>Presets Públicos</Text>
          {
             presets.map((item)=>(
              <Preset title={item.name} 
                type={item.description} 
                onPress={()=> navigation.navigate('Preset',{
                 preset: {
                   id:item.id,
                   name:item.name,
                   imgURL:item.img_url
                 }
                })}
  
              />
            ))
          }
      </>
         
        )}
  
        </Footer>
      </ScrollView>
    </Wrapper>
  );
}
