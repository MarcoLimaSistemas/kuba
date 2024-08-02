import { AxiosPromise } from 'axios';
import { IPresets } from '@models/preset';

import api from './api';

async function createPreset(data: IPresets, userId: number): AxiosPromise<any> {
	return api.post(`/user/${userId}/preset`, data);
}

export { createPreset };
