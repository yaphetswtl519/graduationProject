import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery';
import './includes/jquery-ui';
import '../css/includes/jquery.fullPage.css';
import '../css/index.less';
import '../css/study.less';
import '../css/student.less';
import '../css/about.less';

import pageInit from  './pages/pageInit';
import headerInit from './pages/headerInit';
import indexInit from './pages/indexInit';
import studyInit from './pages/studyInit';
import studentInit from './pages/studentInit';
import aboutInit from './pages/aboutInit';

window.onload = () => {
    // 元素translate
    pageInit();
    // header
    headerInit();

    if (window.location.pathname === '/study') {
        studyInit.init();
    } else if (window.location.pathname === '/student') {
        studentInit();
    } else if (window.location.pathname === '/about') {
       aboutInit();
    } else {    
        // 解决carousel和jquery.fullPage.css冲突
        $('#duyi-carousel').css('float', 'none');  
        indexInit();
    }
};

window.onresize = () => {
    if (window.location.pathname === '/study') {
        studyInit.changeImageRatio();
    }
};