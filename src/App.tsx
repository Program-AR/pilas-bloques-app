import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { useEffect } from 'react';
import './App.css';
import { createHashRouter, RouterProvider, Outlet, useSearchParams } from "react-router-dom";
import { Home } from './components/home/Home';
import { PBError } from './components/pageNotFound/PBError';
import { ChallengeById, ChallengeByName } from './components/ChallengeView';
import { BookView } from './components/book/BookView';
import { ImportedChallengeView } from './components/ImportedChallengeView';
import { About } from './components/about/About';
import { PageNotFound } from './components/pageNotFound/PageNotFound';
import { ChangePassword, PasswordRecovery } from './components/users/passwordRecovery/PasswordRecovery';
import { Register } from './components/users/register/Register';
import { ActorSelection } from './components/creator/ActorSelection/ActorSelection';
import { CreatorEditor } from './components/creator/Editor/Editor';
import { useLocation } from 'react-router-dom';
import ReactGA from "react-ga4";
import { CreatorViewMode } from './components/creator/Editor/CreatorViewMode';
import { useThemeContext } from './theme/ThemeContext';
import { SharedChallengeView } from './components/creator/SharedChallengeView';
import { PilasBloquesApi } from './pbApi';
import { Ember } from './emberCommunication';
import { PBSession } from './pbSession';

const AnalyticsComponent = () => {
  const location = useLocation();
  
  useEffect(() => {
    if(ReactGA.isInitialized) {
      ReactGA.send({ hitType: "pageview", page: location.pathname});
    }
  }, [location])

  return <Outlet />
}

const router = createHashRouter([{
  element:<AnalyticsComponent/>, 
  children: [
  {
    path: "",
    element: <Home/>,
    errorElement: <PBError />
  },
  {
    path: "/desafio/guardado/:id",
    element: <SharedChallengeView/>,
    errorElement: <PBError />,
    loader: async ({ params }) => {
      const challenge = await PilasBloquesApi.getSharedChallenge(params.id!);
      Ember.importChallenge(challenge)
      return challenge
    },
  },
  {
    path: "/libros/:id",
    element: <BookView/>,
    errorElement: <PBError />
  },
  {
    path: "/desafio/:id",
    element: <ChallengeById/>,
    errorElement: <PBError />,
    loader: async() => {
      await PBSession.saveUserIP()
      return null
    }
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
    path: "/establecer-contrasenia",
    element: <ChangePassword/>,
    loader: async ({ request }) => {
      const url = new URL(request.url);
      const token = url.searchParams.get("token");
      return await PilasBloquesApi.isValidToken(token!);
    },
  },
  {
    path: "/recuperar-contrasenia",
    element: <PasswordRecovery/>
  },
  {
    path: "/registrar",
    element: <Register/>
  },
  {
    path: "/creador/seleccionar",
    element: <ActorSelection/>
  },
  {
    path: "/creador/editar",
    element: <CreatorEditor/>
  },
  {
    path: "/creador/ver",
    element: <CreatorViewMode/>
  },
  {
    path: "*",
    element: <PageNotFound/>
  }
]}]);


function App() {

  const { theme } = useThemeContext()

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router}/>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;