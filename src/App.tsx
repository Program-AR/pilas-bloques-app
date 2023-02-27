import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import './App.css';
import { ChallengeView } from './components/ChallengeView';
import { Header } from './components/Header';
import theme from './theme';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header/>
        <ChallengeView/>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
