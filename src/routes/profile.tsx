import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { AppUser, getCurrentUser, logout } from "../utils/firebase/auth";

interface ProfileLoaderData {
  user: AppUser;
}

const Profile = () => {
  const { user } = useLoaderData() as ProfileLoaderData;
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
      </div>
      <Button onClick={handleLogout} loading={loading}>
        Logout
      </Button>
    </div>
  );
};

export const profileLoader = async (): Promise<ProfileLoaderData> => {
  const user = await getCurrentUser();
  return { user };
};

export default Profile;
