import * as React from "react";
import { Formik, Form, FormikConfig, FormikValues } from "formik";

type AppFormProps = FormikConfig<FormikValues> & { children: any };

export const AppForm = ({ children, ...rest }: AppFormProps) => {
  return (
    <Formik {...rest}>
      <Form className="App-form">{children}</Form>
    </Formik>
  );
};
