import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import styles from './FooterGroup.module.css';

export default function FooterGroup(props) {
  return (
    <Paper className={styles.wrapper}>
      <ButtonUnstyled className={styles.button}>Xem thêm</ButtonUnstyled>
    </Paper>
  );
}