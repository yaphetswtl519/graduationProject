import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'jquery';
import './includes/jquery-ui';
import './includes/jquery.fullPage';
import './includes/jquery.slimscroll';
import IScroll from 'iscroll/build/iscroll.js';
import '../css/includes/jquery.fullPage.css';
import '../css/index.less';
import '../css/study.less';
import PhotoApp from './imageShow.js';
import PosterMove from './posterMove.js';


(function init () {
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
        if (scrollTop && scrollTop > 110) {
            $header.removeClass(headerFSM.show).addClass(headerFSM.hide);
            $headerLiLine.removeClass(headerLineFSM.show).addClass(headerLineFSM.hide);
            $headerButton.removeClass(buttonFSM.hide).addClass(`${buttonFSM.transiton} ${buttonFSM.show}`);
            $headerLi.each((index, item) => {
                $(item).css({
                    transform: `translateX(${moveDis[index]}px)`,
                    visibility: 'hidden',
                    opacity: 0
                });
            });
        } else {
            toggleButton();
        }
    };
    
    let $teacherWrapper = $('.duyi-teacher-wrapper');
    let teacherBoxOffset = [0, 281, -380, -100, -304, -24];
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

    new PhotoApp({
        padding: 11
    });

    let $posterImg = $('.duyi-study-poster-img');
    let myscroll;
    let changeImageRatio = () => {
        let url = $posterImg.css('backgroundImage').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
        let img = new Image();
        img.src = url;
        img.onload = () => {
            let ratio = img.width / img.height;
            let width = $posterImg.width();
            let height = $posterImg.height();
            $posterImg.css({
                height: parseInt(width / ratio)
            });
        }
    };
    window.onload = () => {
        if (window.location.pathname === '/study') {
            // 解决fullpage插件对于高度计算不准确的问题
            $('html').addClass('fullpageHeight');

            $('.duyi-header').prependTo($('.duyi-study-poster')).css('position', 'absolute');
            $('.duyi-header-button').remove();

            changeImageRatio();                      
            myscroll = new IScroll('.duyi-study-exercises-content', {
                scrollX: true,
                scrollY: false
            });
            $('.duyi-study-fullpage').fullpage({
                // loopBottom: true,
                // loopTop: true,
                scrollOverflow: true,
                afterLoad: function(anchorLink, index) {
                    if (index === 4) {
                        // 触发最后一页的slimScroll滚动条的加载
                        $(window).trigger('resize');
                    }
                }
            });
            $('.duyi-study-consult')
                .find('.tableCell')
                .slimScroll({
                    height: '100%'
                })
                .css('overflow', 'auto');    
        } else {
            // 解决carousel和jquery.fullPage.css冲突
            $('#duyi-carousel').css('float', 'none');            
        }
    };
    window.onresize = () => {
        if (window.location.pathname === '/study') {
            changeImageRatio();
        }
    };
}());