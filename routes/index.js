const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const db = 'mongodb://localhost:27017/blog';
const Index = require('../app/controller/index');
const User = require('../app/controller/user');
const Essay = require('../app/controller/essay');

mongoose.connect(db);

router.use(session({
    secret: 'essay',
    store: new mongoStore({
        url: db,
        collection: 'sessions'
    })
}));

router.use(function(req, res, next) {
    let _user = req.session.user;
    res.locals.user = _user;
	next();
});

mongoose.connection.on('connected', () => {
	console.log(`Mongoose connected to ${db}`);
});

mongoose.connection.on('error', (err) => {
	console.log(`Mongoose connection error ${err}`);
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose disconnected');
});


router.post('/login/user', User.signin);

router.get('/admin/essay/list', User.signinRequired, Essay.showList);
router.get('/admin/essay/new', User.signinRequired, Essay.new);
router.post('/admin/essay', User.signinRequired, Essay.save);
router.get('/admin/essay/update/:id', User.signinRequired, Essay.update);
router.delete('/admin/essay/delete', User.signinRequired, Essay.delete);

router.get('/essay/:id', Essay.detail);
router.post('/essay/comments', Essay.commentsSave);

router.get('/page', Index.page);

router.get('/', (req, res, next) => {
  fs.readFile('public/json/index.json', 'utf8', (err, indexData) => {
    if (err) throw err;
    indexData = JSON.parse(indexData);
    res.render('index', {
      title: 'WTL',
      studentInfo: indexData.student,
      teacherInfo: indexData.teacher,
      cooperationInfo: indexData.cooperation
    });
  });
});

router.get('/study', Index.render);

router.get('/daily', (req, res, next) => {
	fs.readFile('public/json/study.json', 'utf8', (err, studyData) =>{
		if (err) throw err;
		studyData = JSON.parse(studyData);
		res.render('study', {
			title: 'WTL',
			lessons: studyData.lessons,
			exercises: studyData.exercises
		});
	});
});

router.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'WTL'
  });
});

router.get('/login', (req, res) => {
	if (req.session.user) {
		res.redirect('admin/essay/list');
	} else {
		res.render('login');
	}
});

router.get('/logout', User.signout);

module.exports = router;
