import { Button } from '@components/Button';
import { Input } from '@components/Input';
import Ionicons from '@expo/vector-icons/Ionicons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/auth';
import { useNavigation } from '@react-navigation/native';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { ISignInCredentials } from 'src/models/auth';
import { logo } from '../../../assets/images';

import { SigninSchema } from '../../../schemas/auth';
import {
  Container,
  ContainerButton,
  ContainerLogo,
  ForgotPassword,
  ForgotPasswordButton,
  InputsContainer,
  Logo,
  TouchableIcon,
} from './styles';

interface SignInProps {
  children: ReactNode;
}

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignInCredentials>({ resolver: yupResolver(SigninSchema) });

  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(data: ISignInCredentials) {
    try {
      setLoading(true);
      console.warn(data);
      await signIn(data);
    } catch (error: any) {
      setLoading(false);
      // toast.error('Não foi possível realizar o login');
      throw new Error(error);
    }
  }
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ContainerLogo>
          <Logo source={logo} alt={'logo kuba'} />
        </ContainerLogo>

        <InputsContainer>
          <Input
            title="E-mail"
            placeholder="E-mail"
            control={control}
            keyboardType="email-address"
            isActivePassword={false}
            {...register('email')}
            errors={errors?.email}
          />
          <Input
            title="Senha"
            placeholder="Senha"
            control={control}
            secureTextEntry={!showPassword}
            {...register('password')}
            isActivePassword={true}
            showPasswordIconVisibility={true}
            icon={
              <TouchableIcon
                onPress={() => setShowPassword((prevState) => !prevState)}
              >
                <Ionicons
                  name={showPassword ? 'md-eye' : 'md-eye-off'}
                  size={24}
                  color="#00000099"
                />
              </TouchableIcon>
            }
            errors={errors.password}
          />
          <ForgotPasswordButton>
            <ForgotPassword>Esqueci minha senha?</ForgotPassword>
          </ForgotPasswordButton>
        </InputsContainer>
        <ContainerButton>
          <Button
            title="Entrar"
            variant="primary"
            activeLoad={loading}
            onPress={handleSubmit(handleLogin)}
          />

          <Button
            title="Criar Conta"
            variant="secondary"
            onPress={() => navigation.navigate('SignUp')}
          />
        </ContainerButton>
      </ScrollView>
    </Container>
  );
}
