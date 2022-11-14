import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { AppForm } from "../components/form";
import { TextField } from "../components/textField";
import { login } from "../utils/firebase/auth";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const initialValues: LoginFormValues = { email: "", password: "" };
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div>
      <p>Login Page</p>
      <AppForm
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          console.log({ values, actions });
          setLoading(true);
          try {
            await login(values.email, values.password);
            navigate("/profile");
          } catch (e) {
            console.error(e);
          } finally {
            setLoading(false);
          }
          actions.setSubmitting(false);
        }}
      >
        <TextField formName="email" label="Email" />
        <TextField formName="password" label="Password" />
        <Button type="submit" loading={loading}>
          Submit
        </Button>
      </AppForm>
    </div>
  );
};

export const loginLoader = () => "done";

export default Login;
