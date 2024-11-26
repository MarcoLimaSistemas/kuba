import * as Yup from 'yup';

export const ChangePasswordSchema = Yup.object().shape({
	currentPassword: Yup.string()
		.min(8, v => `A senha deve conter no mínimo ${v.min} caracteres`)
		.required('Senha é um campo obrigatório'),
	newPassword: Yup.string()
		.min(8, v => `A senha deve conter no mínimo ${v.min} caracteres`)
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
	confirmationPassword: Yup.string()
		.required('Senha é um campo obrigatório')
		.oneOf([Yup.ref('newPassword')], 'As senhas devem corresponder')
});

export const ChangePasswordAndToken = Yup.object().shape({
	token: Yup.string()
		.min(4, v => `O token deve conter no mínimo ${v.min} caracteres`)
		.required('Token é um campo obrigatório'),
	password: Yup.string()
		.min(8, v => `A senha deve conter no mínimo ${v.min} caracteres`)
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
		.oneOf([Yup.ref('password')], 'As senhas devem corresponder')
});
