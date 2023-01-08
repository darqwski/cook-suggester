import React from "react";
import { IWithLabel } from "./types";

const WithLabel: React.FC<IWithLabel> = ({
  children,
  label,
  white = false,
}) => {
  return (
    <div>
      {label && <label className={white ? "white-text" : ""}>{label}</label>}
      {children}
    </div>
  );
};

export default WithLabel;
