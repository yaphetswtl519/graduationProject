import PhotoApp from '../imageShow.js';
import PosterMove from '../posterMove.js';
import '../includes/jquery-rebox';
import slideInit from '../includes/studentEffects';
export default function () {
    let $teacherWrapper = $('.duyi-teacher-wrapper'),
        teacherBoxOffset = [0, 281, -380, -100, -304, -24];
    $teacherWrapper.each((index, item) => {
        $(item).css({
            left: index % 2 ? '50.33%' : '0',
            top: `${teacherBoxOffset[index]}px`
        });
        new PosterMove({
            movement: .3,
            speed: 79
        }, $(item));
    });
    
    slideInit();
    // 图片放大
    // new PhotoApp();
    $('.duyi-student-photo').rebox({ selector: 'a' })    
}