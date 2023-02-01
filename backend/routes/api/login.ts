import express, { NextFunction, Request, Response } from "express";
import { ILoginPayload } from "../../../global-types/login";
import { HmacSHA512 } from "crypto-js";
import { salt } from "../../secrets.json";
import { executeQuery } from "../../utils/database-utils";
import { IUser } from "../../../global-types/user";

const router = express.Router();

router.post("/API/login/", async (req: Request, res: Response) => {
  const { password, login } = req.body as ILoginPayload;

  if (!login || !password) {
    res.status(400);
    return res.send({ message: "Missing parameters" });
  }
  const result = await executeQuery<IUser & { userPassword?: string }>(
    "SELECT * FROM users WHERE userLogin = ?",
    [login]
  );

  if (result.length !== 1) {
    res.status(400);
    return res.send(
      { message: "Provided user does not exists, password or login is wrong" }
    );
  }

  const [user] = result
  const passwordFromDb = user.userPassword;
  const hashedPassword = HmacSHA512(password || '', salt).toString();

  if (hashedPassword !== hashedPassword) {
    res.status(400);
    return res.send(
      { message: "Provided user does not exists, password or login is wrong" }
    );
  }

  delete user.userPassword;
  //@ts-ignore
  req.session.user = user;
  res.send({ message: "Logged in" });
});
router.post("/API/logout/", async (req: Request, res: Response, next: NextFunction) => {
  await new Promise(resolve => req.session.destroy(resolve));
  // @ts-ignore
  req.session.loggedOut = true
  res.redirect('/')
} );

module.exports = router;
