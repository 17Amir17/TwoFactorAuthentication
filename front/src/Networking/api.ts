import axios from 'axios';
import { badAlert, goodAlert } from '../Services/alerts';
import { User } from '../Services/types';
import { validateUser } from '../Services/utils';

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
    if (response.data.message === '2factor') {
      return {
        twoFactor: true,
        username: response.data.username,
      };
    } else {
      goodAlert(response.data.message);
      const user: User = validateUser(response.data.user);
      return user;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      badAlert('Oopsies', error.response.data.message);
    }
    console.log(error);
    return false;
  }
}

export async function sendQRAnswer(code: string, username: string) {
  try {
    const response = await api.post(`login/qr?code=${code}`, {
      username,
    });
    goodAlert('GG WP', 'You are in!');
    const user: User = validateUser(response.data.user);
    return user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      badAlert('Oopsies', error.response.data.message);
    }
    console.log(error);
    return false;
  }
}

export async function requestTwoFactor(user: User) {
  try {
    const response = await api.post('register/twofactor', {
      ...user,
    });
    goodAlert('Yay!', response.data.message);
    console.log(response);

    return response.data.qr;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      badAlert('Oopsies', error.response.data.message);
    }
    console.log(error);
    return false;
  }
}
