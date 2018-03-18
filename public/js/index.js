import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery';
import '../css/index.less';
import PhotoApp from './imageShow.js';

function init () {
    let $header = $('.duyi-header');
    let $headerButton = $('.duyi-header-button');
    let $headerLi = $('.duyi-header-li');
    let $headerLiLine = $('.duyi-header-li-line');
    let moveDis = [500, 382, 262, 175];
    let buttonFSM = {
        hide: 'duyi-header-button-toggle-hide',
        show: 'duyi-header-button-toggle-show',
        transiton: 'duyi-header-button-toggle-transition'
    };
    let headerFSM = {
        hide: 'duyi-header-hide',
        show: 'duyi-header-show'
    };
    let headerLineFSM = {
        hide: 'duyi-header-li-line-hide',
        show: 'duyi-header-li-line-show'
    };
    let toggleButton = () => {
        $header.removeClass(headerFSM.hide).addClass(headerFSM.show);
        $headerButton.removeClass(buttonFSM.show).addClass(buttonFSM.hide);        
        $headerLiLine.removeClass(headerLineFSM.hide).addClass(headerLineFSM.show);
        $headerLi.each((index, item) => {
            $(item).css({
                transform: `translateX(0)`,
                visibility: 'visible',
                opacity: 1
            });
        });
    };
    $headerButton.on('click', () => {
        toggleButton();
    });
    window.onscroll = (e) => {
        let scrollTop = $(window).scrollTop();
        if (scrollTop) {
            $header.removeClass(headerFSM.show).addClass(headerFSM.hide);
            $headerLiLine.removeClass(headerLineFSM.show).addClass(headerLineFSM.hide);
            $headerLi.each((index, item) => {
                $(item).css({
                    transform: `translateX(${moveDis[index]}px)`,
                    visibility: 'hidden',
                    opacity: 0
                });
            });
            $headerButton.hasClass(buttonFSM.hide) && $headerButton.removeClass(buttonFSM.hide);
            $headerButton.addClass(`${buttonFSM.transiton} ${buttonFSM.show}`);
        } else {
            toggleButton();
        }
    };
    new PhotoApp({
        padding: 11
    });
}

init();