import { Request, Response, NextFunction } from "express";

export const provideDataToRender = (request: Request, response: Response, next: NextFunction) => {
  // @ts-ignore
  const { user } = request.session

  response.locals.sessionData = Buffer.from(JSON.stringify({ user })).toString('base64')

  next()
}