import api from './api';

export async function getCommonQuestions(
	userId: number | undefined,
	productId: number
) {
	const { data } = await api.get(`/user/${userId}/zohoDesk`, {
		params: {
			productId,
			perPage: 15
		}
	});

	return data;
}
