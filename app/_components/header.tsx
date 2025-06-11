'use client'
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { useAuthContext } from '@/app/context/AuthContext'
const Header = () => {
  const router = useRouter()
  const { user, logout, isLoading } = useAuthContext()

  const handleLogout = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
      alert('ログアウトに失敗しました。')
    }
  }

  return (
    <header className="header">
      <div className="header__bar row">
        <h1 className="grid-6"><Link href="/">PicTweet</Link></h1>
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : user?.isAuthenticated ? (
          <div className="user_nav grid-6">
            <span>
              <div>{user.nickname}</div>
              <ul className="user__info">
                <li>
                  <Link href={`/users/${user.id}`}>マイページ</Link>
                  <form onSubmit={handleLogout}>
                    <input className="logout-btn" type="submit" value="ログアウト" />
                  </form>
                </li>
              </ul>
            </span>
            <Link href="/tweets/new" className="post">投稿する</Link>
          </div>
        ) : (
          <div className="grid-6">
            <Link href="/users/sign_up" className="post">新規登録</Link>
            <Link href="/users/login" className="post">ログイン</Link>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header