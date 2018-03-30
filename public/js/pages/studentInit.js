import DialRotate from '../dialRotate';

export default function () {
    new DialRotate({
        debug: false,
        inertia: false,
        trigger: $('.duyi-student-production-dial-wrapper'),
        wrapper: $('.duyi-student-production-dial-wrapper div')
    });
}