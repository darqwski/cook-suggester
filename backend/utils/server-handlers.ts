import { ErrorRequestHandler } from "express";

export const onServerError = (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  if(error.code === 'EACCES'){
    console.error('Port requires elevated privileges');
    process.exit(1);

    return;
  }
  if(error.code === 'EADDRINUSE') {
    console.error('Port is already in use');
    process.exit(1);

    return;
  }
  console.error(`Unknown Error: ${error.code}`);

  throw error;
}
export const onApplicationError: ErrorRequestHandler = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
  res.render('error');
}