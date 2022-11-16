import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ErrorPage from "./error";
import Root, { rootLoader } from "./routes/_root";
import Register, { registerLoader } from "./routes/register";
import Home, { homeLoader } from "./routes/home";
import Login, { loginLoader } from "./routes/login";
import Profile, { profileLoader } from "./routes/profile";
import { rootPath, ROUTES } from "./utils/routeNames";

const router = createBrowserRouter([
  {
    path: rootPath,
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
        loader: registerLoader,
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
        loader: loginLoader,
      },
      {
        path: ROUTES.PROFILE,
        element: <Profile />,
        loader: profileLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
