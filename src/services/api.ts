import axios from 'axios';

const api = axios.create({
	baseURL: 'https://my-json-server.typicode.com/douglasdeoliveira/plantmanager',
});

export default api;
