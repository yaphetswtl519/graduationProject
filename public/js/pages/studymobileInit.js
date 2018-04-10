import IScroll from 'iscroll/build/iscroll.js';
import pageSwitch from 'pageSwitch';

export default function () {
    let pageSwitchCache = [];
    $('.duyi-study-curriculum-web-detail')
        .each((index, item) => {
            pageSwitchCache.push(new pageSwitch($(item).attr('id'), {
                duration: 1000,
                start: 0,
                direction: 1,
                loop: false,
                ease: 'ease',
                transition: 'slide',
                mouse: false,
                arrowkey: false
            }));
        });
    new IScroll('.duyi-study-exercises-content', {
        scrollX: true,
        scrollY: false
    });
}