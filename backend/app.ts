import http from "http";
import { onApplicationError, onServerError } from "./utils/server-handlers";
import serverConfiguration from "./server-config.json";
import express from "express";
// @ts-ignore
import createError from "http-errors";
import path from "path";
// @ts-ignore
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

const routes = require("./routes/");

// view engine setup
app.set("views", path.join(__dirname, "../../public"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/", routes);
app.use(cookieParser("SecretKey"));

app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../public/img")));
app.use((req, res, next) => {
  console.log(req.path);
  next(createError(404));
});
app.use(onApplicationError);
app.set("port", serverConfiguration.serverPort);

const server = http.createServer(app);
server.listen(serverConfiguration.serverPort);
server.on("error", onServerError);
server.on("listening", () =>
  console.log(`Server started on port: ${serverConfiguration.serverPort}`)
);