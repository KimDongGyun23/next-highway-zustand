import { create } from "zustand";

export const useBookmarkStore = create((set)=>({
  amenitiesBookmarkedList : [],
  foodBookmarkedList : [],
  gasStationBookmarkedList : [],
  parkingBookmarkedList : [],
  storageId : "",


}))