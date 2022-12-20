import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Box, Container, Content, Label, Option, Title } from './styles';

import { ArrowBack } from '@assets/icons'
import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';

interface SettingsEarphoneProps {

}

export function SettingsEarphone() {
  const navigation = useNavigation()

  return (
    <Container>
      <Content>
        <View>
          <Box alignItems='center' justifyContent='flex-start' mt={32}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={ArrowBack} />
            </TouchableOpacity>
            <Title>Configurações do fone</Title>
          </Box>

          <Box alignItems='center' justifyContent='space-between' mt={40}>
            <Label>{'Duplo clique direito'}</Label>
            <Option>{'Passar música'}</Option>
          </Box>

          <Box alignItems='center' justifyContent='space-between' mt={40}>
            <Label>{'Duplo clique esquerdo'}</Label>
            <Option>{'Voltar música'}</Option>
          </Box>

          <Box alignItems='center' justifyContent='space-between' mt={40}>
            <Label>{'Triplo clique direito'}</Label>
            <Option>{'Passar música'}</Option>
          </Box>

          <Box alignItems='center' justifyContent='space-between' mt={40}>
            <Label>{'Triplo clique esquerdo'}</Label>
            <Option>{'Diminuir música'}</Option>
          </Box>
        </View>

        <Box mt={16}>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </Box>
      </Content>
    </Container>
  );
};
