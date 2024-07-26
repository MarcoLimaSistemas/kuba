import Axios from 'axios';

const api = Axios.create({
	baseURL: 'https://api.staging.kuba.audio/v1'
});

export default api;
