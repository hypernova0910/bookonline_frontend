import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export const BackdropContext = React.createContext(null);

export default function SimpleBackdrop({children}) {
  const [loading, setLoading] = React.useState(false);

  return (
    <BackdropContext.Provider value={[loading, setLoading]}>
      {children}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </BackdropContext.Provider>
  );
}