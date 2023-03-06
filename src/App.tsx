import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import './App.css';
import { ChallengeView } from './components/ChallengeView';
import { Header } from './components/header/Header';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from './components/home/Home';
import { Footer } from './components/footer/Footer';
import theme from './theme';
import { Book } from './components/book/Book';

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/desafio/:id",
      element: <ChallengeView/>,
    },
    {
      path: "/libros/:id",
      element: <Book/>
    }
  ]);



  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header/>
        <RouterProvider router={router} />
        <Footer/>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
