'use client'
import React, { useState } from 'react'
import styles from './LoginClient.module.scss'
import Button from '@/components/button/Button'
import Link from 'next/link'
import Input from '@/components/input/Input'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Loader from '@/components/loader/Loader'

const LoginClient = () => {
  const [formData, setFormData] = useState({ email : '', password : ''});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e)=>{
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name] : value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      toast.success("로그인에 성공했습니다.");
      router.replace('/');
    } 
    catch (error) {
      toast.error(error?.code);
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <div className={styles.page}>
      
      {isLoading && <Loader />}
      <div className={styles.container}>
        <h2 className={styles.title}>로그인</h2>
        <form onSubmit={handleSubmit}>
          <Input
            email
            id='email'
            name='email'
            label='이메일'
            placeholder='이메일을 입력하세요.'
            value={formData.email}
            onChange={handleInputChange}
          />

          <Input
            password
            id='password'
            name='password'
            label='비밀번호'
            placeholder='비밀번호를 입력하세요.'
            value={formData.password}
            onChange={handleInputChange}
          />

          <div>

          </div>

          <div className={styles[`btn-filed`]}>
            <Button type='submit'>로그인</Button>
            <Button type='button' secondary={true}>
              <Link href={'/sign-in'}>회원가입</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginClient