import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';
import { getAuthData } from './storage';

export const BASE_URL = 'http://localhost:8080';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

type LoginData = {
  username: string;
  password: string;
};

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Bearer ' + getAuthData(),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/login',
    data,
    headers,
  });
};

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = {
    ...config.headers,
    Authorization: 'Bearer ' + getAuthData(),
  }

  return axios({ ...config, baseURL: BASE_URL, headers });
};
// Adiciona um interceptador na requisição
axios.interceptors.request.use(function (config) {
  // Faz alguma coisa antes da requisição ser enviada
  return config;
}, function (error) {
  // Faz alguma coisa com o erro da requisição
  return Promise.reject(error);
});

// Adiciona um interceptador na resposta
axios.interceptors.response.use(function (response) {
  console.log(1);
  
  // Qualquer código de status que dentro do limite de 2xx faz com que está função seja acionada
  // Faz alguma coisa com os dados de resposta
  return response;
}, function (error) {
  // Qualquer código de status que não esteja no limite do código 2xx faz com que está função seja acionada
  // Faz alguma coisa com o erro da resposta
  return Promise.reject(error);
});