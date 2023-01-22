import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

router.get("/moderator/add-recipe", (req: Request, res: Response) => {
  res.render("index");
});

module.exports = router;
