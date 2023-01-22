import express from "express";
import listOfRoutes from "./list-of-routes";
const router = express.Router();

listOfRoutes.forEach(subRouter=>router.use(require(subRouter)));

module.exports = router

