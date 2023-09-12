import axios from 'axios';

const axiosConfig = {
  baseURL: 'http://localhost:8081'
}
const instance = axios.create(axiosConfig);
instance.defaults.withCredentials = true;

export async function get(url: string) {
  return instance.get(url);
}

export async function post(url: string, data: Record<string, any>) {
  return instance.post(url, data);
}
