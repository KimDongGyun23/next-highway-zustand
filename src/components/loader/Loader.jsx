import React from 'react'
import styles from './Loader.module.scss'
import { RotatingLines } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <RotatingLines
          strokeColor='grey'
          strokeWidth='5'
          animationDuration='0.75'
          width='30'
          visible={true}
        />
      </div>
    </div>
  )
}

export default Loader