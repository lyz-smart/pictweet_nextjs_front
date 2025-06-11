import { UserData } from './UserData';
import { CommentData } from './CommentData';

export interface TweetData {
  id: number;
  text: string;
  image: string | null;
  user: UserData;
  comments: CommentData[];
}