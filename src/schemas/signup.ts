import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Nome é um campo obrigatório'),
  email: Yup.string()
    .email('O campo deve conter um e-mail válido')
    .required('E-mail é um campo obrigatório'),
  birthDate: Yup.string().required('Data de nascimento é um campo obrigatório'),
  password: Yup.string()
    .min(8, (v) => `A senha deve conter no mínimo ${v.min} caracteres`)
    .matches(
      /^(?=.*\d)/,
      'A senha deve conter pelo menos um número.'
    )
    .matches(
      /^(?=.*[a-z])/,
      'A senha deve conter pelo menos uma letra minúscula.'
    )
    .matches(
      /^(?=.*[A-Z])/,
      'A senha deve conter pelo menos uma letra maiúscula.'
    )
    .matches(
      /^(?=.*[a-zA-Z])/,
      'A senha deve conter letras.'
    )
    .required('Senha é um campo obrigatório'),
  passwordConfirmation: Yup.string()
    .required('Senha é um campo obrigatório')
    .oneOf([Yup.ref('password')], 'As senhas devem corresponder'),
});
