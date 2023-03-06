import { CssBaseline } from '@mui/material';
import React from 'react';
import './App.css';
import { ChallengeView } from './components/ChallengeView';
import { Header } from './components/header/Header';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from './components/home/Home';
import { Footer } from './components/footer/Footer';

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
      <Footer/>
    </React.Fragment>
  );
}

export default App;
