import React from 'react'
import styles from './DetailHeader.module.scss'

const DetailHeader = ({ name, addr }) => {
  return (
    <>
      <h2 className={styles[`area-name`]}>
        { name }
      </h2>

      <p className={styles.addr}>
        { addr }
      </p>
    </>
  )
}

export default DetailHeader