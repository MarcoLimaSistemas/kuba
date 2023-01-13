import * as Yup from 'yup';

export const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, (v) => `A senha deve conter no mínimo ${v.min} caracteres`)
    .required('Senha é um campo obrigatório'),
  newPassword: Yup.string()
    .min(6, (v) => `A senha deve conter no mínimo ${v.min} caracteres`)
    .required('Senha é um campo obrigatório'),
  confirmationPassword: Yup.string()
    .required('Senha é um campo obrigatório')
    .oneOf([Yup.ref('password')], 'As senhas devem corresponder'),
})