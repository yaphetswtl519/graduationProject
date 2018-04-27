import IScroll from 'iscroll/build/iscroll.js';

export default function () {
    new IScroll('.duyi-study-curriculum-web-content', {
        scrollX: true,
        scrollY: false
    });
    new IScroll('.duyi-study-exercises-content', {
        scrollX: true,
        scrollY: false
    });
}