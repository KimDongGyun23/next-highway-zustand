'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './DetailClient.module.scss'
import NoData from '@/components/no-data/NoData'
import DetailHeader from '@/components/detail-header/DetailHeader'
import InfoBox from '@/components/infoBox/InfoBox'
import Loader from '@/components/loader/Loader'

const DetailClient = () => {
  const [info, setInfo] = useState([]);
  const [brandInfo, setBrandInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const url = `https://data.ex.co.kr/openapi/restinfo/restConvList?key=test&type=json&numOfRows=10&pageNo=1&stdRestCd=${id}`
  const brandUrl = `https://data.ex.co.kr/openapi/restinfo/restBrandList?key=test&type=json&numOfRows=50&pageNo=1&stdRestCd=${id}`

  const getInfo = async () => {
    setIsLoading(true);

    const res = await axios.get(url);
    const brandRes = await axios.get(brandUrl);
    setInfo(res.data.list);
    setBrandInfo(brandRes.data.list);

    setIsLoading(false);
  }

  useEffect(()=>{
    getInfo();
  },[])


  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {
        info.length === 0 ?
        (
          <NoData />
        ) :
        (
          <>
            <DetailHeader name={info[0]?.stdRestNm} addr={info[0]?.svarAddr} />

            <div className={styles[`box-wrapper`]}>
              {
                info.map(({
                  psCode, psDesc, psName,
                  stime, etime,
                })=>(
                  <InfoBox key={psCode}>
                    <p className='name'>{psName}</p>
                    <p className='desc'>{psDesc}</p>
                    <p className='desc'>이용시간 : {stime} - {etime}</p>
                  </InfoBox>
                ))
              }
            </div>

            <h4 className={styles.brand}>브랜드 매장</h4>
            <div className={styles[`box-wrapper`]}>
              {
                brandInfo.map(({
                  brdCode, brdDesc, brdName,
                  stime, etime,
                })=>(
                  <InfoBox key={brdCode}>
                    <p className='name'>{brdName}</p>
                    <p className='desc'>{brdDesc}</p>
                    <p className='desc'>이용시간 : {stime} - {etime}</p>
                  </InfoBox>
                ))
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default DetailClient