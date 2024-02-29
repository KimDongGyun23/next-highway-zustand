'use client'
import Image from "next/image";
import mainImg from "@/assets/mainbg.jpg"
import styles from "./home.module.scss"
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebase";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { GET_DATA_FROM_FIREBASE } from "@/redux/slice/bookmarkSlice";

export default function Home() {
  const dispatch = useDispatch();

  const getFirebaseData = async () => {
    const docSnap = await getDoc(doc(db, "bookmarked", auth.currentUser.uid));
    dispatch(GET_DATA_FROM_FIREBASE(docSnap.data()));
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) { getFirebaseData(); }
    });
  }, [])

  
  return (
    <main className={styles.main}>
      <div className={styles.image}>
        <Image 
          src={mainImg} 
          alt="main-bg"
          priority 
        />
      </div>

      <div className={styles.title}>
        <p>당신의 여행 쉼터,</p><p>우리가 책임지겠습니다.</p>
      </div>
    </main>
  )
}
