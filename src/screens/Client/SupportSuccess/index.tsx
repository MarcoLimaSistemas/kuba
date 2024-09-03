import React from "react";
import { Image, ScrollView } from "react-native";
import { Container, TextSuccess } from "./styles";

import { useNavigation } from "@react-navigation/native";
import { Button } from "@components/Button";
import Text from "@components/Text";
import { supportSuccess } from "@assets/images";

export function SupportSuccess() {
  const navigation = useNavigation()
  return (
    <Container>
      <ScrollView>
      <Image source={supportSuccess} 
      style={{
              marginTop:46,
              width:365,
              height:341
            }}
          />

      {/* <Text
      variant="bold"
      fontSize={24}
      style={{
        textAlign:'center',
        textTransform:'uppercase',
        fontWeight:'600',
        marginTop:36,
        lineHeight:29,
        marginBottom:22
      }}
      >
      {`Suporte enviado \n com sucesso!`}
      </Text> */}
      <TextSuccess>{`Suporte enviado \n com sucesso!`}</TextSuccess>
      <Text
      variant="regular"
      style={{
        textAlign:'center',
      }}
      >
        {"Em breve retornaremos com uma possível"}
      </Text>
      <Text
      variant="regular"
      style={{
        textAlign:'center',
      }}
      >
        {"solução. Agradecemos pelo contato!"}
      </Text>
      <Button 
      title="Finalizar"
      style={{
        marginTop:57
      }}
      onPress={() => navigation.navigate('Home',{modalActive:false})} />
      <Text 
      variant="light"
      fontSize={14}
      color="#656565"
      style={{
        textAlign:'center',
        marginTop:30
      }}
      >
        {"*Cheque com frequência a sua caixa de spam!"}
      </Text>
      </ScrollView>
    </Container>
  )
}