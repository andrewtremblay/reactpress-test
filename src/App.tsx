import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Root, { rootLoader } from "./routes/_root";
import Register, { registerLoader } from "./routes/register";
import Home from './routes/home';
import ErrorPage from './error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: registerLoader,
      },
      {
        path: "/register",
        element: <Register />,
        loader: registerLoader,
      },
    ],
  },
]);


function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;
