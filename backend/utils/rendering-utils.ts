import { Request } from "express";

export const provideDataToRender = (request: Request) => {
  // @ts-ignore
  const { user  } = request.session

  return  { sessionData: { user } }
}