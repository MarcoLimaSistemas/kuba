import React from "react";

import * as S from "./styles";
import { Navbar } from "@components/Navbar";
import { InputUnMasked } from "@components/InputUnMasked";
import { useForm } from "react-hook-form";
import { Button } from "@components/Button";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Support (){
  const navigation = useNavigation()

  const {control} = useForm()

  return <S.Container>
          <Navbar />

          <S.ContainerBody
          contentContainerStyle={{flexGrow:1}}
          showsVerticalScrollIndicator={false}
          >
          <S.Title>SUPORTE</S.Title>

          <Text>
          Descreva seu problema com o máximo possível de detalhes
          para que nossa equipe possa ajudar.
          </Text>

          <InputUnMasked
            control={control}
            label='Componente'
            name=''
            placeholder='Qual componente está com problemas?'
            />
          
          <InputUnMasked
            control={control}
            label='Descrição do problema'
            name=''
            placeholder='Descreva o que está acontecendo.'
            />

            <View style={{flex:1}} />

            <Button title="Enviar" onPress={() => {}} />
            <Button title="DÚVIDAS FREQUENTES" onPress={() => {}} variant="secondary"/>
            <Button title="Voltar" onPress={() =>navigation.goBack()} />
          </S.ContainerBody>
        </S.Container>
}