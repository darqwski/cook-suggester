const express = require("express");
const router = express.Router();

//TODO
//update commonness in ingredients
//update recipeSuggestedTimes in recipe
router.post("/API/suggestions/", (req, res, next) => {

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
