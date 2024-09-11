// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, Exchange, News, CryptoDetail } from './pages/index.js';
import { ChakraProvider } from '@chakra-ui/react';
// import theme from './theme';

// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/exchange',
        element: <Exchange />,
      },
      {
        path: '/news',
        element: <News />,
      },
      {
        path: '/:coinId',
        element: <CryptoDetail />,
      },
    ],
  },
]);

// Render the application
createRoot(document.getElementById('root')).render(
  <ChakraProvider >
    <RouterProvider router={router} />
  </ChakraProvider>
);
