import axios from "axios";

const { create } = require("zustand");

// 문자 정렬 함수

const sortByOrder = (list) => {
  const sortedList = list.sort((a, b) => {
    const nameA = a.svarNm;
    const nameB = b.svarNm;
  
    if (nameA < nameB) { return -1; }
    if (nameA > nameB) { return 1; }
    return 0;
  });

  return sortedList;
}

export const useInfoStore = create((set)=>({
  allHighwayInfo : [],  // 모든 정보
  filteredInfo : [],    // 필터링된 정보
  currentPage : 1,      // 현재 페이지
  infoPerPage : 7,      // 한 페이지 당 보여줄 정보의 개수

  setAllInfo: async (url) => {
    const res = await axios.get(url);
    const sortedList = sortByOrder(res.data.list);

    set({
      allHighwayInfo: sortedList.map(({ svarCd, svarNm, svarAddr }) => ({
        svarCd,
        svarNm,
        svarAddr,
        isBookmarked: false,
      })),
      
      filteredInfo: sortedList.map(({ svarCd, svarNm, svarAddr }) => ({
        svarCd,
        svarNm,
        svarAddr,
        isBookmarked: false,
      })),
    })
  },

  setFilteredInfo: (infos) => set({ filteredInfo: infos }),

  setCurrentPage: (page) => set({ currentPage: page }),







  toggleBookmarked: (svarCd) => {
    set((state) => ({
      filteredInfo: state.filteredInfo.map((obj) =>
        obj.svarCd === svarCd
          ? { ...obj, isBookmarked: !obj.isBookmarked }
          : obj
      ),
      allHighwayInfo: state.allHighwayInfo.map((obj) =>
        obj.svarCd === svarCd
          ? { ...obj, isBookmarked: !obj.isBookmarked }
          : obj
      ),
    }));
  },

  setInitialBookmarked: (dataArr) => {
    set((state) => ({
      allHighwayInfo: state.allHighwayInfo.map((obj) => {
        const dataItem = dataArr.find((item) => item.svarCd === obj.svarCd);
        return dataItem ? { ...obj, isBookmarked: true } : obj;
      }),
      filteredInfo: state.filteredInfo.map((obj) => {
        const dataItem = dataArr.find((item) => item.svarCd === obj.svarCd);
        return dataItem ? { ...obj, isBookmarked: true } : obj;
      }),
    }));
  },

}))