import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { AppUser, getCurrentUser, logout } from "../utils/firebase/auth";
import { startCheckout } from "../utils/stripe";
// import { getSubscriptionProducts } from "../utils/stripe";

interface ProfileLoaderData {
  user: AppUser;
  session: any;
}

const Profile = () => {
  const { user, session } = useLoaderData() as ProfileLoaderData;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setLoading(true);
    logout();
    setLoading(false);
    navigate("/");
  };
  return (
    <div>
      <p>Profile</p>
      <div>
        <p>{user?.email}</p>
        <div>{JSON.stringify(session)}</div>
      </div>
      <Button onClick={handleLogout} loading={loading}>
        Logout
      </Button>
    </div>
  );
};

export const profileLoader = async (): Promise<ProfileLoaderData> => {
  const user = await getCurrentUser();
  const session = await startCheckout();
  return { user, session };
};

export default Profile;
