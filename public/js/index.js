import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery';
import './includes/jquery-ui';
import '../css/includes/jquery.fullPage.css';
import '../css/index.less';
import '../css/study.less';
import '../css/student.less';
import '../css/about.less';

import headerInit from './pages/headerInit';
import indexInit from './pages/indexInit';
import studyInit from './pages/studyInit';
import studentInit from './pages/studentInit';

window.onload = () => {
    headerInit();
    if (window.location.pathname === '/study') {
        studyInit.init();
    } else if (window.location.pathname === '/student') {
        studentInit();
    } else if (window.location.pathname === '/about') {
        let map = new BMap.Map("duyi-about-map-container");
        let point = new BMap.Point(126.65771686,45.77322463);
        let marker = new BMap.Marker(point);
        map.centerAndZoom(point, 17);
        map.enableScrollWheelZoom(true);
	    map.addOverlay(marker);
	    marker.setAnimation(BMAP_ANIMATION_BOUNCE);
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