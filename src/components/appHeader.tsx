import React, { useEffect } from "react";
import { Link, useNavigation, useNavigate } from "react-router-dom";
import { useAuthState } from "../utils/firebase";
import { ROUTES } from "../utils/routeNames";

export const AppHeader = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [user, loading] = useAuthState();
  useEffect(() => {
    console.log(user);
    if (
      !loading &&
      navigation?.location?.pathname?.startsWith(ROUTES.PROFILE) &&
      user === null
    ) {
      navigate(ROUTES.HOME);
    }
    // if (navigation.location?.pathname)
  }, [loading, user, navigation]);

  return (
    <header className="App-header">
      <Link className="App-link" to={ROUTES.HOME}>
        Home
      </Link>
      {user ? (
        <>
          <Link className="App-link" to={ROUTES.PROFILE}>
            {user?.email}
          </Link>
        </>
      ) : (
        <>
          <Link className="App-link" to={ROUTES.REGISTER}>
            Register
          </Link>
          <Link className="App-link" to={ROUTES.LOGIN}>
            Login
          </Link>
        </>
      )}
    </header>
  );
};
