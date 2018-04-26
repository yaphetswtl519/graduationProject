export default function () {
    let $header = $('.duyi-header'),
        $headerButton = $('.duyi-header-button'),
        $headerLi = $('.duyi-header-li'),
        moveDis = [500, 382, 262, 175],
        buttonFSM = {
            hide: 'duyi-header-button-toggle-hide',
            show: 'duyi-header-button-toggle-show',
            transiton: 'duyi-header-button-toggle-transition'
        },
        headerFSM = {
            hide: 'duyi-header-hide',
            show: 'duyi-header-show'
        },
        headerLineFSM = {
            hide: 'duyi-header-li-line-hide',
            show: 'duyi-header-li-line-show'
        };
    let toggleButton = () => {
        $header.removeClass(headerFSM.hide).addClass(headerFSM.show);
        $headerButton.removeClass(buttonFSM.show).addClass(buttonFSM.hide);        
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
        $headerButton.removeClass(buttonFSM.hide).addClass(`${buttonFSM.transiton} ${buttonFSM.show}`);
        $headerLi.each((index, item) => {
            $(item).css({
                transform: `translateX(${moveDis[index]}px)`,
                visibility: 'hidden',
                opacity: 0
            });
        });
    }
    $(window).scroll((e) => {
        let scrollTop = $(window).scrollTop();
        if (scrollTop && scrollTop > 90) {
            $header.css('position', 'fixed');                  
            headerInit();
        } else {
            $header.css('position', 'absolute');        
            toggleButton();
        }
    });

    // header初始化
    let scrollTop = $(window).scrollTop();
    if (scrollTop && scrollTop > 90) {
        $header.css('position', 'fixed'); 
        headerInit();
    }
}