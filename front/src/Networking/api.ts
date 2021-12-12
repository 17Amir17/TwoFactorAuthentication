import axios from 'axios';
import { badAlert, goodAlert } from '../Services/alerts';

const api = axios.create({
  baseURL: 'http://localHost:3001/',
});

export async function register(username: string, password: string) {
  try {
    const response = await api.post('register', {
      username,
      password,
    });
    goodAlert(response.data.message);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      badAlert('Oppsies', error.response.data.message);
    }
    return false;
  }
}

export async function login(username: string, password: string) {
  try {
    const response = await api.post('login', {
      username,
      password,
    });
    goodAlert(response.data.message);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      badAlert('Oppsies', error.response.data.message);
    }
    return false;
  }
}
