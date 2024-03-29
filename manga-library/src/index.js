import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';


const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#8ca49a',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#272b2b',
    },
    success: {
      main: '#5fac66',
    },
    info: {
      main: '#272b2b',
    },
  },
});



ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
