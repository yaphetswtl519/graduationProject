import 'bootstrap/dist/js/bootstrap.min.js'
// import './includes/jquery-ui';

import pageInit from  './pages/pageInit';
import headerInit from './pages/headerInit';
import indexInit from './pages/indexInit';
import studyInit from './pages/studyInit';
// import studymobileInit from './pages/studymobileInit';
import studentInit from './pages/studentInit';
import aboutInit from './pages/aboutInit';

window.onload = () => {
    // 元素translate
    pageInit();
    // header
    headerInit();
    if (window.location.pathname === '/study') {
        studyInit();
    } else if (window.location.pathname === '/student') {
        studentInit();
    } else if (window.location.pathname === '/about') {
        aboutInit();
    } else {    
        // 解决carousel和jquery.fullPage.css冲突
        // $('#duyi-carousel').css('float', 'none');
        indexInit();
    }
};

// window.onresize = () => {
//     if (window.location.pathname === '/study') {
//         studyInit.changeImageRatio();
//     }
// };