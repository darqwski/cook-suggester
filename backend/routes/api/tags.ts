import express, { Request, Response } from "express";
import { queryAllTags } from "./tags.utils";
const router = express.Router();

//TODO CRUD for tags
router.get("/API/tags/", async (req: Request, res: Response) => {
  const tags = await queryAllTags();
  res.send(tags);
});

module.exports = router;
