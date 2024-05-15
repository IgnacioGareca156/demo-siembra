import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//fuente
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import CssBaseline from '@mui/material/CssBaseline';

import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom"

import Layout from './pages/Layout';
import LoginAdmin from './pages/admin/LoginAdmin';
import LayoutLogin from './pages/LayoutLogin';
import LoginAlumno from './pages/alumno/LoginAlumno';
import TareasAlumno from './pages/alumno/TareasAlumno';
import Aulas from './pages/admin/Aulas';
import ContextProvider from './services/global.context';
import { ProtectedRouteProfesor, AuthProtectedRoute, ProtectedRouteAdmin } from './components/ProtectedRouteAdmin';
import Alumnos from './pages/admin/Alumnos';
import Cartilla from './pages/admin/Cartilla';
import Dashboard from './pages/Dashboard'
import Profesor from './pages/admin/Profesor';
import Tareas from './pages/admin/Tareas';
import Tps from './pages/admin/Tps';
import Meet from './pages/admin/Meet';
import Materias from './pages/admin/Materias';
import Video from './pages/admin/Video';
import Biblioteca from './pages/admin/Biblioteca';
import Notificacion from './pages/admin/Notificacion';
import Password from './pages/admin/Password';
import Reproductor from './pages/admin/Reproductor';
import Error404 from './components/Error404';
import MeetDoc from './pages/admin/MeetProfesores';
import LibretaNotas from './pages/admin/LibretaNotas';

const router = createHashRouter([
  {

    path: '/',
    element: <LayoutLogin />,
    children: [
      {
        index: true,
        element: (<AuthProtectedRoute> <LoginAdmin /> </AuthProtectedRoute>),
      },
    ]
  },

  { //rutas protegidas para el docente
    path: 'panel',
    element: <Layout />,
    children: [
      {
        path: "aulas",
        element: (<ProtectedRouteAdmin> <Aulas /> </ProtectedRouteAdmin>)
      },
      {
        path: "materias",
        element: (<ProtectedRouteAdmin> <Materias /> </ProtectedRouteAdmin>)
      },
      {
        path: 'alumnos',
        element: (<ProtectedRouteAdmin> <Alumnos /> </ProtectedRouteAdmin>)
      },
      {
        path: 'cartilla',
        element: (<ProtectedRouteProfesor> <Cartilla /> </ProtectedRouteProfesor>),
      },
      {
        path: 'tps',
        element: (<ProtectedRouteProfesor> <Tps /> </ProtectedRouteProfesor>),
      },
      {
        path: 'profesor',
        element: (<ProtectedRouteAdmin> <Profesor /> </ProtectedRouteAdmin>),
      },
      {
        path: 'tareas',
        element: (<ProtectedRouteProfesor> <Tareas /> </ProtectedRouteProfesor>),
      },
      {
        path: 'biblioteca',
        element: (<ProtectedRouteProfesor> <Biblioteca /> </ProtectedRouteProfesor>),
      },
      {
        path: 'video_conferencia',
        element: (<ProtectedRouteProfesor> <Meet /> </ProtectedRouteProfesor>),
      },
      {
        path: 'meet_profesor',
        element: (<ProtectedRouteProfesor> <MeetDoc /> </ProtectedRouteProfesor>),
      },
      {
        path: 'video',
        element: (<ProtectedRouteProfesor> <Video /> </ProtectedRouteProfesor>),
      },
      {
        path: 'video/:video_id',
        element: (<ProtectedRouteProfesor> <Reproductor /> </ProtectedRouteProfesor>),
      },
      {
        path: 'notificaciones',
        element: (<ProtectedRouteProfesor> <Notificacion /> </ProtectedRouteProfesor>),
      },
      {
        path: 'password',
        element: (<ProtectedRouteProfesor> <Password /> </ProtectedRouteProfesor>),
      },
      {
        path: 'libretas',
        element: (<ProtectedRouteProfesor> <LibretaNotas /> </ProtectedRouteProfesor>),
      },
      {
        index: true,
        element: (<ProtectedRouteProfesor> <Dashboard/> </ProtectedRouteProfesor>)
      },
      {
        path: '*',
        element:  (<ProtectedRouteProfesor> <Error404/> </ProtectedRouteProfesor>)
      },


    ]
  }
])

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f3d36c',
    },
    secondary: {
      main: '#fd8686',
    },
    error: {
      main: '#f30000',
    },
    success: {
      main: '#6ec072'
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </ThemeProvider>
  </>
)
