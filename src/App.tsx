import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import './App.css';
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Home } from './components/home/Home';
import theme from './theme';
import { PBError } from './components/PBError';
import { ChallengeView } from './components/ChallengeView';
import { BookView } from './components/book/Book';

function App() {
  
  const router = createHashRouter([
    {
      path: "",
      element: <Home/>,
    },
    {
      path: "/libros/:id",
      element: <BookView/>,
      errorElement: <PBError />
    },
    {
      path: "/desafio/:id",
      element: <ChallengeView/>,
      errorElement: <PBError />
    }
  ]);



  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
