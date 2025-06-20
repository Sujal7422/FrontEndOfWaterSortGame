import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Playground from './components/Playground/Playground.jsx';
import Difficulty from './components/Playground/Difficulty.jsx';
import Levels from './components/Playground/Levels.jsx';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import About from './components/About/About.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // 👇 Redirect root `/` to `/About`
      { index: true, element: <Navigate to="/About" replace /> },

      { path: 'About', element: <About /> },
      { path: 'Register', element: <Register /> },
      { path: 'Dashboard', element: <Dashboard /> },
      { path: 'Login', element: <Login /> },
      { path: 'Playground', element: <Playground /> },
      { path: 'Playground/:Difficulty', element: <Difficulty /> },
      { path: 'Playground/:Difficulty/:Levels', element: <Levels /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
