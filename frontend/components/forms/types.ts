import { HTMLProps, ReactElement } from "react";

export interface IFormInput extends HTMLProps<HTMLInputElement>{
  label: string;
  name: string;
  white?: boolean;
}

export interface IWithLabel {
  label: string;
  white?: boolean;
  children: ReactElement
}