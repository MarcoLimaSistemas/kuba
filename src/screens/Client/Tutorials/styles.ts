import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.ScrollView`
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
}

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
`;

export const Title = styled.Text`
color: ${({ theme }) => theme.COLORS.gray_200};
text-align: center;
text-transform: uppercase;
font-size: ${RFValue(16)}px;
font-weight: 700;
letter-spacing: ${RFValue(8)}px;
line-height: ${RFValue(20)}px;
`

export const Subtitle = styled.Text`
color: ${({ theme }) => theme.COLORS.gray_100};
text-align: center;
font-size: ${RFValue(16)}px;
font-weight: 300;
font-style: italic;
line-height: ${RFValue(20)}px;
margin-top: ${RFValue(12)}px;
`;

export const Label = styled.Text`
color: ${({ theme }) => theme.COLORS.gray_100};
text-align: left;
font-weight: 700;
font-size: ${RFValue(20)}px;
line-height: ${RFValue(24)}px;

margin-bottom: ${RFValue(16)}px;
`;

export const Tutorial = styled.TouchableOpacity`
align-items: center;
justify-content: space-between;
flex-direction: row;

margin-top: ${RFValue(8)}px;
`;

export const TitleTutorial = styled.Text`
flex: 1;
background-color: ${({ theme }) => theme.COLORS.white_100};
color: ${({ theme }) => theme.COLORS.gray_100};
font-weight: 500;
font-size: ${RFValue(16)}px;

padding-left: ${RFValue(16)}px;
padding-top: ${RFValue(18)}px;
padding-bottom: ${RFValue(18)}px;

border-radius: ${RFValue(8)}px;
`;

export const Icon = styled.View`
background-color: ${({ theme }) => theme.COLORS.black};

width: ${RFValue(56)}px;
height: ${RFValue(56)}px;
border-radius: ${RFValue(8)}px;

margin-left: ${RFValue(12)}px;

align-items: center;
justify-content: center;
`;
