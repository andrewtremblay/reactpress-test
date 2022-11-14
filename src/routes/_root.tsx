import React from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "../components/appHeader";
import { AppUser, getCurrentUser } from "../utils/firebase/auth";

type RootLoaderData = {
  user: AppUser;
};

const Root = () => {
  return (
    <div className="App">
      <AppHeader />
      <div className="App-page">
        <Outlet />
      </div>
    </div>
  );
};

export const rootLoader = async (): Promise<RootLoaderData> => {
  const user = await getCurrentUser();
  return { user };
};

export default Root;
