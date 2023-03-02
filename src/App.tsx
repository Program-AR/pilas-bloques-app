import { CssBaseline } from '@mui/material';
import React from 'react';
import './App.css';
import { ChallengeView } from './components/ChallengeView';
import { Header } from './components/header/Header';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header/>
      <ChallengeView/>
    </React.Fragment>
  );
}

export default App;
