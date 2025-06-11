'use client'
import {useEffect, useState } from 'react';
import { useRouter,useSearchParams } from 'next/navigation';
import Header from '@/app/_components/header';
import Footer from '@/app/_components/footer';
import SearchForm from '@/app/_components/SearchForm';
import TweetList from '@/app/_components/TweetList';
import { TweetData } from '@/app/_interfaces/TweetData';
import { deleteTweet, searchTweets } from '@/app/api/tweets';

const SearchPageClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || "";

  const [tweets, setTweets] = useState<TweetData[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      if (query) {
        try {
          const response = await searchTweets(query);
          setTweets(response);
        } catch (error) {
          console.error('ツイートの検索に失敗しました:', error);
        }
      }
    };

    fetchTweets();
  }, [query]);

  const handleDeleteTweet = async (tweetId: number) => {
    try {
      await deleteTweet(tweetId);
      router.push('/');
    } catch (error) {
      console.error('ツイートの削除に失敗しました:', error);
    }
  };

  const handleSearch = (query: string) => {
    router.push(`/tweets/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <Header />
      <SearchForm onSearch={handleSearch} initialQuery={query}/>
      <div className="contents row">
        <TweetList tweets={tweets} onDeleteTweet={handleDeleteTweet} />
      </div>
      <Footer />
    </>
  );
};

export default SearchPageClient;