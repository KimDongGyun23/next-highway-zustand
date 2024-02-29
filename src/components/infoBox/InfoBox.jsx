import React from 'react'
import styles from './InfoBox.module.scss'

const InfoBox = ({ children }) => {
  return (
    <div className={styles.box}>
      {children}
    </div>
  )
}

export default InfoBox