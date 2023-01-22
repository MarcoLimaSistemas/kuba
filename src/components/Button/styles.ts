
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';


export type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonContainerProps {
  variant: ButtonVariant;
}

interface ColorTextProps {
  variant: ButtonVariant
}


const background = {
  primary: '#242424',
  secondary: '#D4BD85',
  outline: '#ffffff'
}

const text = {
  primary: '#D4BD85',
  secondary: '#242424',
  outline: '#000',
}


export const StyledButton = styled.TouchableOpacity <ButtonContainerProps>`
    width: 100%;
    height: ${RFValue(56)}px;
    border-radius:8px;
    align-items: center;
    justify-content: center;
    transition: 0.3s;

    margin-bottom: 16px;
  ${props => {
    return css`
      background-color:${background[props.variant]}; 
      border: 1px solid $
      {props.variant === 'primary' ? background[props.variant] : props.variant === 'secondary' ?
            '#D4BD85' : '#242424'};
  `
  }} 
`;
export const Title = styled.Text <ColorTextProps>` 
font-size: ${RFValue(16)}px;
text-transform: uppercase;

${props => {
    return css`color:${text[props.variant]};`
  }} 
`;