import { UserData } from './UserData';

export interface CommentData {
  id: number;
  text: string;
  user: UserData;
}