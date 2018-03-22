export default class PosterMove {
    constructor (args, dom, options = {movement: .2, speed: 60, boundaryOffset: {x: 20, y: 30}}) {
        this.options = Object.assign(args, options);
        this.$wrapper = dom;
        this.posterWidth = this.$wrapper.find('div:nth-child(1)').eq(1).width();
        this.posterHeight = this.$wrapper.find('div:nth-child(1)').eq(1).height();
        this.padding = +this.$wrapper.css('padding-left').replace('px', '');
        this.targetCoordinates = {
            x: 0,
            y: 0
        };
        this.bindEvent();        
    }
    bindEvent () {
        let $this = this;
        let animationFrame;
        let transitionCoordinates = {
            x: 0,
            y: 0
        };
        let animationFunc = () => {
            transitionCoordinates.x += +($this.targetCoordinates.x - transitionCoordinates.x) / $this.options.speed;
            transitionCoordinates.y += +($this.targetCoordinates.y - transitionCoordinates.y) / $this.options.speed;

            if (+transitionCoordinates.x.toFixed(1) == +$this.targetCoordinates.x.toFixed(1)
                && +transitionCoordinates.y.toFixed(1) == +$this.targetCoordinates.y.toFixed(1)) {
                cancelAnimationFrame(animationFrame);
                transitionCoordinates = {
                    x: 0,
                    y: 0
                };
            } else {
                this.$wrapper.find('.duyi-teacher-img').css({
                    transform: `translate3d(${transitionCoordinates.x}px, ${transitionCoordinates.y}px, 0)`
                });
                this.$wrapper.find('.duyi-teacher-border').css({
                    transform: `translate3d(${-transitionCoordinates.x}px, ${-transitionCoordinates.y}px, 0)`
                });
                animationFrame = requestAnimationFrame(animationFunc);
            }
        };
        
        $this.$wrapper.on('mousemove', function (e) {
            let centerCoordinates = $this.getCenterCoordinates(this);
            let imgOffset = $this.$wrapper.find('.duyi-teacher-img').offset();
            let boundary = {
                x: $(this).offset().left + $this.padding + $this.options.boundaryOffset.x,
                y: imgOffset.top - $(this).offset().top + $this.options.boundaryOffset.y
            };
            let bdSymbol = $this.symbol(e, centerCoordinates, boundary);
            let dis = {
                x: Math.abs(bdSymbol.origin.x) > boundary.x ? bdSymbol.x : bdSymbol.origin.x,
                y: Math.abs(bdSymbol.origin.y) > boundary.y ? bdSymbol.y : bdSymbol.origin.y
            };
            $this.targetCoordinates = {
                x: dis.x * $this.options.movement,
                y: dis.y * $this.options.movement
            };
        });

        $this.$wrapper.on('mouseenter', () => {
            cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(() => {
                animationFunc();
            });
        });

        $this.$wrapper.on('mouseleave', function () {
            cancelAnimationFrame(animationFrame);
            $this.setCenterCoordinates($(this));
            animationFrame = requestAnimationFrame(() => {
                animationFunc();
            }); 
        });

        $(window).on('resize', () => {
            cancelAnimationFrame(animationFrame);
            $this.setCenterCoordinates($(this));
            animationFrame = requestAnimationFrame(() => {
                animationFunc();
            }); 
        });  
    }
    symbol (e, centerCoordinates, boundary) {
        let origin = {
            x: +(centerCoordinates.x - e.pageX).toFixed(1),
            y: +(centerCoordinates.y - e.pageY).toFixed(1)
        };
        return {
            origin: origin,
            x: origin.x > 0 ? boundary.x : -boundary.x,
            y: origin.y > 0 ? boundary.y : -boundary.y
        }
    }
    getCenterCoordinates (poster) {
        let offset = $(poster).offset();
        return {
            x: offset.left + this.padding + this.posterWidth / 2,
            y: offset.top + this.posterHeight / 2
        }
    }
    setCenterCoordinates (poster) {
        this.targetCoordinates = {
            x: 0,
            y: 0
        };
    }
}