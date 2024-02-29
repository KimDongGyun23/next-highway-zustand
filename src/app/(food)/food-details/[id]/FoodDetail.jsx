'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import styles from './FoodDetail.module.scss'
import { MdOutlineRecommend } from "react-icons/md";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { MdStars } from "react-icons/md";
import NoData from '@/components/no-data/NoData';
import DetailHeader from '@/components/detail-header/DetailHeader';
import InfoBox from '@/components/infoBox/InfoBox';
import Loader from '@/components/loader/Loader';

const FoodDetail = () => {

  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const url = `https://data.ex.co.kr/openapi/restinfo/restBestfoodList?key=test&type=json&numOfRows=50&pageNo=1&stdRestCd=${id}`;

  const getInfo = async () => {
    setIsLoading(true);

    const res = await axios.get(url);
    setInfo(res.data.list);

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
            <div className={styles.header}>
              <div>
                <DetailHeader name={info[0]?.stdRestNm} addr={info[0]?.svarAddr} />
              </div>
              
              <div className={styles[`recommend-desc`]}>
                <p>추천 메뉴: <MdOutlineRecommend /></p>
                <p>베스트 메뉴: <MdStars /></p>
                <p>프리미엄 메뉴: <MdOutlineWorkspacePremium /></p>
              </div>

            </div>
            
            <div className='box-wrapper'>
              {
                info.map(({
                  seq, foodNm, etc, foodCost,
                  premiumyn, recommendyn, bestfoodyn
                })=>(
                  <InfoBox key={seq}>
                    <div className={styles.title}>
                      <p className='name'>{foodNm}</p>

                      <div>
                        { recommendyn === "Y" && <MdOutlineRecommend /> }
                        { bestfoodyn === "Y" && <MdStars /> }
                        { premiumyn === "Y" && <MdOutlineWorkspacePremium /> }
                      </div>
                    </div>

                    <p className='desc'>가격: {foodCost}원</p>
                    { etc && <p className='desc'>{etc}</p> }
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

export default FoodDetail