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
      teacherInfo: indexData.teacher,
      cooperationInfo: indexData.cooperation
    });
  });
});

/* 课程学习页 */
router.get('/study', (req, res, next) => {
  fs.readFile('public/json/study.json', 'utf8', (err, studyData) =>{
    if (err) throw err;
    studyData = JSON.parse(studyData);
    res.render('study', {
      lessons: studyData.lessons,
      exercises: studyData.exercises
    });
  });
});

/* 学员展示页 */
router.get('/student', (req, res, next) => {
  fs.readFile('public/json/student.json', 'utf8', (err, studentData) => {
    if (err) throw err;
    studentData = JSON.parse(studentData);
    res.render('student', {
      employmentList: studentData.employmentList,
      activityList: studentData.activityList,
      productionList: studentData.productionList
    });
  });
});

/* 关于页 */
router.get('/about', (req, res, next) => {
  res.render('about')
});

module.exports = router;
