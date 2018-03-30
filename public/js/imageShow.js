export default class PhotoApp {
    constructor (options={}) {
        this.$photoWrapper = $('.duyi-student-photo');
        this.$photo = $('.duyi-student-photo-row').find('.duyi-student-photo-img');
        this.h = this.$photoWrapper.height();
        this.w = this.$photoWrapper.width();
        this.singlePhotoW = this.$photo.width();
        this.singlePhotoH = this.$photo.height();
        this.padding = options.padding ? options.padding : 11;
        this.hideH = this.singlePhotoH * 2 + this.padding;
        this.hideW = this.singlePhotoW * 2 + this.padding;
        this.previousPhoto = null;
        this.bindEvent();
    }
    bindEvent () {
        let $this = this;
        $this
            .$photoWrapper
            .find('.duyi-student-photo-img')
            .on('click', function (e) {
                let $dom = this,
                    src = $($dom).find('img').attr('src'),
                    target = $(e.target).hasClass('duyi-student-photo-image')
                        ? $(e.target) : $(e.target).find('img');
                if ($this.previousPhoto !== target && ($this.previousPhoto = target)) {
                    let photoHideDiv = $('<div class="duyi-student-photo-hide"></div>'),
                        offset = $(this).offset();
                    photoHideDiv.on('mousemove', function (e) {
                        if ($($dom).parent().index () === 2) {
                            if (e.pageX > offset.left + $this.singlePhotoW
                                || e.pageX < offset.left
                                || e.pageY < photoHideDiv.offset().top + $this.singlePhotoH
                            ) {
                                $this.removeDiv(photoHideDiv);
                            }
                        } else {
                            if ($($dom).index() === 3) {
                                if (e.pageX < offset.left || e.pageY > photoHideDiv.offset().top + $this.$photo.height()) {
                                    $this.removeDiv(photoHideDiv);
                                }
                            } else {
                                if (e.pageX > offset.left + $this.singlePhotoW
                                    || e.pageY > offset.top + $this.singlePhotoH
                                ) {
                                    $this.removeDiv(photoHideDiv);
                                }
                            }
                        }
                    });
                    photoHideDiv.on('mouseleave', function () {
                        $this.removeDiv(photoHideDiv);
                    });
                    $this.resetPosition(this, photoHideDiv);
                    photoHideDiv.css({
                        backgroundImage: `url(${src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    });
                }
            });
        $this.$photoWrapper.on('mouseleave', function () {
            $this.previousPhoto = null;
        });
        $(window).on('scroll', function () {
            $this.$photoWrapper.find('.duyi-student-photo-hide').remove();
        });
    }
    removeDiv (dom) {
        $(dom).css({
            opacity: 0
        });
        setTimeout(function () {
            $(dom).remove();
        }, 500);
    }
    resetPosition (photoImg, dom) {
        let pos = $(photoImg).position(),
            photoHeight = this.singlePhotoH,
            photoWidth = this.singlePhotoW,
            index = $(photoImg).index() < 2 ? 0 : -1;
        pos.top = pos.top < (this.h - photoHeight - 12) 
            ? pos.top 
            : (pos.top / 2);
        pos.left = (this.w - pos.left) > (this.w - 2 * photoWidth) 
            ? (pos.left + this.padding) 
            : (this.w - 2 * photoWidth + this.padding * index);
        this.$photoWrapper.find('.duyi-student-photo-hide').remove();
        $(dom).appendTo(this.$photoWrapper).css({
            width: this.hideW,
            height: this.hideH,
            left: pos.left,
            top: pos.top,
            opacity: 1
        });
    }
}