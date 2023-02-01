import { Request, Response } from "express";
import { provideDataToRender } from "../../utils/rendering-utils";
const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    // This might be needed one day
    // req.session.loggedOut
    res.render('index', provideDataToRender(req));
});


module.exports = router;