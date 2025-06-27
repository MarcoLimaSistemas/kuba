import * as Yup from 'yup';

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('O campo deve conter um e-mail válido')
    .required('E-mail é um campo obrigatório'),
});
