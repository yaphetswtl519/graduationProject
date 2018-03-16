var express = require('express');
var router = express.Router();
var fs = require('fs');

/* 首页 */
router.get('/', function(req, res, next) {
  fs.readFile('public/json/student.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.render('index', {
      title: 'duyi',
      studentInfo: JSON.parse(data)
    });
  });
});

/* 课程学习页 */



/* 学员展示页 */

/* 关于页 */

module.exports = router;
