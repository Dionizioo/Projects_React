import axios from 'axios';

// para não ficar digitando a cada requisição
axios.defaults.baseURL = 'http://localhost:3000/';

// para que o axios envie os dados no formato json
axios.defaults.headers.post["Content-Type"] = "application/json";

// para que o axios espere 10 segundos antes de cancelar a requisição
axios.defaults.timeout = 10000;

export default axios;