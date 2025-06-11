'use client'
import { useState } from 'react';
import { createTweet } from '@/app/api/tweets';
import { useRouter } from 'next/navigation';
import Header from '@/app/_components/header';
import Footer from '@/app/_components/footer';
import TweetForm from '@/app/_components/TweetForm';
import AuthGuard from '@/app/_components/AuthGuard'; 

interface TweetFormData {
  text: string;
  image: string;
}

const CreateTweetPage = () => {
  const formData: TweetFormData = { text: '', image: '' };
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (formData: TweetFormData) => {
    try {
      await createTweet(formData);
      router.push('/');
    } catch (error) {
      setErrorMessages([error instanceof Error ? error.message : 'エラーが発生しました']);
    }
  };

  return (
    <AuthGuard>
      <Header />
      <div className="contents row">
        <div className="container">
          <h3>投稿する</h3>
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

export default CreateTweetPage;