import { Image } from 'react-native';
import * as S from './styles';
import { KubaFoneDiscoHome, logoWhite } from '@assets/images';
import Text from '@components/Text';
import { useNavigation } from '@react-navigation/native';


export function HomeScreen() {
  const { navigate } = useNavigation<any>();
  return (
    <S.Container>
      <S.Wrapper
        from={{
          translateY: -128,
          opacity: 0.5,
        }}
        animate={{
          translateY: 0,
          opacity: 1,
        }}
      >
        <Image source={logoWhite} />
        <Image
          style={{
            marginVertical: 40
          }}
          source={KubaFoneDiscoHome}
        />
        <S.Button onPress={() => navigate("Device")} style={{
          shadowOffset: {
            height: 2,
            width: 0
          },
        }}>
          <Text variant='bold' fontSize={14} color='#000' >Conectar</Text>
        </S.Button>
      </S.Wrapper>
    </S.Container>
  )
}