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
import { getPresets } from '@services/preset';
import { useAuth } from '@hooks/auth';
import { IFrequenciesListProps } from '..';

import { IFrequency } from '@screens/Client/Device';
import { IPreset } from '@components/ModalPreset';
interface EqualizerProps {
	handleScrollEnabled: (enabled: boolean) => void;
	handlePreset: (preset: IPreset) => void;
	handleFrequencies: (frequencies: IFrequency[]) => void;
	handleModalEdit: (isEdit: boolean) => void;
	onOpen(): void;
	disabled?: boolean;
	frequenciesList?: IFrequenciesListProps[];
}

export function HeaderEqualizer({
	handleScrollEnabled,
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

	const { data, isLoading, isFetched } = useInfiniteQuery({
		queryKey: ['MyPresets'],
		queryFn: ({ pageParam }) =>
			getPresets(user?.id, undefined, pageParam, true, 15),
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
					isPublic: preset.is_public,
					genreId: preset.genre_id,
					description: preset.description,
					settings: preset.settings
				})) ?? []
		);

	}, [data]);


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
         handlePreset({
         	id: item.value,
         	name: item.label,
         	description: item.description,
         	genreId: item.genreId,
         	settings: item.settings,
         	isPublic: item.isPublic
         })
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