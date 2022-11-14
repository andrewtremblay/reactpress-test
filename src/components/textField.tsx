import React from "react";
import { Field } from "formik";

type TextFieldProps = {
  formName: string;
  label: string;
  id?: string;
  placeholder?: string;
};

export const TextField = ({
  formName,
  label,
  id,
  placeholder,
}: TextFieldProps) => {
  const safeId = id || formName;
  return (
    <div className="App-textfield">
      <label htmlFor={safeId}>{label}</label>
      <Field id={safeId} name={formName} placeholder={placeholder} />
    </div>
  );
};
