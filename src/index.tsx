import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import ReactGA from "react-ga4";
import { ThemeContextProvider } from './theme/ThemeContext';
import { PBProgress } from "./components/PBProgress";


if (import.meta.env.VITE_GOOGLE_ANALYTICS_KEY) {
  ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_KEY);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //Suspense is needed because the translations are loaded asynchronously
 // <Suspense fallback="...is loading">
 <Suspense fallback={<PBProgress/>}>
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
