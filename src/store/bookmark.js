import { auth, db } from "@/firebase/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { create } from "zustand";


const updateBookmarkedList = async (infoObj, target, name) => {

  let returnArr = [...target];
  const { svarCd, svarNm, svarAddr, isBookmarked } = infoObj;
  const index = target.findIndex(obj => obj.svarCd === svarCd);
  
  if (index !== -1) {
    returnArr.splice(index, 1);
    toast.success("즐겨찾기에서 삭제했습니다.");
  } else {
    returnArr = [ 
      ...returnArr, 
      { svarCd, svarNm, svarAddr, isBookmarked : !isBookmarked } 
    ];
    console.log(returnArr)
    toast.success("즐겨찾기에 추가했습니다.");
  }

  const bookmarkRef = doc(db, "bookmarked", auth.currentUser.uid);
  
  // switch(name) {
  //   case 'amenities':    await updateDoc(bookmarkRef, { amenities: returnArr }); break;
  //   case 'food':         await updateDoc(bookmarkRef, { food: returnArr }); break;
  //   case 'gas-station' : await updateDoc(bookmarkRef, { gasStation: returnArr }); break;
  //   case 'parking' :     await updateDoc(bookmarkRef, { parking: returnArr }); break;
  // }

  // auth?.currentUser && (
  //   updateDoc(doc(db, "bookmarked", auth.currentUser.uid), {
  //     // name: returnArr
  //   })
  // )

  return returnArr;
}

export const useBookmarkStore = create((set)=>({
  amenitiesBookmarkedList : [],
  foodBookmarkedList : [],
  gasStationBookmarkedList : [],
  parkingBookmarkedList : [],
  storageId : "",

  setAmenitiesBookmark: (bookmarkArr) => set({ amenitiesBookmarkedList: bookmarkArr }),
  setFoodBookmark: (bookmarkArr) => set({ foodBookmarkedList: bookmarkArr }),
  setGasStationBookmark: (bookmarkArr) => set({ gasStationBookmarkedList: bookmarkArr }),
  setParkingBookmark: (bookmarkArr) => set({ parkingBookmarkedList: bookmarkArr }),

  

}))