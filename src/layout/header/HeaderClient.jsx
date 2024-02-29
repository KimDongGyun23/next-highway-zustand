'use client'
import React, { useEffect, useState } from 'react'
import styles from './Header.module.scss'
import Link from 'next/link'
import Button from '@/components/button/Button'
import { auth } from '@/firebase/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER, selectIsLoggedIn } from '@/redux/slice/authSlice'
import { usePathname, useRouter } from 'next/navigation'
import { SET_ALL_RESET } from '@/redux/slice/bookmarkSlice'
import { toast } from 'react-toastify'

const HeaderClient = () => {
  const [displayName, setDisplayName] = useState('');

  const isLoggedIn = useSelector(selectIsLoggedIn);
  
  const router = useRouter();
  const dispatch = useDispatch();
  const pathName = usePathname();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // 골뱅이 이전 잘라내기
        const u1 = user.email.substring(0, user.email.indexOf('@'));
        // 첫 글자 대문자
        const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
        setDisplayName(uName);

        // 유저 정보를 리덕스 스토어에 저장하기
        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: displayName,
          userID: user.uid
        }))


      } else {
        setDisplayName('');
        dispatch(REMOVE_ACTIVE_USER());
      }
    })
  }, [dispatch, displayName])

  const styleByPath = (path)=>{
    return pathName.includes(path) ?  `${styles.item} ${styles.active}` : styles.item
  }

  const onSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("로그아웃 되었습니다.");
      router.replace('/');
      dispatch(SET_ALL_RESET());
    } 
    catch (error) {
      console.log(error);
      toast.error(error?.code);
    }
  }

  return (
    <header className={styles.header}>
      <div>
        <h1>
          <Link className={styles.logo} href={'/'}>
            logo
          </Link>
        </h1>
      </div>

      <ul className={styles.list}>
        <li className={styleByPath('/food')}>
          <Link href={'/food'}>음식</Link>
        </li>

        <li className={styleByPath('/amenities')}>
          <Link href={'/amenities'}>편의시설</Link>
        </li>

        <li className={styleByPath('/gas-station')}>
          <Link href={'/gas-station'}>주유소</Link>
        </li>

        <li className={styleByPath('/parking')}>
          <Link href={'/parking'}>주차</Link>
        </li>
      </ul>

      {
        isLoggedIn ? (
          <div className={styles.profile}>
            <Button className={styles[`btn-profile`]}>
              <Link href={'/profile'}>{displayName} 님</Link>
            </Button>
            <Button 
              className={styles[`btn-logout`]} 
              secondary={true}
              onClick={onSignOut}
            >
              로그아웃
            </Button>
          </div>
        ) : (
          <Button>
            <Link href={'/login'}>로그인</Link>
          </Button>
        )
      }
      
      
    </header>
  )
}

export default HeaderClient