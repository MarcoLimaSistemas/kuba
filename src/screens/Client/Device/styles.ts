import LinearGradient from 'react-native-linear-gradient'
import {RFValue} from 'react-native-responsive-fontsize'
import {scale} from 'react-native-size-matters'
import {typography} from '../../../styles/typography'
import styled from 'styled-components/native'

export const Container = styled.ScrollView`
    flex: 1;
    background: #f4f2f2;
`

export const ImageDevice = styled.Image`
    margin-left: auto;
    margin-right: auto;
`

export const Range = styled.View`
    margin-top: ${RFValue(100)}px;
    margin-bottom: ${RFValue(150)}px;
    border: 1px solid red;
    transform: rotate(90deg);
`

export const NameDevice = styled.Text`
    font-size: ${RFValue(16)}px;
    text-align: center;
    color: ${({theme}) => theme.COLORS.gray_100};
    letter-spacing: ${RFValue(8)}px;
    text-transform: uppercase;
    margin-bottom: ${RFValue(16)}px;
    font-family: ${typography['Lato-Bold'].fontFamily};
`

export const ContainerCarousel = styled.View`
    background: #fff;
    margin-left: ${scale(16)}px;
    margin-right: ${scale(16)}px;
    padding: ${scale(8)}px;
    border-radius: 8px;
`

export const BoxButtons = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

export const Footer = styled.View`
    padding: ${RFValue(16)}px;
    margin-top: ${RFValue(32)}px;
`

export const ContainerConnections = styled.View`
    background: #fff;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding: ${scale(8)}px;
    border-radius: 8px;
    margin-left: ${scale(16)}px;
    margin-right: ${scale(16)}px;
    margin-bottom: 16px;
`

export const HFlex = styled.View`
    direction: row;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

export const TextStatus = styled.Text`
    font-size: ${RFValue(12)}px;
    text-transform: uppercase;
    color: #777777;
    font-family: ${typography['Lato-Bold'].fontFamily};
`

export const Percentage = styled.Text`
    font-size: ${RFValue(16)}px;
    margin-left: ${RFValue(8)}px;
    color: ${({theme}) => theme.COLORS.black};
`

export const Disconnected = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({theme}) => theme.COLORS.blue_100};
    font-family: ${typography['Lato-Bold'].fontFamily};
    text-transform: capitalize;
`

export const ContainerModal = styled.View`
    display: flex;
    align-self: flex-end;
    flex-direction: column;
    justify-content: space-between;

    width: 100%;
    height: 75%;
    bottom: -25%;

    padding: ${RFValue(16)}px ${RFValue(16)}px;

    border-top-left-radius: ${RFValue(16)}px;
    border-top-right-radius: ${RFValue(16)}px;

    background: ${({theme}) => theme.COLORS.white_100};
`

export const HeaderModal = styled.View`
    flex-direction: row;
`
export const FooterModal = styled.View``

export const TitleModal = styled.Text`
    flex: 1;
    text-align: center;
    text-transform: uppercase;
    align-items: center;
    color: ${({theme}) => theme.COLORS.black};
`

export const DeviceModal = styled.TouchableOpacity`
    margin-top: ${RFValue(8)};
    padding: ${RFValue(8)}px;
`

export const DeviceTitle = styled.Text`
    font-size: ${scale(12)}px;
    color: ${({theme}) => theme.COLORS.black};
`

export const BgLinearGradient = styled(LinearGradient)`
    flex: 1;
`
