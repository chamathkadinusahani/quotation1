import React from 'react'
import styles from './MyComponent.module.css';

export default function header() {
  return (
    <div>
       <div className={styles.div2}>
            <div>HOME</div>
            <div>PRODUCT</div>
            <div>CONTACT US</div>
            <div>ABOUT US</div>
            <div className={styles.login2}>LOGIN</div>
          </div>
    </div>
  )
}
