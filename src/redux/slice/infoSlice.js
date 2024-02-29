const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
  allHighwayInfo : [],  // 모든 정보
  filteredInfo : [],    // 필터링된 정보
  currentPage : 1,      // 현재 페이지
  infoPerPage : 7,      // 한 페이지 당 보여줄 정보의 개수
}

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    SET_ALL_INFO: (state, action)=>{
      const res = action.payload;

      // 문자 정렬
      const temp = res.data.list.sort((a, b) => {
        const nameA = a.svarNm;
        const nameB = b.svarNm;
      
        if (nameA < nameB) { return -1; }
        if (nameA > nameB) { return 1; }
        return 0;
      });

      state.allHighwayInfo = temp.map(({svarCd, svarNm, svarAddr}) => ({
        svarCd, svarNm, svarAddr,
        isBookmarked : false
      }));
      state.filteredInfo = state.allHighwayInfo;
    },

    SET_FILTERED_INFO: (state, action)=>{
      state.filteredInfo = action.payload;
    },

    SET_CURRENT_PAGE: (state, action)=>{
      state.currentPage = action.payload;
    },
    
    TOGGLE_BOOKMARKED: (state, action)=>{
      state.filteredInfo.forEach(obj => {
        if (obj.svarCd === action.payload) {
          obj.isBookmarked = !obj.isBookmarked;
          return;
        }
      })
      state.allHighwayInfo.forEach(obj => {
        if (obj.svarCd === action.payload) {
          obj.isBookmarked = !obj.isBookmarked;
          return;
        }
      })
    },

    SET_INITIAL_BOOKMARKED : (state, action)=>{
      const dataArr = action.payload;
      const tempArr = [...state.allHighwayInfo];
      
      dataArr.forEach(dataItem => {
        const indexToRemove = tempArr.findIndex(item => item.svarCd === dataItem.svarCd);

        if (indexToRemove !== -1) {
          tempArr.splice(indexToRemove, 1, dataItem);
        }
      });
      
      state.allHighwayInfo = tempArr;
      state.filteredInfo = tempArr;
    }

  }
})

export const { 
  SET_ALL_INFO, 
  SET_FILTERED_INFO, 
  SET_CURRENT_PAGE, 
  SET_BOOKMARKED, 
  SET_INITIAL_BOOKMARKED,
  TOGGLE_BOOKMARKED
} = infoSlice.actions;

export const selectAllHighwayInfo = (state)=>state.info.allHighwayInfo;
export const selectFilteredInfo = (state)=>state.info.filteredInfo;
export const selectCurrentPage = (state)=>state.info.currentPage;
export const selectInfoPerPage = (state)=>state.info.infoPerPage;

export default infoSlice.reducer;