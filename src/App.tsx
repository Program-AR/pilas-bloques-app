import { CssBaseline } from '@mui/material';
import React from 'react';
import './App.css';
import { ChallengeView } from './components/ChallengeView';
import { Header } from './components/header/Header';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from './components/Home';

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/desafio/:id",
      element: <ChallengeView/>,
    }
  ]);



  return (
    <React.Fragment>
      <CssBaseline />
      <Header/>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
