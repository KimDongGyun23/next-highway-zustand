import { useDebounce } from '@/hooks/useDebounce';
import { useInfoStore } from '@/store/info';
import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";

const SearchForm = () => {

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { allHighwayInfo, setFilteredInfo } = useInfoStore();


  // 검색어가 해당 항목에 포함되어 있는지 확인
  useEffect(()=>{
    const filteredResults = allHighwayInfo.filter((item) => (
      item.svarNm.includes(debouncedSearch) || item.svarAddr.includes(debouncedSearch)
    ));

    setFilteredInfo(filteredResults);
  },[debouncedSearch])

  return (
    <form>
      <input 
        name='search'
        type='text'
        value={search}
        placeholder='휴게소 또는 주소를 입력하세요.'
        onChange={(e)=>setSearch(e.target.value)}
      />
      <button type='submit'><IoSearchSharp /></button>
    </form>
  )
}

export default SearchForm