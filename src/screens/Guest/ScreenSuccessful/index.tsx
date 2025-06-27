import React, { useState } from 'react';

import { Button } from '@components/Button';
import { Puppet } from '../../../assets/images';
import { Container, Image, TextConfirmed } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';
import { ISignInCredentials } from '@models/auth';

export function ScreenSuccessful() {
  const route = useRoute();
  const {dataUser} = route.params as any;
  const navigation = useNavigation();

  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  //task add react query
 async function finish(){
    try {
      setLoading(true);

      const formData = {
        email:dataUser.email,
        password:dataUser.password,
      } as  ISignInCredentials;
      await signIn(formData);
    await  navigation.navigate('Home',{modalActive:true});
    } catch (err:any){
      console.log('error',err.response.data.message);
     // navigation.navigate('SignIn')
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Image source={Puppet} />
      <TextConfirmed>{'CADASTRO REALIZADO\n COM SUCESSO!'}</TextConfirmed>
      <Button title="Finalizar" onPress={()=> finish()} activeLoad={loading}/>
    </Container>
  );
}
