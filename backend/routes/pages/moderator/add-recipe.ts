import express, { Request, Response } from "express";
import { provideDataToRender } from "../../../utils/rendering-utils";
const router = express.Router();

router.get("/moderator/add-recipe", (req: Request, res: Response) => {
  res.render("index", provideDataToRender(req));
});

module.exports = router;
