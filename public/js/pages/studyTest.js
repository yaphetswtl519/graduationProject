import IScroll from 'iscroll/build/iscroll.js';
import pageSwitch from 'pageSwitch';
import '../includes/jquery.fullPage';
import '../includes/jquery.slimscroll';

export default {
    myscroll: null,
    pageSwitchCache: [],
    changeImageRatio () {
        let $posterImg = $('.duyi-study-poster-img'),
            url = $posterImg
                .css('backgroundImage')
                .replace(/^url\(["']?/, '')
                .replace(/["']?\)$/, ''),
            img = new Image();
        img.src = url;
        img.onload = () => {
            let ratio = img.width / img.height,
                width = $posterImg.width(),
                height = $posterImg.height();
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
        let $this = this;
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
            scrollOverflow: true,
            afterLoad: (anchorLink, index) => {
                if (index !== 1) {
                    $('.duyi-study-gotop').css({
                        opacity: 1
                    }).on('click', () => {
                        $('.duyi-study-fullpage').fullpage.moveTo(1, 0);
                    });
                } else {
                    $('.duyi-study-gotop').css({
                        opacity: 0
                    });
                }
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
                $this.pageSwitchCache.push(new pageSwitch($(item).attr('id'), {
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
        
        // index icon切换
        $('.duyi-study-curriculum-web-index li').on('click', function () {
            let self = $(this),
                i = self.index();
            if (i !== 0) {
                $('.duyi-study-curriculum-web-detail').each((index, item) => {
                    if ($(item).children().length === 1) {
                        $(item).css({
                            opacity: 0
                        });
                    }
                });
            } else {
                $('.duyi-study-curriculum-web-detail').css({
                    opacity: 1
                });
            }
            $this.pageSwitchCache.forEach((item, index) => {
                item.slide(i);
                item.on('after', () => {
                    $('.duyi-study-curriculum-web-index li').removeClass('duyi-study-curriculum-web-index-active');
                    self.addClass('duyi-study-curriculum-web-index-active');
                });
            });
            
        });

        // 初始化curriculumAnimate
        this.curriculumAnimate({
            origin: 'web',
            target: 'java',
            gap: {
                left: '-1.6vw'
            }
        });
        // java课程后续开放
        // .curriculumAnimate({
        //     origin: 'java',
        //     target: 'web',
        //     gap: {
        //         right: '-1vw'
        //     }
        // });
    }
};