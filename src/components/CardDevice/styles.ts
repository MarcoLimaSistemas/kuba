import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';
const { width } = Dimensions.get('window');

interface PropsPage {
  active?: boolean;
  opacityIconImage?: boolean;
}

export const Container = styled.TouchableOpacity`
  width: ${RFValue(156)}px;
  max-height: ${RFValue(186)}px;
  padding: ${RFValue(8)}px;
  border-radius: ${RFValue(8)}px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  margin-left: ${RFValue(16)}px;
  margin-right: ${RFValue(8)}px;
`
export const Image = styled.Image<PropsPage> `
${({ active }) =>
    active
      ? css`border-radius: 5px;`
      : css`
            border-top-left-radius: 8px;
            border-top-right-radius: 8px; 
        `
  };
`
export const ContainerImage = styled.View`
display: flex;
justify-content: center;
align-items: center;
height: 150px;

`
export const Box = styled.View`
justify-content: center;
align-items: center;
padding: 5px;

`;
export const TitleCard = styled.Text`
font-size: ${RFValue(14)}px;
text-align: center;
color:${({ theme }) => theme.COLORS.gray_100};
`