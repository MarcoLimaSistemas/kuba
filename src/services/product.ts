import api from './api';

export async function getProducts(userId: number | undefined) {
	return (await api.get(`/user/${userId}/product`)).data.data;
}

export async function getProductDetails(
	userId: number | undefined,
	productId: number
) {
	return (await api.get(`/user/${userId}/product/${productId}`)).data;
}
