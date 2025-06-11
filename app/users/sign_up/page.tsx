'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/_components/header';
import { signUp } from '@/app/api/users';

interface SignUpForm {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUpPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignUpForm>();
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const onSubmit = async (formData: SignUpForm) => {
    try {
      await signUp(formData);
      router.push('/');
    } catch (error) {
      setErrorMessages([error instanceof Error ? error.message : 'エラーが発生しました']);
    }
  };

  return (
    <>
      <Header />
      <div className="contents row">
        <div className="container">
          <h2>Sign up</h2>
          {errorMessages.map((error, index) => (
            <div key={index} className="error-message">{error}</div>
          ))}

          <form onSubmit={handleSubmit(onSubmit)} className="new_user">
            <div className="field">
              <label>Nickname</label><em>(6 characters maximum)</em><br />
              {errors.nickname && <p className="error-message">{errors.nickname.message}</p>}
              <input
                type="text"
                {...register('nickname', {
                  required: 'ニックネームは必須です',
                  maxLength: { value: 6, message: 'ニックネームは長すぎます（最大6文字までです）' }
                })}
              />
            </div>

            <div className="field">
              <label>Email</label><br />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
              <input
                type="email"
                {...register('email',{
                  required: 'メールアドレスは必須です',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '無効なメールアドレスです',}
              })}
              />
              </div>

            <div className="field">
              <label>Password</label><em>(6 characters minimum)</em><br />
              {errors.password && <p className="error-message">{errors.password.message}</p>}
              <input
                type="password"
                {...register('password', {
                  required: 'パスワードは必須です',
                  minLength: { value: 6, message: 'パスワードは6文字以上である必要があります' },
                  maxLength: { value: 128, message: 'パスワードは128文字以内である必要があります' }
                })}
              />
            </div>

            <div className="field">
              <label>Password confirmation</label><br />
              {errors.passwordConfirmation && <p className="error-message">{errors.passwordConfirmation.message}</p>}
              <input
                type="password"
                {...register('passwordConfirmation', {
                  required: '確認用パスワードは必須です',
                  validate: (value: string) => value === watch('password') || '確認用パスワードがパスワードと一致しません'
                })}
              />
            </div>

            <div className="actions">
              <input type="submit" value="Sign up" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;