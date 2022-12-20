import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
flex-direction: row;
justify-content: space-between;
padding: 16px;
margin-bottom: 16px;
`;

export const Title = styled.Text`
font-size: ${RFValue(20)}px;
color: ${({ theme }) => theme.COLORS.gray_100};
`;

export const BoxIcons = styled.View`
flex-direction: row;
`;

export const Icon = styled(MaterialIcons)`
font-size: ${RFValue(30)}px;
padding-left: 24px;
color: ${({ theme }) => theme.COLORS.gray_100};
`;
