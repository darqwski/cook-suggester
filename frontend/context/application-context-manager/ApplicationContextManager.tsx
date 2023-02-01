import React, { ReactElement } from "react";
import { ApplicationContext } from "./ApplicationContextManager.context";
import { IApplicationContext } from "./ApplicationContextManager.types";


const getSessionData = (): IApplicationContext => {
  const data = document.getElementById('session-data')?.innerHTML;

  if(!data) {
    return {}
  }

  const parsedData = JSON.parse(Buffer.from(data, 'base64').toString('ascii')) ;

  return parsedData as IApplicationContext
}

const ApplicationContextManager: React.FC<{children: ReactElement }> = ({ children }) => {
  const sessionData = getSessionData()
  return <ApplicationContext.Provider value={sessionData}>{children}</ApplicationContext.Provider>;
};

export default ApplicationContextManager;
