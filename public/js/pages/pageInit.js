import move from 'move-js';

export default function () {
    if (window.scrollY) {
        $('.duyi-dom-translate').removeClass('duyi-dom-translate');
    }
    $('.duyi-dom-translate').each((index, item) => {
        $(window).scroll(() => {
            if ($(item).offset().top <= $(window).height() + $(window).scrollTop()) {
                move($('.duyi-dom-translate')[index])
                    .ease('in-out')
                    .duration('1s')
                    .translate(0, 0)
                    .end();
            }
        });
    });
}