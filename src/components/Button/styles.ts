import {RFValue} from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';

export type ButtonVariant = 'primary' | 'secondary' | 'outline'

interface ButtonContainerProps {
    variant: ButtonVariant
}

const background = {
    primary: '#242424',
    secondary: '#D4BD85',
    outline: '#ffffff',
};

export const StyledButton = styled.TouchableOpacity<ButtonContainerProps>`
    width: 100%;
    height: ${RFValue(56)}px;
    border-radius: 8px;
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
  `;
    }}
`;
