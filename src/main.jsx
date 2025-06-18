import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Playground from './components/Playground/Playground.jsx';
import Levels from './components/Playground/Levels.jsx';
import Play from './components/Playground/Play.jsx';
import { RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'dashboard', element: <Dashboard /> },

      { path: 'playground', element: <Playground /> },
      { path: 'playground/:difficulty', element: <Levels /> },
      { path: 'playground/:difficulty/:Levels', element: <play /> },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
