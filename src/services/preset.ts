import { AxiosPromise } from 'axios';
import { IPresets } from '@models/preset';

import api from './api';

async function createPreset(data: IPresets, userId: number): AxiosPromise<any> {
	return api.post(`/user/${userId}/preset`, data);
}

async function getPresets(
	userId: number | undefined,
	search: string,
	page: number,
	perPage?: number | undefined
) {
	const { data } = await api.get(`/user/${userId}/preset`, {
		params: {
			search: search ?? undefined,
			page: page ?? 1,
			perPage: perPage ?? 10
		}
	});

	return data;
}

async function getPresetsPublics(
	userId: number | undefined,
	search: string,
	page: number,
	perPage?: number | undefined
) {
	const { data } = await api.get(`/user/${userId}/indexPublicUsers`, {
		params: {
			search: search ?? undefined,
			page: page ?? 1,
			perPage: perPage ?? 10
		}
	});

	return data;
}

export { createPreset, getPresets, getPresetsPublics };
