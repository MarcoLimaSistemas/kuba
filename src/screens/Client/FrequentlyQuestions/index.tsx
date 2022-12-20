import * as React from 'react';

import { Container, Content } from './styles';

import { useNavigation } from '@react-navigation/native';
import { Dropdown } from '@components/DropDown';
import { Button } from '@components/Button';
import { Box } from '../Tutorials/styles';
import { Header } from '@components/Header';

interface FrequentlyQuestionsProps { }

export function FrequentlyQuestions(props: FrequentlyQuestionsProps) {
  const navigation = useNavigation()

  return (
    <Container>
      <Header title="Dúvidas frequentes" activeButtonGoBack={true} />
      <Content>
        <Dropdown
          title='O que é lorem ipsum?'
          text='lorem ipsum é lorem ipsum dolor sit amet, consectetur adipiscing elit'
        />
      </Content>

      <Box mt={16}>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </Box>
    </Container >
  );
};