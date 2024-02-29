import React, { useState } from 'react'
import styles from './Input.module.scss'
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

const Input = ({
  id,
  label,
  name = '',
  icon,
  email,
  password,
  placeholder = '',
  readOnly,
  disabled,
  value,
  className = '',
  onChange,
  ...restProps
}) => {

  const [inputValue, setInputValue] = useState(value ? value : '');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const checkType = () => {
    if (email) {
      return 'email'
    }

    if (password) {
      return isPasswordVisible ? 'text' : 'password';
    }

    return 'text';
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  }

  return (
    <>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      <div
        className={styles.box}
      >
        <input
          id={id}
          type={checkType()}
          name={name}
          className={styles.input}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          {...restProps}
        />

        {password ? (
          <button
            type='button'
            className={styles.button}
            onClick={() => setIsPasswordVisible(prev => !prev)}
            disabled={disabled}
          >
            {
              isPasswordVisible ? <GoEye /> : <GoEyeClosed />
            }
          </button>
        ) : null}
      </div>
    </>
  )
}

export default Input