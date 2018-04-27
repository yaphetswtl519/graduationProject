'use strict';
const UserModel = require('../models/user');
const EssayModel = require('../models/essay');
const moment = require('moment');
const markdown = require('../../public/js/includes/markdown');

module.exports = {
    render: (req, res) => {
        let page = 1;
        const limit = 3;
        let totalView = 0;
        EssayModel.count().then((count) => {
            let pageSize = Math.ceil(count / limit);
            EssayModel.fetch((err, result) => {
                if (err) {
                    console.log(err);
                }
                result.forEach((item) => {
                    totalView += item.view;
                });
            });
            EssayModel.getMainPage(limit, (err, essays) => {
                if (err) {
                    console.log(err);
                }
                let essaysArr = essays.map((item ,index) => {
                    console.log(item);
                    let {_id, title, poster, author, summary, content, comments, view, origin} = item;
                    let obj = {
                        _id,
                        title,
                        poster,
                        author,
                        summary,
                        content,
                        comments,
                        createAt: moment(item.meta.createAt).format('MM/DD/YYYY'),
                        view,
                        origin
                    };
                    return obj;
                });
                res.render('first', {
                    essays: essaysArr,
                    page: page,
                    pageSize: pageSize,
                    count: count,
                    totalView: totalView
                });
            });
        });
        
    },
    page: (req, res) => {
        const limit = 3;
        let page = (req.query && req.query.p) || 1;
        let skip = (page - 1) * limit;
        let totalView = 0;
        EssayModel.count().then((count) => {
            let pageSize = Math.ceil(count / limit);
            EssayModel.fetch((err, result) => {
                if (err) {
                    console.log(err);
                }
                result.forEach((item) => {
                    totalView += item.view;
                });
            });
            EssayModel.turnPage(skip, limit, (err, essays) => {
                if (err) {
                    console.log(err);
                }
                let essaysArr = essays.map((item ,index) => {
                    let {_id, title, poster, author, summary, content, comments, view, origin} = item;
                    let obj = {
                        _id,
                        title,
                        poster,
                        author,
                        summary,
                        content,
                        comments,
                        createAt: moment(item.meta.createAt).format('MM/DD/YYYY'),
                        view,
                        origin
                    };
                    return obj;
                });
                res.render('first', {
                    essays: essaysArr,
                    page: page,
                    pageSize: pageSize,
                    count: count,
                    totalView: totalView
                });
            });
        });
        
    },
    link: (req, res) => {
        res.render('link');
    },
    about: (req, res) => {
        res.render('about');
    }
};