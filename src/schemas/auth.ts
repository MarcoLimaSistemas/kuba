import * as Yup from 'yup';

export const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email(`O campo deve conter um e-mail válido`)
    .required(`E-mail é um campo obrigatório`),
  password: Yup.string()
    .min(6, (v) => `A senha deve conter no mínimo ${v.min} caracteres`)
    .required(`Senha é um campo obrigatório`),
});