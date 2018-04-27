'use strict';
const UserModel = require('../models/user');
module.exports = {
    //登陆
    signin: (req, res) => {
        let user = req.body,
            {name, password} = user;
        UserModel.findOne({name: name}, (err, result) => {
            if (err) {
                console.log(err);
            }
            if (!result) {
                var _user = new UserModel({
                    name: name,
                    password: password
                });
                _user.save(() => {
                    console.log('success');
                });
                return res.redirect('/login');
            }
            result.comparePassword(password, (err, compareResult) => {//验证密码
                if (err) {
                    console.log(err);
                }
                if (compareResult) {//成功
                    console.log(result);
                    req.session.user = result;
                    console.log('login success'); 
                    res.json({
                        loginStatus: true
                    });

                }else {//失败
                    console.log('password is not correct!');
                    return res.json({
                        loginStatus: false
                    });
                    // return res.redirect('/login');
                }
            });
        });
    },
    signout: (req, res) => {
        delete req.session.user;
        res.redirect('/');
    },
    signinRequired: (req, res, next) => {
        let user = req.session.user;
	    if (!user) {
		    return res.redirect('/login');
	    }
        next();
    }
};