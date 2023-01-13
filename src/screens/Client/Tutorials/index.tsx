import React from 'react';

import { Navbar } from '@components/Navbar';
import { Box, Container, Icon, Label, Subtitle, Title, TitleTutorial, Tutorial } from './styles';
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

import { FoneExample, Link } from '@assets/images'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function Tutorials() {
  const navigation = useNavigation()

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

        <Box mt={40} alignItems='flex-start'>
          <Label>Tutoriais</Label>

          <Tutorial onPress={() => navigation.navigate('SettingsEarphone')}>
            <TitleTutorial>
              {'Name tutorial'}
            </TitleTutorial>
            <Icon>
              <Image source={Link} />
            </Icon>
          </Tutorial>
        </Box>

        <Box mt={16}>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </Box>
      </KeyboardAwareScrollView>
    </Container>
  );
};