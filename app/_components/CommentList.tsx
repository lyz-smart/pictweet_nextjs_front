'use client';
import Link from 'next/link';
import { CommentData } from '../_interfaces/CommentData';

interface CommentListProps {
  comments: CommentData[];
}

const CommentList = ({ comments }: CommentListProps) => {

  return (
    <div className="comments">
      <h4>＜コメント一覧＞</h4>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>
              <Link href={`/users/${comment.user.id}`}>{comment.user.nickname}</Link>：
            </strong>
            <span>{comment.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;