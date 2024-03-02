import { toast } from "react-toastify";

export const useBookmark = (infoObj, target) => {
  const { svarCd, svarNm, svarAddr, isBookmarked } = infoObj;

  // 객체에 즐겨찾기 하고자 하는 항목이 있는지 확인
  const index = target.findIndex(obj => obj.svarCd === svarCd);

  // 존재하면 제거, 존재하지 않으면 추가
  if (index !== -1) {
    target.splice(index, 1);
    toast.success("즐겨찾기에서 삭제했습니다.")
  } else {
    const tempArr = [ 
      ...target, 
      {svarCd, svarNm, svarAddr, isBookmarked : !isBookmarked} 
    ];
    target = tempArr;
    toast.success("즐겨찾기에 추가했습니다.")
  }
  
  return target;
}