import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

type InputProps = {
  isFocused: boolean;
  isErrored: boolean;
  showPasswordIconVisibility?: boolean;
};

export const Container = styled.View`
flex: 1;
margin-bottom: ${RFValue(16)}px;
`;

export const ContainerInput = styled.TextInput<InputProps>`
min-height: ${RFValue(56)}px;
max-height: ${RFValue(56)}px;

background-color: ${({ theme }) => theme.COLORS.white_100};
color: ${({ theme }) => theme.COLORS.black};
font-size: ${RFValue(16)}px;
border: 2px solid ${({ theme }) => theme.COLORS.black};
border-radius: 8px;
padding: ${RFValue(16)}px;


${({ isFocused }) =>
    isFocused &&
    css`
border-color:${props => props.theme.COLORS.white_100} ;
color: ${(props) => props.theme.COLORS.gray_100};
`}

${({ isErrored }) =>
    isErrored &&
    css`
border-color: ${(props) => props.theme.COLORS.red_900};
color:${(props) => props.theme.COLORS.red_900};
`}
${({ showPasswordIconVisibility }) =>
    showPasswordIconVisibility
      ? css`

justify-content: space-between;
flex-direction: row;
align-items: center;

`
      : css`
justify-content: flex-start;
align-items: flex-start;
`};
`;

export const TextInput = styled.Text`
color:${({ theme }) => theme.COLORS.black} ;
font-size: ${RFValue(16)}px;
`;

export const Error = styled.Text`
color: ${(props) => props.theme.COLORS.red_900};
font-size: 12px;
padding: 5px;
`;
