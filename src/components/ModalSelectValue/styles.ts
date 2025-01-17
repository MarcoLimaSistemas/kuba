import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import theme from '../../styles/theme';


export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${scale(20)}px;

`;


export const ValueContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 20px;
`;

export const Button = styled.TouchableOpacity`
  width: ${scale(42)}px;
  height: ${scale(42)}px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
 // border-color: ${theme.COLORS.gold_80};
  background-color: ${theme.COLORS.black};
  border-radius: 25px;
`;


export const ValueText = styled.Text`
  font-size: ${scale(20)}px;;
  font-weight: bold;
  margin: 0 20px;
`;

export const ActionsContainer = styled.View`
  margin-top: ${scale(16)}px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const ActionButton = styled.TouchableOpacity<{ isPrimary?: boolean }>`
  flex: 1;
  padding: 10px;
  margin: 0 5px;
  align-items: center;
  justify-content: center;
  background-color: ${(props, ) => (props.isPrimary ? theme.COLORS.gold_500 :  theme.COLORS.white_200)};
  border-radius: 5px;

`;
export const Input = styled.TextInput`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 0 20px;
  border-bottom-width: 1px;
  border-color: #ccc;
  width: 80px;
`;

