import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuProvider from './context/MenuProvider'
import AuthProvider from './context/AuthProvider'
import SnackbarProvider from './context/SnackbarProvider'
import { BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SnackbarProvider>
        <AuthProvider>
          <MenuProvider>
            <App />
          </MenuProvider>
        </AuthProvider>
      </SnackbarProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
