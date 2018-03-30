import IScroll from 'iscroll/build/iscroll.js';
import pageSwitch from 'pageSwitch';
import '../includes/jquery.fullPage';
import '../includes/jquery.slimscroll';

export default {
    myscroll: null,
    changeImageRatio () {
        let $posterImg = $('.duyi-study-poster-img')
        let url = $posterImg
            .css('backgroundImage')
            .replace(/^url\(["']?/, '')
            .replace(/["']?\)$/, '');
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
    },
    curriculumAnimate (options) {
        let $target = $(`.duyi-study-curriculum-${options.target}`);
        let $originTitle = $(`.duyi-study-curriculum-${options.origin}-title`);
        let $targetTitle = $(`.duyi-study-curriculum-${options.target}-title`);
        let $targetDetailWrapper = $(`.duyi-study-curriculum-${options.target}-detail-wrapper`);
        let $originDetailWrapper = $(`.duyi-study-curriculum-${options.origin}-detail-wrapper`);
        let param = {
            opacity: 1,
            fontSize: '3vw',
            whiteSpace: 'nowrap',
            height: '10vw',
            lineHeight: '10vw',
            transform: 'translateY(-50%) rotate(-90deg)'
        };

        $originTitle.on('click', function () {
            $(this).css({
                opacity: 0
            });
            $targetTitle.css({
                opacity: 0
            });
            $targetDetailWrapper.css({
                opacity: 0
            });
            setTimeout(() => {
                $(this).hide();
                $targetDetailWrapper.hide();
                $(this).parent().css({
                    width: '90vw'
                });
                $target.css({
                    width: '10vw'
                });
            }, 1000);
            setTimeout(() => {
                $targetTitle
                    .css(Object.assign(param, options.gap))
                    .show();
                $originDetailWrapper.show().css({
                    opacity: 1
                });
            }, 2000)
        });
        return this;
    },
    init () {
        // 解决fullpage插件对于高度计算不准确的问题
        $('html').addClass('fullpageHeight');

        $('.duyi-header')
            .prependTo($('.duyi-study-poster'))
            .css('position', 'absolute');
        $('.duyi-header-button').remove();

        this.changeImageRatio();                 
        
        // 初始化iscroll组件
        this.myscroll = new IScroll('.duyi-study-exercises-content', {
            scrollX: true,
            scrollY: false
        });

        // 初始化fullpage组件
        $('.duyi-study-fullpage').fullpage({
            // loopBottom: true,
            // loopTop: true,
            scrollOverflow: true,
            afterLoad: (anchorLink, index) => {
                if (index === 4) {
                    // 触发最后一页的slimScroll滚动条的加载
                    $(window).trigger('resize');
                }
            }
        });

        // 初始化slimscroll组件
        $('.duyi-study-consult .tableCell')
            .slimScroll({
                height: '100%'
            })
            .css('overflow', 'auto');
        
        // 初始化pageSwitch组件
        $('.duyi-study-curriculum-web-detail')
            .add($('.duyi-study-curriculum-java-detail'))
            .each((index, item) => {
                new pageSwitch($(item).attr('id'), {
                    duration: 1000,
                    start: 0,
                    direction: 1,
                    loop: false,
                    ease: 'ease',
                    transition: 'slide',
                    mouse: true,
                    arrowkey: false
                });
            });

        // 初始化curriculumAnimate
        this.curriculumAnimate({
            origin: 'web',
            target: 'java',
            gap: {
                left: '-1.6vw'
            }
        }).curriculumAnimate({
            origin: 'java',
            target: 'web',
            gap: {
                right: '-1vw'
            }
        });


    }
};