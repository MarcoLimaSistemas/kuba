

import { Modalize } from "react-native-modalize";
import * as S from "./styles"
import { useEffect, useRef, useState } from "react";
import Text from "@components/Text";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { Button } from "@components/Button";


interface ModalSelectValueProps {
  initialValue: number;
  minValue: number;
  maxValue: number;
  isVisible: boolean;
  onSave: (value: number) => void;
  onCancel: () => void;
}


export function ModalSelectValue({ initialValue, minValue, maxValue, isVisible, onCancel, onSave }: ModalSelectValueProps) {
  const modalRef = useRef<Modalize>(null);
  const [value, setValue] = useState<number>(initialValue);

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState<string>(initialValue.toFixed(1));

  const insets = useSafeAreaInsets();
  //  console.log("initialValue",initialValue,inputValue)
  //  console.log("value",value)
  useEffect(() => {
    if (isVisible) {
      modalRef.current?.open();
    } else {
      modalRef.current?.close();
    }
  }, [isVisible]);

  const handleIncrement = () => {
    setValue((prev) => Math.min(prev + 0.1, maxValue));
  };

  const handleDecrement = () => {
    setValue((prev) => Math.max(prev - 0.1, minValue));
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
                {value.toFixed(1)}
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
