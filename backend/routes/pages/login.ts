import { Request, Response } from "express";
import { provideDataToRender } from "../../utils/rendering-utils";
const express = require('express');
const router = express.Router();

router.get('/login', provideDataToRender, (req: Request, res: Response) => {
    res.render('index');
});


module.exports = router;