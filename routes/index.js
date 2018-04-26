const express = require('express');
const router = express.Router();
const fs = require('fs');

/* 首页 */
router.get('/', (req, res, next) => {
  fs.readFile('public/json/index.json', 'utf8', (err, indexData) => {
    if (err) throw err;
    indexData = JSON.parse(indexData);
    res.render('index', {
      title: 'DUYI',
      studentInfo: indexData.student,
      teacherInfo: indexData.teacher,
      cooperationInfo: indexData.cooperation
    });
  });
});

/* 课程学习页 */
router.get('/study', (req, res, next) => {
  let ua = req.headers['user-agent'];
  fs.readFile('public/json/study.json', 'utf8', (err, studyData) =>{
    if (err) throw err;
    studyData = JSON.parse(studyData);
    // let page = /Android|webOS|iPhone|iPod|BlackBerry/i.test(ua) ? 'studymobile' : 'study';
    res.render('study', {
      title: 'DUYI',
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
      title: 'DUYI',
      employmentList: studentData.employmentList,
      activityList: studentData.activityList,
      productionList: studentData.productionList,
      campusList: studentData.campusList
    });
  });
});

/* 关于页 */
router.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'DUYI'
  });
});


module.exports = router;
