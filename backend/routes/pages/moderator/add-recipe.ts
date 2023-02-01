import express, { Request, Response } from "express";
import { provideDataToRender } from "../../../utils/rendering-utils";
const router = express.Router();

router.get("/moderator/add-recipe", provideDataToRender, (req: Request, res: Response) => {
  res.render("index");
});

module.exports = router;
