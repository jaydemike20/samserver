import axios from 'axios';

axios.defaults.baseURL = 'http://172.30.80.1:8000/api/v1/';
axios.defaults.headers.post['Content-Type'] = 'application/json';


export default axios;