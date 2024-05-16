import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import ReactGA from "react-ga4";
import { ThemeContextProvider } from './theme/ThemeContext';
import { PBProgress } from "./components/PBProgress";


if (process.env.VITE_GOOGLE_ANALYTICS_KEY) {
  ReactGA.initialize(process.env.VITE_GOOGLE_ANALYTICS_KEY);
}

type ShouldStrictModeProps = {
  children: React.ReactNode
}

const ShouldStrictMode = (props: ShouldStrictModeProps) => process.env.NODE_ENV === 'production' ? <React.StrictMode>{props.children}</React.StrictMode> : <>{props.children}</>

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //Suspense is needed because the translations are loaded asynchronously
  <Suspense fallback={<PBProgress />}>
    <ShouldStrictMode
      children={
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      }>
    </ShouldStrictMode>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
