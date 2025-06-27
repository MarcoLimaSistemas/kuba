import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';


export const Wrapper = styled(SafeAreaView)`
flex: 1;
padding-top: ${scale(16)}px;
`;

export const Container = styled.View`
padding-top: ${scale(24)}px;

`;

export const ContainerBody = styled.View`
padding: 0 16px;
`;

export const Title = styled.Text`
font-size: ${RFValue(16)}px;
text-align: center;
color: ${({ theme }) => theme.COLORS.black};
letter-spacing:${RFValue(8)}px;
text-transform: uppercase;
margin-bottom: ${RFValue(42)}px;
font-weight: 700;
`;
