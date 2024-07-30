import * as Yup from 'yup';

export const EditProfileSchema = Yup.object().shape({
	name: Yup.string().required('Nome é um campo obrigatório'),
	description: Yup.string(),
	birthDate: Yup.string().required(
		'Data de nascimento é um campo obrigatório'
	),
	facebook: Yup.string(),
	instagram: Yup.string(),
	spotify: Yup.string(),
	qobuzz: Yup.string()
});
