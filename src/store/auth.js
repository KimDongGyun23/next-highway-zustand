const { create } = require("zustand");

export const useAuthStore = create((set)=>({
  isLoggedIn: false,
  email: null,
  userName: null,
  userID: null,

  setActiveUser: ({ email, userName, userID }) =>
    set({
      isLoggedIn: true,
      email: email,
      userName: userName,
      userID: userID
    }),
  
  removeActiveUser: ()=>
    set({
      isLoggedIn: false,
      email: null,
      userName: null,
      userID: null
    })
}))