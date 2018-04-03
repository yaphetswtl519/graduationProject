import DialRotate from '../dialRotate';
import pageSwitch from 'pageSwitch';
import data from '../../json/student.json';

export default function () {
    // video 初始化
    let $video = $('.duyi-student-story-video').get(0),
        defaultPSOptions = {
            duration: 1000,
            start: 0,
            direction: 1,
            loop: false,
            ease: 'ease',
            mouse: false,
            arrowkey: false
        };
    $('.duyi-student-story-left-video-icon').on('click', function () {
        $video.play();
        $video.controls = true;
        $(this).hide();
        $('.duyi-student-story-left-video-time').hide();
    });

    let productionPS = new pageSwitch('duyi-student-production-ps-wrapper', Object.assign(defaultPSOptions, {
        transition: 'flip3dX'
    }));

    // dial 初始化
    new DialRotate({
        debug: false,
        inertia: false,
        trigger: $('.duyi-student-production-dial-wrapper'),
        wrapper: $('.duyi-student-production-dial-wrapper div')
    }, (degree) => {
        productionPS.slide(degree % 4);
    });

    // activity pageSwitch 初始化
    let activityPS = new pageSwitch('duyi-student-activity-wrapper', Object.assign(defaultPSOptions, {
        transition: 'flip3dY'
    }));
    $('.duyi-student-activity-ul').on('click', (e) => {
        let target = $(e.target),
            ind = target.index();
        if (!$(target).hasClass('duyi-student-activity-ul')) {
            activityPS.slide(ind);
            activityPS.on('after', () => {
                $('.duyi-student-activity-ul li').removeClass('duyi-student-activity-active');
                target.addClass('duyi-student-activity-active');
            });
        }
    });
}