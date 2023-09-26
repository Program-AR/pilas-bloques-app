import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import ReactGA from "react-ga4";
import { ThemeContextProvider } from './theme/ThemeContext';
import { Box, CircularProgress } from "@mui/material"

if (process.env.REACT_APP_GOOGLE_ANALYTICS_KEY) {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_KEY);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //Suspense is needed because the translations are loaded asynchronously
 // <Suspense fallback="...is loading">
 <Suspense fallback={<Box justifyContent="center" display="flex" alignItems="center" height="100%"><CircularProgress size={150}/></Box>}>
    <React.StrictMode>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </React.StrictMode>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
