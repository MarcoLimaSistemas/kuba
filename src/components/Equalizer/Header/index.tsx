import Text from '@components/Text';
import * as S from './styles';
import { TouchableOpacity, View } from 'react-native';
import { Icons } from '@assets/icons';
import { scale } from 'react-native-size-matters';
import { Spacer } from '@components/Spacer';
import Toast from 'react-native-toast-message';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';

import { typography } from '../../../styles/typography';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPresetsOwn } from '@services/preset';
import { useAuth } from '@hooks/auth';
import { IFrequenciesListProps } from '..';

import { IEqualizerConfig, IPreset } from '@models/preset';
import { useValuesEqualizer } from '@hooks/useValuesEqualizer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_PRESET_ID } from '@config/storage';
import { useFocusEffect } from '@react-navigation/native';
import { getDataPresets } from '@services/internal-storage';
import Switch from '@components/Switch';
import { useSharedValue } from 'react-native-reanimated';
import { useBluetooth } from '../../../context/BluetoothContext';
import { BluetoothDevice } from 'react-native-bluetooth-classic';
import React from 'react';

export interface IMyPresets {
  label: string;
  value: number;
  isPublic: boolean,
  genreId: number,
  description: string,
  equalizerConfigs: IEqualizerConfig[]
}

interface EqualizerProps {
  handlePreset: (preset: IMyPresets) => void;
  handleScrollEnabled: (enabled: boolean) => void;
  handleModalEdit: (isEdit: boolean) => void;
  onOpen(): void;
  disabled?: boolean;
  presetCustom?: string;
  equalizerConfigs?: IEqualizerConfig[];
  connectToDevice: (device: BluetoothDevice) => void;
}


export function HeaderEqualizer({
  handleModalEdit,
  handlePreset,
  handleScrollEnabled,
  onOpen,
  disabled = false,
  presetCustom,
  equalizerConfigs,
  connectToDevice
}: EqualizerProps) {
  const [openDropdown, setOpenDropdown] = useState(false);

  const { state, setState } = useBluetooth();
  const connectedDevice = state.device ? state.device : null

  const {
    setSelectedOptionBand,
    setFrequency,
    setGain,
    setQuality,
    setCurrentPresetId,
    currentPresetId
  } = useValuesEqualizer();

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ['MyPresets'],
    queryFn: async () => await getDataPresets(),
    //enabled: isFetched
  });



  const myPresets = useMemo(() => {
    return (
      data?.map((preset) => ({
        label: preset.name,
        value: preset.id,
        id: preset.id,
        is_public: preset.isPublic,
        genre_id: preset.genreId,
        description: preset.description,
        equalizerConfigs: preset.equalizerConfigs
      })) ?? []
    );

  }, [data]);


  async function handleSelectPreset(preset: IMyPresets) {

    await AsyncStorage.setItem(STORAGE_PRESET_ID, JSON.stringify(preset));
    handlePreset(preset)
    setFrequency(String(preset.equalizerConfigs[0].frequency))
    setGain(String(preset.equalizerConfigs[0].decibel_quantity))
    setQuality(String(preset.equalizerConfigs[0].quality))
    setSelectedOptionBand(String(preset.equalizerConfigs[0].band) ?? null)

  }
  const [deviceConnection, setDeviceConnection] = useState(false)
  const statusConnection = useSharedValue(connectedDevice!==null?1:0);

  const handleSwitchConnection =async () => {
    statusConnection.value = statusConnection.value === 0 ? 1 : 0;

    if (statusConnection.value === 0) {
      if(connectedDevice !== null)
      connectToDevice(connectedDevice)
      setDeviceConnection(true);
      return
    }
    await state.device?.disconnect()
    setState({
      device: undefined,
      bluetoothEnabled: true,
    })
    setDeviceConnection(false);
    return 
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        if (presetCustom && presetCustom?.length > 0 && equalizerConfigs) {

          setFrequency(String(equalizerConfigs[0].frequency))
          setGain(String(equalizerConfigs[0].decibel_quantity))
          setQuality(String(equalizerConfigs[0].quality))
          setSelectedOptionBand(String(equalizerConfigs[0].band) ?? null)
          return
        }
        const preset = await AsyncStorage.getItem(STORAGE_PRESET_ID);

        if (preset !== null) {
          const presetData = JSON.parse(preset);

          setCurrentPresetId(presetData.id)
          handleSelectPreset(presetData)

        }
        return
      })();
    }, [])
  )


  return (
    <>
      <S.Header>
        <Text variant="bold" fontSize={14} color="#777777">
          EQUALIZADOR
        </Text>

        <View
          style={{
            flexDirection: 'row'
          }}>

          <Switch
            value={statusConnection}
            onPress={handleSwitchConnection}
          />

        </View>
      </S.Header>

      <S.ContainerDropdown>
        {presetCustom && presetCustom?.length > 0 ? (
          <Text
            variant='regular'
            fontSize={14}
            color='#656565'
            style={{
              textTransform: "uppercase",
              marginVertical: 24
            }}
          >{presetCustom}</Text>
        ) : (
          <DropDownPicker
            disabled={disabled}
            open={openDropdown}
            value={currentPresetId}
            items={myPresets}
            loading={isLoading}
            setOpen={setOpenDropdown}
            setValue={setCurrentPresetId}
            placeholder='Selecione preset'
            translation={{
              NOTHING_TO_SHOW: "Nenhum preset adicionado!"
            }}
            onSelectItem={(item: any) => {
              handleSelectPreset(item)
            }
            }
            //setItems={setPresets}
            selectedItemContainerStyle={{
              backgroundColor: '#e4e1e1'
            }}
            showTickIcon={false}
            textStyle={{
              color: '#656565',
              fontFamily: typography['Lato-Regular'].fontFamily,
              fontSize: scale(14)
            }}
            listItemLabelStyle={{
              fontFamily: typography['Lato-Regular'].fontFamily,
              color: '#656565'
            }}
            labelProps={{
              numberOfLines: 1
            }}
            style={{
              borderColor: 'transparent',
              paddingLeft: 0,
              width: '41%'
            }}
            dropDownContainerStyle={{
              borderColor: 'transparent',
              width: '60%',
              elevation: 4,
              borderRadius: 0
            }}
            flatListProps={{
              ItemSeparatorComponent: () => <S.LineSeparator />
            }}
          />
        )}

      </S.ContainerDropdown>
    </>
  )
}