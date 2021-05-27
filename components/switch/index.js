import React, { useState } from "react";
import styles from "./switch.module.css";

const Switch = () => {
  const [isChecked, setIsChecked] = useState(true)
  // if(typeof window === 'object') {
  //   const switchValue = document.getElementById('switch').checked
  // }

  const handelOnChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <div>
      <label className={styles.switch}>
        <input type="checkbox" id='switch' checked={isChecked} onChange={handelOnChange}/>
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </div>
  );
};

export default Switch;
