'use client';
import Link from 'next/link'
import { FormEvent } from 'react';
import { TweetData } from '@/app/_interfaces/TweetData';
import { useAuthContext } from '@/app/context/AuthContext';

interface TweetProps {
    tweet: TweetData;
    onDeleteTweet: (tweetId: number) => Promise<void>;
}

const Tweet = ({ tweet , onDeleteTweet}: TweetProps) => {
  const { user } = useAuthContext()

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault()
    onDeleteTweet(tweet.id)
  }

  return (
    <div className="content_post" style={{ backgroundImage: `url(${tweet.image})` }}>
      <div className="more">
        <span><img src="/images/arrow_top.png" alt="Arrow Top" /></span>
        <ul className="more_list">
          <li>
            <Link href={`/tweets/${tweet.id}`}>詳細</Link>
          </li>
          { user?.isAuthenticated && user.id == tweet.user.id ? (
            <>
              <li>
                <Link href={`/tweets/${tweet.id}/edit`} className="update-btn">編集</Link>
              </li>
              <li>
                <form onSubmit={handleDelete}>
                  <input type="submit" className="delete-btn" value="削除" />
                </form>
              </li>
            </>
          ): null }
        </ul>
      </div>
      <p>{tweet.text}</p>
      <span className="name">
        <Link href={`/users/${tweet.user.id}`}>
          <span>投稿者</span><span>{tweet.user.nickname}</span>
        </Link>
      </span>
    </div>
  );
};

export default Tweet