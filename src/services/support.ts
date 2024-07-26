import api from './api';

export interface ISupportPayload {
	component: string;
	description: string;
}

export const sendMessageToSupport = async (
	payload: ISupportPayload,
	userId: number | undefined
) => {
	return api.post(`/user/${userId}/zohoDesk/helpRequest`, payload);
};
