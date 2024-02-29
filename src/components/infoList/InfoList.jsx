'use client'
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import styles from './InfoList.module.scss'
import Pagination from '@/components/pagination/Pagination';
import SearchForm from '@/components/form/SearchForm';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '@/layout/sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ALL_INFO, SET_INITIAL_BOOKMARKED, TOGGLE_BOOKMARKED, selectCurrentPage, selectFilteredInfo, selectInfoPerPage } from '@/redux/slice/infoSlice';
import { FaRegStar, FaStar  } from "react-icons/fa";
import { SET_AMENITIES_BOOKMARK, SET_FOOD_BOOKMARK, SET_GASSTATION_BOOKMARK, SET_PARKING_BOOKMARK, selectAmenitiesBookmarkedList, selectFoodBookmarkedList, selectGasStationBookmarkedList, selectParkingBookmarkedList } from '@/redux/slice/bookmarkSlice';
import Loader from '../loader/Loader';
import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';

const InfoList = ({ num }) => {

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();

  const filteredInfo = useSelector(selectFilteredInfo);
  const infoPerPage = useSelector(selectInfoPerPage);
  const currentPage = useSelector(selectCurrentPage);

  // 현재 페이지와 다음 페이지의 첫 번째 인덱스 계산
  const firstIndexOfNextPage = currentPage * infoPerPage;
  const firstIndexOfCurrentPage = firstIndexOfNextPage - infoPerPage;

  // 현재 페이지에 보여지는 정보
  const currentProducts = filteredInfo?.slice( firstIndexOfCurrentPage, firstIndexOfNextPage )

  // 정보 가져올 URL - svarGsstClassCd => 0:휴게소  1:주유소
  const url = `https://data.ex.co.kr/openapi/restinfo/hiwaySvarInfoList?key=test&type=json&svarGsstClssCd=${num}`;


  const amenities = useSelector(selectAmenitiesBookmarkedList);
  const food = useSelector(selectFoodBookmarkedList);
  const gasStation = useSelector(selectGasStationBookmarkedList);
  const parking = useSelector(selectParkingBookmarkedList);



  // 모든 데이터 저장
  const getHighwayInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      // url로부터 정보를 받아와 저장
      const res = await axios.get(url);
      dispatch(SET_ALL_INFO(res));

      // firebase로부터 정보를 받아와 저장
      switch(pathname) {
        case '/amenities':    dispatch(SET_INITIAL_BOOKMARKED(amenities)); break;
        case '/food':         dispatch(SET_INITIAL_BOOKMARKED(food)); break;
        case '/gas-station' : dispatch(SET_INITIAL_BOOKMARKED(gasStation)); break;
        case '/parking' :     dispatch(SET_INITIAL_BOOKMARKED(parking)); break;
      }
    } 
    catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  },[])


  useEffect(() => {
    getHighwayInfo();
  }, [getHighwayInfo])

  const handleInfoClick = (svarCd) => {
    router.push(`${pathname}-details/${svarCd}`);
  }

  const handleSaveClick = (infoObj)=>{
    if (auth?.currentUser){
      switch(pathname) {
        case '/amenities':    dispatch(SET_AMENITIES_BOOKMARK(infoObj)); break;
        case '/food':         dispatch(SET_FOOD_BOOKMARK(infoObj)); break;
        case '/gas-station' : dispatch(SET_GASSTATION_BOOKMARK(infoObj)); break;
        case '/parking' :     dispatch(SET_PARKING_BOOKMARK(infoObj)); break;
      }
      dispatch(TOGGLE_BOOKMARKED(infoObj.svarCd));
    }
    else {
      toast.warning("로그인이 필요합니다.");
    }
  }

  return (
    <div className={styles.container}>

      <div>
        <Sidebar/>
      </div>

      <div className={styles.content}>
        {isLoading && <Loader />}

        <SearchForm />

        <table>
          <thead>
            <tr>
              <th>{ num === 0 ? '휴게소 명' : '주유소 명'}</th>
              <th>주소</th>
              <th className={styles.save}>저장</th>
            </tr>
          </thead>
          <tbody>
            {
              currentProducts?.map(({svarCd, svarNm, svarAddr, isBookmarked})=>(
                <tr 
                  className={styles.trBody} 
                  key={svarCd}

                >
                  <td onClick={()=>handleInfoClick(svarCd)}>{svarNm}</td>
                  <td onClick={()=>handleInfoClick(svarCd)}>{svarAddr}</td>
                  <td 
                    className={styles.save}
                    onClick={()=>handleSaveClick({svarCd, svarNm, svarAddr, isBookmarked})}
                  >
                    {
                      isBookmarked ? <FaStar /> : <FaRegStar />
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <Pagination />
      </div>
    </div>
  )
}

export default InfoList