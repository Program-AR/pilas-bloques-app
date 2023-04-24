import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import './App.css';
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Home } from './components/home/Home';
import { PBError } from './components/PBError';
import { ChallengeById, ChallengeByName } from './components/ChallengeView';
import { BookView } from './components/book/BookView';
import { ImportedChallengeView } from './components/ImportedChallengeView';
import theme from './theme';
import "./theme-light.css"
import { About } from './components/About';
import { PasswordRecovery } from './components/PasswordRecovery';
import { Register } from './components/Register';

function App() {
  
  const router = createHashRouter([
    {
      path: "",
      element: <Home/>,
      errorElement: <PBError />
    },
    {
      path: "/libros/:id",
      element: <BookView/>,
      errorElement: <PBError />
    },
    {
      path: "/desafio/:id",
      element: <ChallengeById/>,
      errorElement: <PBError />
    },
    {
      path: "/desafios/:challengeName",
      element: <ChallengeByName />,
      errorElement: <PBError />
    },
    {
      path: "/desafioImportado",
      element: <ImportedChallengeView/>,
      errorElement: <PBError />
    },
    {
      path: "/acercade",
      element: <About/>
    },
    {
      path: "/password-recovery",
      element: <PasswordRecovery/>
    },
    {
      path: "/register",
      element: <Register/>
    },
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
