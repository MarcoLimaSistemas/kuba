import React from 'react';

import * as S from './styles';
import Text from '@components/Text';

type RadioButtonProps = {
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({ options, selectedOption, onSelect }) => {
  return (
    <S.Container>
      {options.map((option) => (
        <S.Button key={option} isSelected={selectedOption === option}  onPress={() => onSelect(option)}>
          <S.ContainerText>
          <Text color={selectedOption === option?"white":'black'} fontSize={14}>Band</Text>
          <Text color={selectedOption === option?"white":'black'} fontSize={14}>{option}</Text>
          </S.ContainerText>
        </S.Button>
      ))}
    </S.Container>
  );
};


export default RadioButton;
