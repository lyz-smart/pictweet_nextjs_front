'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/_components/header';
import Footer from '@/app/_components/footer';
import TweetList from '@/app/_components/TweetList';
import SearchForm from '@/app/_components/SearchForm';
import { findAllTweets, deleteTweet } from '@/app/api/tweets';
import { TweetData } from '@/app/_interfaces/TweetData';

const IndexPage = () => {
  const router = useRouter();
  const [tweets, setTweets] = useState<TweetData[]>([]);

  useEffect(() => {
    const getTweets = async () => {
      try {
        const response = await findAllTweets();
        setTweets(response);
      } catch (error) {
        console.error('ツイートの取得に失敗しました:', error);
      }
    };
    getTweets();
  }, []);

  const handleDeleteTweet = async (tweetId: number) => {
    try {
      await deleteTweet(tweetId);
      setTweets(tweets.filter((tweet) => tweet.id !== tweetId));
    } catch (error) {
      console.error('ツイートの削除に失敗しました:', error);
    }
  };

  const handleSearch = (query: string) => {
    router.push(`/tweets/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      <Header />
      <SearchForm onSearch={handleSearch} initialQuery={""}/>
      <div className="contents">
        <TweetList tweets={tweets} onDeleteTweet={handleDeleteTweet}/>
      </div>
      <Footer />
    </div>
  );
}

export default IndexPage;