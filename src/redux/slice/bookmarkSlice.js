import { auth, db } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
  amenitiesBookmarkedList : [],
  foodBookmarkedList : [],
  gasStationBookmarkedList : [],
  parkingBookmarkedList : [],
  storageId : "",
}

const bookmarkSlice = createSlice({
  name : 'bookmark',
  initialState,
  reducers : {

    GET_DATA_FROM_FIREBASE : (state, action) => {
      const { amenities, food, gasStation, parking } = action.payload;
      state.amenitiesBookmarkedList = amenities;
      state.foodBookmarkedList = food;
      state.gasStationBookmarkedList = gasStation;
      state.parkingBookmarkedList = parking;
    },

    SET_ALL_RESET : (state, action) => {
      state.amenitiesBookmarkedList = [];
      state.foodBookmarkedList = [];
      state.gasStationBookmarkedList = [];
      state.parkingBookmarkedList = [];
      state.storageId = "";
    }

  }
})

export const selectAmenitiesBookmarkedList = (state)=>state.bookmark.amenitiesBookmarkedList;
export const selectFoodBookmarkedList = (state)=>state.bookmark.foodBookmarkedList;
export const selectGasStationBookmarkedList = (state)=>state.bookmark.gasStationBookmarkedList;
export const selectParkingBookmarkedList = (state)=>state.bookmark.parkingBookmarkedList;

export const {
  SET_AMENITIES_BOOKMARK, 
  SET_FOOD_BOOKMARK, 
  SET_GASSTATION_BOOKMARK, 
  SET_PARKING_BOOKMARK,
  GET_DATA_FROM_FIREBASE,
  SET_ALL_RESET
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;