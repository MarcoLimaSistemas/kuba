import Text from '@components/Text';
import * as S from './styles';
import { TouchableOpacity, View } from 'react-native';
import { Icons } from '@assets/icons';
import { scale } from 'react-native-size-matters';
import { Spacer } from '@components/Spacer';
import Toast from 'react-native-toast-message';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';

import { typography } from '../../../styles/typography';
import { useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPresetsOwn } from '@services/preset';
import { useAuth } from '@hooks/auth';
import { IFrequenciesListProps } from '..';

import { IFrequency } from '@screens/Client/Device';
import { IEqualizerConfig, IPreset } from '@models/preset';
import { useValuesEqualizer } from '@hooks/useValuesEqualizer';

export interface IMyPresets {
  label: string;
  value:number;
  isPublic: boolean,
  genreId: number,
  description: string,
  preamp:number;
  equalizerConfigs: IEqualizerConfig[]
} 

interface EqualizerProps {
  handlePreset:(preset:IMyPresets) => void;
	handleFrequencies: (frequencies: IFrequency[]) => void;
	handleModalEdit: (isEdit: boolean) => void;
	onOpen(): void;
	disabled?: boolean;
	frequenciesList?: IFrequenciesListProps[];
}


export function HeaderEqualizer({
	handleModalEdit,
  handlePreset,
	handleFrequencies,
	onOpen,
	disabled = false,
	frequenciesList,
}: EqualizerProps){
  const [openDropdown, setOpenDropdown] = useState(false);
	const [currentPreset, setCurrentPreset] = useState<ValueType | null>(null);

  const { user } = useAuth();
const {
  setSelectedOptionBand,
  setFrequency,
  setGain,
  setQuality
} = useValuesEqualizer();
	const { data, isLoading, isFetched } = useInfiniteQuery({
		queryKey: ['MyPresets'],
		queryFn: ({ pageParam }) =>
			getPresetsOwn(user?.id, undefined, pageParam, true, 15),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    }
	});

	const myPresets = useMemo(() => {
		return (
			data?.pages
				.flatMap(page => page.data)
				.map(preset => ({
					label: preset.name,
					value: preset.id,
          id:preset.id,
					is_public: preset.is_public,
          genre_id: preset.genre_id,
					description: preset.description,
          preamp:preset.preamp,
					equalizerConfigs: preset.equalizerConfigs
				})) ?? []
		);

	}, [data]);

function handleSelectPreset(preset: IMyPresets){
  handlePreset(preset)
  setFrequency(preset.equalizerConfigs[0].frequency)
  setGain(preset.equalizerConfigs[0].decibel_quantity)
  setQuality(preset.equalizerConfigs[0].quality)
  setSelectedOptionBand(String(preset.preamp) ?? null)
 
}
  return(
    <>
    <S.Header>
    <Text variant="bold" color="#656565">
      Equalizador
    </Text>

    <View
      style={{
        flexDirection: 'row'
      }}>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
           onOpen();
           handleModalEdit(false);
        }}>
        <Icons.Plus
          width={scale(32)}
          height={scale(32)}
          color={disabled ? '#d7d7d7' : '#6E6E6E'}
          
        />
      </TouchableOpacity>

      <Spacer w={16} />

      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          if (currentPreset) {
            onOpen();
            handleModalEdit(true);
          } else {
            Toast.show({
              type: 'info',
              text1: 'Selecione um preset!'
            });
          }
        }}>
        <Icons.Pencil
          width={scale(32)}
          height={scale(32)}
        color={disabled ? '#d7d7d7' : '#6E6E6E'}
       
        />
      </TouchableOpacity>
    </View>
  </S.Header>

  <S.ContainerDropdown>
    <DropDownPicker
      open={openDropdown}
      value={currentPreset}
      items={myPresets}
      loading={isLoading}
      setOpen={setOpenDropdown}
      setValue={setCurrentPreset}
      placeholder='Selecione preset'
      onSelectItem={(item: any) =>
       {
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
        fontSize: scale(16)
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
  </S.ContainerDropdown>
  </>
  )
}