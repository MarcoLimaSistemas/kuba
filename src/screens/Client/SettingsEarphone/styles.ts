import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
display: flex;
flex: 1;
`;

interface BoxProps {
  pt?: number
  pb?: number
  pl?: number
  pr?: number
  mt?: number
  mb?: number
  ml?: number
  mr?: number

  alignItems?: string;
  justifyContent?: string;
  direction?: string;
}

export const Content = styled.View`
flex: 1;
justify-content: space-between;
`;

export const Box = styled.View<BoxProps>`
gap: ${RFValue(12)}px;
padding-left: ${({ pl }) => pl ? RFValue(pl) : RFValue(16)};
padding-right: ${({ pr }) => pr ? RFValue(pr) : RFValue(16)};
padding-top: ${({ pt }) => pt ? RFValue(pt) : RFValue(0)};
padding-bottom: ${({ pb }) => pb ? RFValue(pb) : RFValue(0)};

margin-left: ${({ ml }) => ml ? RFValue(ml) : RFValue(0)};
margin-right: ${({ mr }) => mr ? RFValue(mr) : RFValue(0)};
margin-top: ${({ mt }) => mt ? RFValue(mt) : RFValue(0)};
margin-bottom: ${({ mb }) => mb ? RFValue(mb) : RFValue(0)};

align-items: ${({ alignItems }) => alignItems ? alignItems : 'center'};
justify-content: ${({ justifyContent }) => justifyContent ? justifyContent : 'center'};
flex-direction: ${({ direction }) => direction ? direction : 'row'}
`;

export const Title = styled.Text`
flex: 1;
color: ${({ theme }) => theme.COLORS.black};
text-align: center;

font-weight: 600;
font-size: ${RFValue(24)}px;
line-height: ${RFValue(28)}px;
`;

export const Label = styled.Text`
color: ${({ theme }) => theme.COLORS.black};

font-weight: 600;
font-size: ${RFValue(18)}px;
`;

export const Option = styled.Text`
color: ${({ theme }) => theme.COLORS.gray_100};

font-weight: 600;
font-size: ${RFValue(18)}px;
`;

