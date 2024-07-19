import React, {useState} from 'react'

import {KubaFone} from '@assets/images'
import {Button} from '@components/Button'
import {CarouselProfile} from '@components/CarouselProfile'
import {Navbar} from '@components/Navbar'
import {useNavigation} from '@react-navigation/native'

import {Close, Headset, Info, Lighting} from '@assets/icons'

import {
    BoxButtons,
    Container,
    ContainerCarousel,
    ContainerConnections,
    ContainerModal,
    DeviceModal,
    DeviceTitle,
    Disconnected,
    Footer,
    FooterModal,
    HeaderModal,
    HFlex,
    ImageDevice,
    NameDevice,
    Percentage,
    TextStatus,
    TitleModal
} from './styles'

import {
    ActivityIndicator,
    Image,
    Modal,
    NativeModules,
    Pressable,
    ScrollView,
    TouchableOpacity,
    View
} from 'react-native'
import {ButtonSquare} from '@components/ButtonSquare'

import {Spacer} from '@components/Spacer'
import {Equalizer} from '@components/Equalizer'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Text from '@components/Text'
import {useBluetooth} from '../../../context/BluetoothContext'
import theme from '../../../styles/theme'

const dataExample = [
    {
        id: 1,
        name: 'Cliolo'
    },
    {
        id: 2,
        name: 'Cliolo'
    },
    {
        id: 3,
        name: 'Cliolo'
    },
    {
        id: 4,
        name: 'Cliolo'
    }
]

export function Device({route}: any) {
    const [scrollEnabled, setScrollEnabled] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const {top} = useSafeAreaInsets()

    const navigation = useNavigation()

    const {
        searchingDevices,
        devices,
        connectedDevice,
        scanDevices,
        pairToDevice
    } = useBluetooth()

    async function handlePermissions() {
        setModalVisible(true)
        scanDevices()
    }

    async function handleCloseModal() {}

    const handleScrollEnabled = (enabled: boolean) => {
        setScrollEnabled(enabled)
    }

    return (
        <>
            <Container
                style={{
                    paddingTop: top
                }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={scrollEnabled}>
                <Navbar />

                <ImageDevice source={KubaFone} />
                <NameDevice>{'Kuba disco'}</NameDevice>

                <ContainerConnections>
                    {connectedDevice !== null ? (
                        <>
                            <TextStatus>Conectado</TextStatus>
                            <HFlex>
                                <Image source={Lighting} />
                                <Percentage>{'100%'}</Percentage>
                            </HFlex>
                            <TouchableOpacity onPress={handlePermissions}>
                                <Disconnected>{'Desconectar'}</Disconnected>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TextStatus>Desconectado</TextStatus>

                            <TouchableOpacity onPress={handlePermissions}>
                                <Disconnected>Conectar</Disconnected>
                            </TouchableOpacity>
                        </>
                    )}
                </ContainerConnections>

                {/* <BoxButtons>
                    <Button
                        title="Equalizador"
                        onPress={() =>
                            NativeModules.EqualizerModule.navigateToEqualizer()
                        }
                    />
                </BoxButtons> */}

                <ContainerCarousel>
                    <Equalizer handleScrollEnabled={handleScrollEnabled} />

                    <CarouselProfile
                        titleProfile={'Perfis Personalizados'}
                        data={dataExample}
                    />
                    <CarouselProfile
                        titleProfile={'Perfis Públicos '}
                        data={dataExample}
                    />
                </ContainerCarousel>

                <Spacer h={32} />

                <BoxButtons
                    style={{
                        paddingHorizontal: 16
                    }}>
                    <ButtonSquare
                        label="Suporte"
                        onPress={() => navigation.navigate('Support')}>
                        <Image
                            source={Headset}
                            style={{
                                width: 32,
                                height: 32
                            }}
                            resizeMode="contain"
                        />
                    </ButtonSquare>

                    <ButtonSquare
                        label="Tutorias de uso"
                        onPress={() => navigation.navigate('Tutorials')}>
                        <Image
                            source={Info}
                            style={{
                                width: 32,
                                height: 32
                            }}
                            resizeMode="contain"
                        />
                    </ButtonSquare>
                </BoxButtons>

                <Footer>
                    <Button
                        title="Voltar"
                        onPress={() => navigation.goBack()}
                    />
                </Footer>
                <Spacer h={32} />
            </Container>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}>
                <ContainerModal>
                    <HeaderModal>
                        <TitleModal>Dispositivos encontrados</TitleModal>
                        <Pressable onPress={handleCloseModal}>
                            <Image source={Close} />
                        </Pressable>
                    </HeaderModal>

                    {searchingDevices ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <ActivityIndicator color={theme.COLORS.gold_100} />
                        </View>
                    ) : (
                        <ScrollView style={{flex: 1}}>
                            {devices.map(device => (
                                <DeviceModal key={device.id}>
                                    <DeviceTitle
                                        onPress={() => pairToDevice(device)}>
                                        <Text variant="bold" fontSize={12}>
                                            Dispositivo:{' '}
                                        </Text>
                                        {device.name ?? device.id}
                                    </DeviceTitle>
                                </DeviceModal>
                            ))}
                        </ScrollView>
                    )}

                    <FooterModal>
                        {/* {onStopSearch ? ( */}
                        <Button
                            title="Fechar"
                            onPress={() => setModalVisible(false)}
                        />
                        {/* ) : (
                            <Button
                                title="Parar busca"
                                onPress={() => handleCancelSearchDevices()}
                            />
                        )} */}
                    </FooterModal>
                </ContainerModal>
            </Modal>
        </>
    )
}
