import React from 'react';
import styles from './Button.module.css'

export default function Button(props) {
    return (
        <button style={props.style} className={styles.button + ' ' + styles.loginButton} disabled={props.disabled} onClick={props.onClick}>
          {props.children}
        </button>
    );
}