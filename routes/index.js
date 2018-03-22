const express = require('express');
const router = express.Router();
const fs = require('fs');

/* 首页 */
router.get('/', (req, res, next) => {
  fs.readFile('public/json/index.json', 'utf8', (err, indexData) => {
    if (err) throw err;
    indexData = JSON.parse(indexData);
    res.render('index', {
      title: 'duyi',
      studentInfo: indexData.student,
      cooperationInfo: indexData.cooperation
    });
  });
});

/* 课程学习页 */
router.get('/study', (req, res, next) => {
  res.render('study');
});


/* 学员展示页 */

/* 关于页 */

module.exports = router;
