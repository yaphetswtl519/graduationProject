export default function () {
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

    let headerInit = () => {
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
    }
    window.onscroll = (e) => {
        let scrollTop = $(window).scrollTop();
        if (scrollTop && scrollTop > 110) {
            headerInit();
        } else {
            toggleButton();
        }
    };


    // header初始化
    let scrollTop = $(window).scrollTop();
    if (scrollTop && scrollTop > 110) {
        headerInit();
    }
}