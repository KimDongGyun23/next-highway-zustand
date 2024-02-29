import React from 'react'
import styles from './NoData.module.scss'
import Button from '../button/Button';
import { useRouter } from 'next/navigation';

const NoData = () => {
  const router = useRouter();

  return (
    <div className={styles[`no-data`]}>
      <p>게시된 정보가 없습니다.</p>
      
      <Button
        onClick={()=>{router.back();}}
      >
        이전 페이지로 돌아가기
      </Button>
    </div>
  )
}

export default NoData