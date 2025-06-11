"use client";
import { useState, useEffect } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation'
import AuthGuard from '@/app/_components/AuthGuard';
import Header from '@/app/_components/header'
import Footer from '@/app/_components/footer'
import TweetForm from '@/app/_components/TweetForm';
import { TweetData } from '@/app/_interfaces/TweetData'
import { findTweetById, updateTweet } from '@/app/api/tweets';
import { useAuthContext } from '@/app/context/AuthContext';

interface TweetFormData {
  text: string;
  image: string;
}

const EditTweetPage = () => {
  const [tweet, setTweet] = useState<TweetData | null>(null)
  const [formData, setFormData] = useState<TweetFormData>({ text: '', image: '' });
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter()
  const { user, isLoading } = useAuthContext();

  const params = useParams()
  const tweetId = params.tweetId

  useEffect(() => {
    const fetchTweet = async () => {
      setLoading(true);
      if (tweetId) {
        try {
          const response = await findTweetById(Number(tweetId));
          if (user && user.id === response.user.id) {
            setTweet(response);
            setFormData({ text: response.text, image: response.image || '' });
          } else {
            return router.push('/');
          }
        } catch (error) {
          setTweet(null);
          console.error('ツイートの取得に失敗しました:', error);
        }
      }
      setLoading(false)
    };
    fetchTweet();
  }, [tweetId, isLoading]);

  const handleSubmit = async (formData: TweetFormData) => {
    try {
      await updateTweet(formData, Number(tweetId));
      router.push('/');
    } catch (error) {
      setErrorMessages([error instanceof Error ? error.message : 'エラーが発生しました']);
    }
  };

  if (loading || isLoading) {
    return <div>Loading...</div>
  }

  if (!tweet) {
    return notFound()
  }

  return (
    <AuthGuard>
      <Header />
      <div className="contents row">
        <div className="container">
          <h3>編集する</h3>
          <TweetForm
            initialData={formData}
            errorMessages={errorMessages}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <Footer />
    </AuthGuard>
  );
};

export default EditTweetPage;