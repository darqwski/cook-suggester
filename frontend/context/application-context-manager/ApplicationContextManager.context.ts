import { createContext, useContext } from "react";
import { IApplicationContext } from "./ApplicationContextManager.types";

export const ApplicationContext =createContext<IApplicationContext>({});

export const useApplicationContext = (): IApplicationContext => useContext(ApplicationContext);