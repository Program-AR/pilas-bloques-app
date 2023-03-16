import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import './App.css';
import { ChallengeView } from './components/ChallengeView';
import { Header } from './components/header/Header';
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Home } from './components/home/Home';
import theme from './theme';
import { Book } from './components/book/Book';
import { getBook } from './staticData/books';

function App() {
  
  const router = createHashRouter([
    {
      path: "",
      element: <Home/>,
    },
    {
      path: "/libros/:id",
      element: <Book/>,
      loader: async ({ params }) => {
        return getBook(Number(params.id))
      },
    },
    {
      path: "/desafio/:id",
      element: <ChallengeView/>,
    }
  ]);



  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header/>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
