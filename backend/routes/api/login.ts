import express, { Request, Response } from "express";
import { ILoginPayload } from "../../../global-types/login";

const router = express.Router();

router.post("/API/login/", async (req: Request, res:Response) => {
  const { password, login } = req.body as ILoginPayload

  console.log(req.session)
  //@ts-ignore
  req.session.login = login
  res.send({ message: "ok" });
});

module.exports = router;
