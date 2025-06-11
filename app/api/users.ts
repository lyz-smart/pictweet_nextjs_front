import axios from 'axios';
import qs from 'qs';
import { TweetData } from '../_interfaces/TweetData';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

interface SignUpForm {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface UserTweetsResponse {
  id: number;
  nickname: string;
  tweets: TweetData[];
}

interface UserResponse {
  id: number;
  nickname: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const signUp = async (formData: SignUpForm): Promise<UserResponse> => {
  try {
    const response = await api.post<UserResponse>('/users/', formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Sign up error:', error.response?.data);
      const messages = error.response?.data?.messages;
      throw new Error(messages ? messages.join(', ') : '登録に失敗しました');
    }
    throw error;
  }
};

export const login = async (credentials: LoginCredentials): Promise<UserResponse> => {
  try {
    const response = await api.post<UserResponse >('/login', qs.stringify({
      email: credentials.email,
      password: credentials.password,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Login error:', error.response?.data);
      const messages = error.response?.data?.messages;
      throw new Error(messages ? messages.join(', ') : 'ログインに失敗しました');
    }
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/logout');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Logout error:', error.response?.data);
      throw new Error('ログアウトに失敗しました');
    }
  }
};

export const findUserTweets = async (userId: number): Promise<UserTweetsResponse> => {
  try {
    const response = await api.get<UserTweetsResponse>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('APIリクエストエラー:', error.response?.data);
      throw new Error('ユーザー情報の取得に失敗しました');
    }
    throw error;
  }
};