import { AxiosPromise } from 'axios';
import { IPresets } from '@models/preset';

import api from './api';

async function createPreset(
	data: IPresets,
	userId: number | undefined
): AxiosPromise<any> {
	return api.post(`/user/${userId}/preset`, data);
}

async function editPreset(data: IPresets, userId: number | undefined) {
	return undefined;
}

async function deletePreset(
	userId: number | undefined,
	presetId: number | undefined
) {
	return api.delete(`/user/${userId}/preset/${presetId}`);
}

async function getPresets(
	userId: number | undefined,
	search: string | undefined,
	page: number,
	isMyPreset = false,
	perPage?: number | undefined
) {
	const { data } = await api.get(`/user/${userId}/preset`, {
		params: {
			userId: isMyPreset ? userId : undefined,
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

async function getGenres(userId: number | undefined) {
	const { data } = await api.get(`/user/${userId}/genre`);

	return data;
}

export { createPreset, getPresets, getPresetsPublics, getGenres, deletePreset };
