var express = require('express');
var router = express.Router();

/* 首页 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 课程学习页 */



/* 学员展示页 */

/* 关于页 */

module.exports = router;
