import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
`;

export const ContainerImage = styled.View`
`;

export const ContainerHeader = styled.View`
  position: absolute;
  top: 4%;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${RFValue(16)}px;
`;

export const ButtonPerfil = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ImageHeaderHome = styled.Image`
`;

export const ContainerSchoolKuba = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 0 ${RFValue(16)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const ImageSchoolKuba = styled.Image`
  width: 100%;
  border-radius: ${RFValue(8)}px;
`;

export const Title = styled.Text`
  position: absolute;
  left: ${RFValue(16)}px;
  top: ${RFValue(140)}px;

  font-weight: 300;
  font-size:  ${RFValue(16)}px;
  color: ${({ theme }) => theme.COLORS.white_100};
`;

export const SubTitle = styled.Text`
  position: absolute;
  left: ${RFValue(16)}px;
  top: ${RFValue(170)}px;

  font-size:  ${RFValue(16)}px;
  color: ${({ theme }) => theme.COLORS.white_100};
`;

export const TitleSecondary = styled.Text`
  position: absolute;
  top: 15%;
  font-size:  ${RFValue(16)}px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.COLORS.white_100};
  letter-spacing:${RFValue(8)}px;
`;

export const SubTitleSecondary = styled.Text`
  position: absolute;
  top: 50%;
  font-size: ${RFValue(16)}px;
  font-weight: 300;
  color: ${({ theme }) => theme.COLORS.white_100};
`;

export const ContainerCarousel = styled.View`
  width: 100%;
`;

export const ContainerCard = styled.View`
  margin-top: 40px;
  margin-left: 4px;
  width: 100%; 
  height: 189px;
`;

export const TitleCarousel = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.COLORS.gray_100};
  padding-left: 16px;
  margin: ${RFValue(8)}px;
  margin-bottom: ${RFValue(16)}px;
`;

export const ContainerModal = styled.View`  
  display: flex;
  align-self: flex-end;
  flex-direction: column;
  justify-content: flex-end;

  
  width: 100%;
  height: 75%;
  bottom: -25%;
  
  padding: ${RFValue(16)}px ${RFValue(16)}px;

  border-top-left-radius:  ${RFValue(16)}px;
  border-top-right-radius:  ${RFValue(16)}px;

  background:  ${({ theme }) => theme.COLORS.white_100};
`;

export const ImageModalContainer = styled.View`
  width: 100%;
  align-items: center;
`

export const IconClose = styled.View` 
  align-items: flex-end;
`;

export const TitleModal = styled.Text`  
  font-size:  ${RFValue(24)}px;
  text-transform: uppercase;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.black};
  margin-top: ${RFValue(24)}px;
`;

export const SubTitleModal = styled.Text` 
  font-size:  ${RFValue(18)}px;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.gray_100};
  margin-top: ${RFValue(8)}px;
  margin-bottom: 16px;
`;

export const ButtonModal = styled.Pressable`
  height: ${RFValue(128)}px;
`;