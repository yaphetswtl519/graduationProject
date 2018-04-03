import DialRotate from '../dialRotate';
import pageSwitch from 'pageSwitch';
import data from '../../json/student.json';

let index = 0,
    d = 0;
let rotateCb = (degree) => {
    let {productionList} = data;
    let production;
    // degree = degree > productionList.length - 1 ? productionList.length - 1 : degree; 
    console.log(degree);
    function render () {
        $('.duyi-student-production-row')
            .find('img')
            .attr('src', production.img);
        $('.duyi-student-production-right-title').text(production.title);
        $('.duyi-student-production-p-fir').text(production.fir);
        $('.duyi-student-production-p-sec').text(production.sec);
    }
    if (degree > d) {
        index = (index + 1) > productionList.length - 1 ? 0 : (index + 1);
        production = productionList[index];
        render();
    } else if (degree < d) {
        index = (index - 1) < 0 ? (productionList.length - 1) : (index - 1)
        console.log(index);
        production = productionList[index];
        render();
    }
    d = degree;
};
export default function () {
    new DialRotate({
        debug: false,
        inertia: false,
        trigger: $('.duyi-student-production-dial-wrapper'),
        wrapper: $('.duyi-student-production-dial-wrapper div')
    }, rotateCb);
    let activityPS = new pageSwitch('duyi-student-activity-wrapper', {
        duration: 1000,
        start: 0,
        direction: 1,
        loop: false,
        ease: 'ease',
        transition: 'flip3dY',
        mouse: false,
        arrowkey: false
    });
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