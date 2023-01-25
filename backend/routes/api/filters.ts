import express, { Request, Response } from "express";
import { queryAllTags } from "./tags.utils";
import { queryFilters } from "./filters.utils";
const router = express.Router();

//TODO CRUD for filters
router.get("/API/filters/", async (req: Request, res: Response) => {
  const filters = await queryFilters();
  res.send(filters);
});

module.exports = router;
