import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ErrorPage from "./error";
import Root, { rootLoader } from "./routes/_root";
import Register, { registerLoader } from "./routes/register";
import Home, { homeLoader } from "./routes/home";
import Login, { loginLoader } from "./routes/login";
import Profile, { profileLoader } from "./routes/profile";

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
        loader: homeLoader,
      },
      {
        path: "/register",
        element: <Register />,
        loader: registerLoader,
      },
      {
        path: "/login",
        element: <Login />,
        loader: loginLoader,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: profileLoader,
      },
    ],
  },
]);

console.warn("App");

function App() {
  return <RouterProvider router={router} />;
}

export default App;
