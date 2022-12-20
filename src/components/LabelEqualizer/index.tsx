import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { BoxIcons, Container, Icon, Title } from './styles';

interface LabelEqualizerProps {
  edit: () => void;
  add: () => void;
}

export function LabelEqualizer({ edit, add }: LabelEqualizerProps) {
  return (
    <Container>
      <Title>Equalizador</Title>
      <BoxIcons>
        <TouchableOpacity onPress={edit}>
          <Icon name="edit" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="add" onPress={add} />
        </TouchableOpacity>
      </BoxIcons>
    </Container>
  );
}
