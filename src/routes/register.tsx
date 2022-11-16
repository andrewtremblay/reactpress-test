import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../utils/firebase";
import { Button } from "../components/button";
import { AppForm } from "../components/form";
import { TextField } from "../components/textField";

interface RegistrationFormValues {
  email: string;
}

const Register = () => {
  const initialValues: RegistrationFormValues = { email: "" };
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <div>
      <p>Registration Page</p>
      <AppForm
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          console.log({ values, actions });
          setLoading(true);
          try {
            await register(values.email, values.password);
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

export const registerLoader = () => "done";

export default Register;
