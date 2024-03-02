import { create } from "zustand";

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