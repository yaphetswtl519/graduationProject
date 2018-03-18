var express = require('express');
var router = express.Router();
var fs = require('fs');

/* 首页 */
router.get('/', function(req, res, next) {
  fs.readFile('public/json/student.json', 'utf8', (err, student) => {
    if (err) throw err;
    fs.readFile('public/json/cooperation.json', 'utf8', (err, cooperation) => {
      if (err) throw err;
      res.render('index', {
        title: 'duyi',
        studentInfo: JSON.parse(student),
        cooperationInfo: JSON.parse(cooperation)
      })
    });
  });
  
});

/* 课程学习页 */



/* 学员展示页 */

/* 关于页 */

module.exports = router;
