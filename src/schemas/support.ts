import * as Yup from 'yup';

export const SupportSchema = Yup.object().shape({
	component: Yup.string().required('Campo obrigatório'),
	description: Yup.string().required('Campo obrigatório').max(500)
});

export type TSupportSchema = Yup.InferType<typeof SupportSchema>;
