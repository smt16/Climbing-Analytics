import axios from 'axios';

const axiosConfig = {
  baseURL: 'http://localhost:8081'
}
const instance = axios.create(axiosConfig);

export async function get(url: string) {
  try {
    const res = await instance.get(url);
    return res.data;
  } catch (e) {
    console.error(e);
    return;
  }
}

export async function post(url: string, data: Record<string, any>) {
  try {
    const res = await instance.post(url, data);
    return res.data;
  } catch (e) { 
    console.error(e);
    return;
  }
}
