import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 ${RFValue(16)}px;
  margin-top: ${RFValue(16)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const ContainerInput = styled.TextInput.attrs({
  placeholderTextColor: "#fff"
}) <any>`
  flex: 1;
  height: ${RFValue(56)}px;
  border: 2px solid  ${({ theme }) => theme.COLORS.white_100};
  border-radius: 8px;
  color: ${({ theme }) => theme.COLORS.white_100};
  margin-right: ${RFValue(8)}px;
  padding: ${RFValue(16)}px;
`;

export const ButtonSearch = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${RFValue(56)}px;
  height: ${RFValue(56)}px;
  background-color: ${({ theme }) => theme.COLORS.white_100};
  border-radius: 8px;
`;
