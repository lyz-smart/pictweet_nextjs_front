import axios from 'axios';
import { CommentData } from '../_interfaces/CommentData';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

export const createComment = async (tweetId: number, commentForm: { text: string }): Promise<CommentData> => {
  try {
    const response = await api.post(`/tweets/${tweetId}/comment/`, commentForm);
    return response.data;
  } catch (error) {
   if (axios.isAxiosError(error)) {
      throw new Error('ツイートの投稿に失敗しました');
    }
    throw error;
  }
};