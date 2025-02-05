

import { Modalize } from "react-native-modalize";
import * as S from "./styles"
import { useEffect, useRef, useState } from "react";
import Text from "@components/Text";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { scale } from "react-native-size-matters";
import { useValuesEqualizer } from "@hooks/useValuesEqualizer";


interface ModalSelectValueProps {

  isVisible: boolean;
  onSave: (value: number) => void;
  onCancel: () => void;

}


export function ModalSelectValue({ isVisible, onCancel, onSave }: ModalSelectValueProps) {
  const modalRef = useRef<Modalize>(null);
  const { selectedBand } = useValuesEqualizer();

  const initialValue = Number(selectedBand?.value) ?? 0

  const maxValue = selectedBand?.type === 'gain' ? 10 : 8
  const minValue = selectedBand?.type === 'quality' ? 0.25 : -10

  const [isEditing, setIsEditing] = useState(false);

  const [value, setValue] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>(String(initialValue));


  const handleIncrement = () => {
    setValue((prev) => Math.min(prev + 0.1, maxValue));
  };

  const handleDecrement = () => {
    setValue((prev) =>
      Math.max(prev - 0.1, minValue)
    );
  };

  const handleSave = () => {
    onSave(value);
    setValue(initialValue)
    modalRef.current?.close();
  };

  const handleCancel = () => {
    onCancel();
    setValue(initialValue)
    modalRef.current?.close();
  };

  const handleInputBlur = () => {
    const newValue = parseFloat(inputValue);
    if (!isNaN(newValue) && newValue >= minValue && newValue <= maxValue) {
      setValue(newValue);
    }
    setIsEditing(false);
  };

  const handleInputChange = (text: string) => {
    const formattedText = text.replace(/[^0-9.-]/g, "");
    setInputValue(formattedText);
  };

  useEffect(() => {
    if (isVisible) {
      modalRef.current?.open();
    } else {
      modalRef.current?.close();
    }
  }, [isVisible]);

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue)
      setInputValue(String(initialValue))
    }
  }, [initialValue]);

  return (
    <Modalize
      ref={modalRef}
      adjustToContentHeight
      withHandle={false}
      scrollViewProps={{
        showsVerticalScrollIndicator: false
      }}
      modalStyle={{
        paddingHorizontal: scale(16)
      }}

      onClosed={onCancel}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


        <S.Container>
          <Text variant='bold' fontSize={16} color='#242424' >Setar Valor</Text>
          <S.ValueContainer>
            <S.Button onPress={handleDecrement}>
              <Text variant='bold' fontSize={24} color='#D4BD85' >-</Text>
            </S.Button>
            {isEditing ? (
              <S.Input
                value={inputValue}
                onChangeText={handleInputChange}
                onBlur={handleInputBlur}
                keyboardType="numeric"
                autoFocus
                maxLength={5}
              />
            ) : (
              <S.ValueText onPress={() => setIsEditing(true)}>

                {selectedBand?.type === 'quality' ? value.toFixed(2) : value.toFixed(1)}
              </S.ValueText>
            )}
            <S.Button onPress={handleIncrement}>
              <Text variant='bold' fontSize={24} color='#D4BD85'>+</Text>
            </S.Button>
          </S.ValueContainer>
          <S.ActionsContainer>

            <S.ActionButton onPress={handleCancel}>
              <Text variant='bold' fontSize={14} color='#777777' >Cancelar</Text>

            </S.ActionButton>
            <S.ActionButton onPress={handleSave} isPrimary>
              <Text variant='bold' fontSize={14} color='#242424' >Salvar</Text>
            </S.ActionButton>
          </S.ActionsContainer>
        </S.Container>
      </TouchableWithoutFeedback>
    </Modalize>
  );
}
