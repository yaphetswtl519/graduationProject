export default class PhotoApp {
    constructor (options={}) {
        this.$photoWrapper = $('.duyi-student-photo');
        this.$photo = $('.duyi-student-photo-row').find('.duyi-student-photo-img');
        this.$photoHide = $('.duyi-student-photo-hide');
        this.h = this.$photoWrapper.height();
        this.w = this.$photoWrapper.width();
        this.padding = options.padding ? options.padding : 11;
        this.hideH = this.$photo.height() * 2 + this.padding;
        this.hideW = this.$photo.width() * 2 + this.padding;
        this.bindEvent();
    }
    bindEvent () {
        let $this = this;
        $this
            .$photoWrapper
            .find('.duyi-student-photo-img')
            .on('mouseenter', function () {
                let src = $(this).find('img').attr('src');
                $this.resetPosition(this);
                $this.$photoHide.css({
                    backgroundImage: `url(${src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                });
                $this.$photoHide.show();
            });
        $this
            .$photoHide
            .on('mouseleave', function () {
                $(this).hide();
            });
    }
    resetPosition (photoImg) {
        let pos = $(photoImg).position();
        let photoHeight = this.$photo.height();
        let photoWidth = this.$photo.width();
        let index = $(photoImg).index() < 2 ? 0 : 1;
        pos.top = pos.top < (this.h - photoHeight - 12) 
            ? pos.top 
            : (pos.top / 2);
        pos.left = (this.w - pos.left) > (this.w - 2 * photoWidth) 
            ? (pos.left + this.padding) 
            : (this.w - 2 *photoWidth + this.padding * index);
        this.$photoHide.css({
            width: this.hideW,
            height: this.hideH,
            left: pos.left,
            top: pos.top
        });
    }
}