import { ReactElement } from "react";

export interface IFormInput {
  label: string;
  name: string;
  white?: boolean;
}

export interface IWithLabel {
  label: string;
  white?: boolean;
  children: ReactElement
}