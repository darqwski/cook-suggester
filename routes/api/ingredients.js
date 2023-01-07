const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/API/ingredients/", (req, res, next) => {
  res.send([
    {
      id: 1,
      name: "chicken breast",
    },
    {id: 2,
      name: "rice",
    },
    {id: 3,
      name: "tomato puree"
    },
    {id: 4,
      name: "minced meat"
    },
  ]);
});

module.exports = router;
