import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import './App.css';
import { AppContextProvider } from './AppContext';
import { ChallengeView } from './components/ChallengeView';
import { Header } from './components/header/Header';
import theme from './theme';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <AppContextProvider>
          <CssBaseline />
          <Header/>
          <ChallengeView/>
        </AppContextProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
