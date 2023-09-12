import axios from 'axios';

const axiosConfig = {
  baseURL: 'http://localhost:8081'
}
const instance = axios.create(axiosConfig);

export async function get(url: string) {
  try {
    return instance.get(url);
  } catch (e) {
    console.error(e);
    return;
  }
}

export async function post(url: string, data: Record<string, any>) {
  try {
    return instance.post(url, data);
  } catch (e) { 
    console.error(e);
    return;
  }
}
