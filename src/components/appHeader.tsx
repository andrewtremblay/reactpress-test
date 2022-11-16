import React, { useEffect } from "react";
import { Link, useNavigation, useNavigate } from "react-router-dom";
import { useAuthState } from "../utils/firebase";

export const AppHeader = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [user, loading] = useAuthState();
  useEffect(() => {
    console.log(user);
    if (
      !loading &&
      navigation?.location?.pathname?.startsWith("/profile") &&
      user === null
    ) {
      navigate("/");
    }
    // if (navigation.location?.pathname)
  }, [loading, user, navigation]);

  return (
    <header className="App-header">
      <Link className="App-link" to="/">
        Home
      </Link>
      {user ? (
        <>
          <Link className="App-link" to="/profile">
            {user?.email}
          </Link>
        </>
      ) : (
        <>
          <Link className="App-link" to="/register">
            Register
          </Link>
          <Link className="App-link" to="/login">
            Login
          </Link>
        </>
      )}
    </header>
  );
};
