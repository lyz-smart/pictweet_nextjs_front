'use client'
import { useEffect, useState, FormEvent } from 'react'
import Link from 'next/link'
import Header from '@/app/_components/header'
import Footer from '@/app/_components/footer'
import CommentForm from '@/app/_components/CommentForm'
import CommentList from '@/app/_components/CommentList'
import { TweetData } from '@/app/_interfaces/TweetData'
import { CommentData } from '@/app/_interfaces/CommentData'
import { useAuthContext } from '@/app/context/AuthContext'
import { useParams, notFound, useRouter } from 'next/navigation'
import { deleteTweet, findTweetById } from '@/app/api/tweets'
import { createComment } from '@/app/api/comments';

interface CommentFormData {
  text: string;
}

const ShowTweetDetailPage = () => {
  const { user } = useAuthContext()
  const router = useRouter()

  const params = useParams()
  const tweetId = params.tweetId
  const [tweet, setTweet] = useState<TweetData | null>(null)
  const [loading, setLoading] = useState(true)

  const [comments, setComments] = useState<CommentData[]>([])
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  useEffect(() => {
    const getTweet = async () => {
      setLoading(true);
      if (tweetId) {
        try {
          const response = await findTweetById(Number(tweetId))
          setTweet(response)
          setComments(response.comments)
        } catch (error) {
          setTweet(null)
          console.error('ツイートの取得に失敗しました:', error)
        }       
      }
      setLoading(false)
    }
    getTweet()
  }, [tweetId])

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await deleteTweet(Number(tweetId));
      router.push("/");
    } catch (error) {
      console.error('ツイートの削除に失敗しました:', error);
    }
  }

  const handleCommentSubmit = async (formData: CommentFormData) => {
    try {
      const response = await createComment(Number(tweetId), formData);
      setComments([ ...comments, response])
    } catch (error) {
      setErrorMessages([error instanceof Error ? error.message : 'エラーが発生しました']);
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!tweet) {
    return notFound()
  }

  return (
    <>
      <Header />
      <div className="contents row">
        <div className="content_post" style={{ backgroundImage: `url(${tweet.image})` }}>
          { user?.isAuthenticated && user.id == tweet.user.id ? (
            <div className="more">
              <span><img src="/images/arrow_top.png" alt="Arrow Top" /></span>
              <ul className="more_list">
                <li>
                  <Link href={`/tweets/${tweet.id}/edit`} className="update-btn">編集</Link>
                </li>
                <li>
                  <form onSubmit={handleDelete}>
                    <input type="submit" className="delete-btn" value="削除" />
                  </form>
                </li>
              </ul>
            </div>
          ) : null}
          <p>{tweet.text}</p>
          <span className="name">
            <Link href={`/users/${tweet.user.id}`}>
              <span>投稿者</span><span>{tweet.user.nickname}</span>
            </Link>
          </span>
        </div>
        <div className="container">
          <CommentForm errorMessages={errorMessages} onSubmit={handleCommentSubmit} />
          <CommentList comments={comments} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ShowTweetDetailPage