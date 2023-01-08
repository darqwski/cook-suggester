const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/API/suggestions/", (req, res, next) => {
    res.send([
        {
            id: 1,
            name: "Spaghetti",
        },
        {
            id: 2,
            name: "Chicken with tomatoes",
        }
    ]);
});

module.exports = router;
