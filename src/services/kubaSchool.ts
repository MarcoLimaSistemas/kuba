import api from './api';

export const getClasses = async ({
	userId,
	search,
	page,
	perPage,
	orderType,
}: {
	userId: number | undefined;
	search: string | undefined;
	page: number;
	perPage: number | undefined;
	orderType: 'asc' | 'desc'
}) => {
	return api.get(`/user/${userId}/school`, {
		params: {
			search,
			page: page ?? 1,
			perPage: perPage ?? 15,
			orderType,
		},
	});
};
