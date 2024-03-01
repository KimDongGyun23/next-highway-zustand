'use client'
import React, { useState } from 'react'
import styles from './SidebarClient.module.scss'
import { FaRegBookmark } from "react-icons/fa6";
import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { useInfoStore } from '@/store/info';

const areaName = [
  "모두 보기", "즐겨찾기", "서울", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남"
  
];

const SidebarClient = () => {
  const [activeCity, setActiveCity] = useState("모두 보기");
  const { setCurrentPage, setFilteredInfo, allHighwayInfo } = useInfoStore();

  const handleClick = (area) => {
    let filteredItems;

    if ( area === "모두 보기") {
      filteredItems = allHighwayInfo;
    } 
    else if ( area === "즐겨찾기") {

      if (auth?.currentUser) {
        const temp = allHighwayInfo.filter(info => info.isBookmarked);
        filteredItems = temp;
      } else {
        filteredItems = [];
        toast.warning("로그인이 필요합니다.");
      }
    } 
    else {
      filteredItems = allHighwayInfo.filter(({ svarAddr }) => svarAddr.startsWith(area));
    }

    setFilteredInfo(filteredItems);
    setActiveCity(area);
    setCurrentPage(1);
  }



  return (
    <div className={styles.container}>
      <h3 className={styles.title}>지역 선택</h3>

      <ul>
        {
          areaName.map((area)=>(
            <li key={area}
              className={activeCity === area ? styles.active : null}
              onClick={()=>handleClick(area)}
            >
              {area}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default SidebarClient