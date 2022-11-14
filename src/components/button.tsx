import React from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { loading?: boolean };

export const Button = ({ children, loading, ...rest }: ButtonProps) => {
  return (
    <div className="App-button">
      <button {...rest}>
        {children} {loading && "..."}
      </button>
    </div>
  );
};
