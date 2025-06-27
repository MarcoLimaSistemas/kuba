import React from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

interface ButtonGradientProps {
  type?: string;
}

export function ButtonGradient({ type = 'primary' }: ButtonGradientProps) {
  return (
    <TouchableOpacity>
      <ButtonStyled
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#4c669f', '#3b5998', '#192f6a']}
        locations={[0, 0.5, 1]}>
        <BorderStyled typeButton={type}>
          <TextStyled typeButton={type}>
            Sign in with Facebook
          </TextStyled>
        </BorderStyled>
      </ButtonStyled>
    </TouchableOpacity >
  );
}

interface StyledProps {
  typeButton: string | undefined;
}

export const ButtonStyled = styled(LinearGradient)`
  flex: 1;
  align-items: center;  
  border-radius: 14px;
  padding: 4px;
`;
export const BorderStyled = styled.View<StyledProps>`
  width: 100%;
  flex: 1;
  padding: 24px;
  align-items: center;  
  border-radius: 12px;
  background-color: ${({ typeButton }) => typeButton === 'secondary' ? '#fffafa' : 'transparent'};
`;
export const TextStyled = styled.Text<StyledProps>`
  text-align: center;
  text-transform: uppercase;
  font-weight: 500;
  color: ${({ typeButton }) => typeButton === 'secondary' ? '#192f6a' : '#fffafa'};
`;
