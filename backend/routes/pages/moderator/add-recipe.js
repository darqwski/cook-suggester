const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/moderator/add-recipe', (req, res, next) => {
  res.render('index');
});


module.exports = router;