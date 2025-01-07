import { Image } from 'react-native';
import * as S from './styles';
import { KubaFoneDiscoHome, logoWhite } from '@assets/images';
import Text from '@components/Text';
import { useNavigation } from '@react-navigation/native';
import { STORAGE_INITIAL_PRESETS, STORAGE_PRESET } from '@config/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPresets } from '@models/preset';
import { dataInitial } from './initialDate';


export function HomeScreen() {
  const { navigate } = useNavigation<any>();
 

  const handleConnection = async () => {
    const isFirstLogin = await AsyncStorage.getItem(STORAGE_INITIAL_PRESETS);
    if (isFirstLogin === null) {
      await AsyncStorage.setItem(STORAGE_INITIAL_PRESETS, "INITIAL")
      await AsyncStorage.setItem(STORAGE_PRESET, JSON.stringify(dataInitial))
      navigate("Device")
      return
    }

    return navigate("Device")

  }

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
        <S.Button onPress={handleConnection}
          style={{
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