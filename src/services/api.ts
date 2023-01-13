import Axios from 'axios';

const api = Axios.create({
  //https://kuba--api.herokuapp.com/v1
  baseURL: 'https://api.kuba.audio/v1',
});

export default api;