import 'bootstrap/dist/js/bootstrap.min.js'
import './includes/jquery-ui';
import markdown from './includes/markdown';

import pageInit from  './pages/pageInit';
import headerInit from './pages/headerInit';
import indexInit from './pages/indexInit';
import studyInit from './pages/studyInit';
import aboutInit from './pages/aboutInit';
import loginInit from './pages/loginInit';
import adminInit from './pages/adminInit';
import detailInit from './pages/detailInit';
import showListInit from './pages/showListInit';


window.onload = () => {
    if (window.location.pathname === '/login') {
        return loginInit();
    }
    if (window.location.pathname === '/admin/essay/list') {
        return showListInit();
    }
    if (window.location.pathname === '/admin/essay/new'
        || window.location.pathname.startsWith('/admin/essay/update')
    ) {
        return adminInit();
    }
    if (window.location.pathname.startsWith('/essay/')) {
        return detailInit();
    }
    // 元素translate
    pageInit();
    // header
    headerInit();
    if (window.location.pathname === '/study') {
        let wcli = $('.icon-wechat');
        let wcdiv = wcli.find('.wechat-div');
        wcli.on('mouseenter', () => {
         wcdiv.show();
        });
        wcli.on('mouseleave', () => {
            wcdiv.hide();
        });
    
        $('.article-summary').each((ind, item) => {
            $(item).html(markdown.toHTML($(item).html()));
        });
    } else if (window.location.pathname === '/daily') {
        studyInit();
    } else if (window.location.pathname === '/about') {
        aboutInit();
    } else {    
        indexInit();
    }
};