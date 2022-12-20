import React from 'react';
import { useState } from 'react';
import { TextInputProps } from 'react-native';
import { ButtonSearch, Container, ContainerInput } from './styles';

interface Props extends TextInputProps {
  searchCallback: () => void;
  search: (e: string) => void;
  loading: boolean;
}

export function Search({ searchCallback, search, loading, ...rest }: Props) {
  const [value, setValue] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    search(e.target.value);
  };
  return (
    <Container>
      <ContainerInput
        value={value}
        // onChangeText={handleInputChange}
        {...rest}
      />
      <ButtonSearch disabled={loading} onPress={searchCallback}>
        {/* <FontAwesome name="search" size={24} color="black" /> */}
      </ButtonSearch>
    </Container>
  );
}
