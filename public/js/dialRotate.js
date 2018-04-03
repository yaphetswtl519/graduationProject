export default class DialRotate {
    constructor (options = {}, callback = () => {}) {
        this.defaults = {
            trigger: document,
            centerX: 0,
            centerY: 0,
            dialCount: 12,
            inertia: true,
            debug: false,
            animateMode: {
                easeOut: (t, b, c, d) => {
                    // t: current time（当前时间）
                    // b: beginning value（初始值）
                    // c: change in value（变化量）
                    // d: duration（持续时间）
                    return -c * (t /= d) * (t - 2) + b;
                }
            }
        };
        this.offset = 5; //缓冲距离，越大越快
        this.interval = 5; //动画速度，越大越慢
        this.duration = 100; //缓冲步数，越大越慢

        this.cur = 0;
        this.flag = 1;
        this.curTime = 0;
        this.ops = Object.assign(this.defaults, options);
        this.callback = callback;

        this.rotateDis = 0
        this.init();
        this.timer = null;
    }
    bindEvent () {
        $(this.ops.trigger).bind('mousedown', () => {
            clearInterval(this.timer);
            if (this.rotateDis / 360 > 0) {
                this.rotateDis = this.rotateDis % 360;
            }
            this.ops.wrapper.css({
                transform: `rotateZ(${this.rotateDis}deg)`
            });
            $(document).on('mousemove', this.movehandle.bind(this));
        });
        $(document).on('mouseup', (e) => {
            this.rotateDis += (this.getmatrix() - this.rotateDis);
            $(document).unbind('mousemove');         
            let dis = this.angle(this.ops.centerX, this.ops.centerY, e.pageX, e.pageY);
            if (dis !== this.cur) return;
            
            if (this.ops.inertia) { // 惯性运动
                this.inertiaShow(dis);
            } else { // 非惯性运动
                let spare = this.rotateDis % 30,
                spareDis = null;
                if (spare === 0) {
                    this.callback.call(this, this.getmatrix() / 30);
                    return;
                } else {
                    spareDis = spare >= 15 ? (30 - spare) : -spare;
                    this.spareMove(spareDis);
                }
            }
        });
    }
    spareMove (dis) {
        let degree = 0,
            _this = this,
            matrix = _this.getmatrix();
        _this.timer = setInterval(function () {
            if (dis === degree) {
                clearInterval(_this.timer);
                _this.rotateDis += dis;
                // 执行回调函数
                _this.callback.call(this, _this.getmatrix() / 30);
            } else {
                dis > 0 ? degree++ : degree--;
                _this.rotate(matrix + degree);
            }
        }, 20);
    }
    movehandle (e) {        
        let dis = this.angle(this.ops.centerX, this.ops.centerY, e.pageX, e.pageY);
        this.flag = (dis - this.cur > 0) ? 1 : 0;
        if (this.ops.debug) {
            console.log(this.ops.centerX, this.ops.centerY, e.clientX, e.clientY, dis);
        }
        this.cur = dis;
        this.rotate(this.rotateDis + dis);
    
        return false;
    }
    angle (centerx, centery, endx, endy) {
        let x = Math.abs(centerx - endx),
            y = Math.abs(centery - endy),
            z = Math.sqrt(Math.pow(x,2) + Math.pow(y,2)),
            cos = y / z,
            radina = Math.acos(cos),
            angl = Math.floor(180 / (Math.PI / radina));
        
        if (endx > centerx && endy > centery){
            angl = 180 - angl;
        }
        if (endx == centerx && endy > centery) {
            angl = 180;
        }
        if (endx > centerx && endy == centery) {
            angl = 90;
        }
        if (endx < centerx && endy > centery) {
            angl = 180 + angl;
        }
        if (endx < centerx && endy == centery) {
            angl = 270;
        }
        if (endx < centerx && endy < centery) {
            angl = 360 - angl;
        }
        return angl;
    }
    inertiaShow (angle) {
        let run = () => {
            let deg = this.flag 
                ? Math.ceil(this.ops.animateMode.easeOut(this.curTime, angle, this.offset, this.duration))
                : Math.ceil(this.ops.animateMode.easeOut(this.curTime, angle, this.offset * -1, this.duration));
            this.ops.wrapper.css({
                transform: `rotateZ(${this.getmatrix()}deg)`
            });
            this.rotate(this.rotateDis + deg);
            if (this.curTime < this.duration) {
                this.curTime++;
                setTimeout(run, this.interval);
            } else {
                this.curTime = 0;
                let d = 360 / this.ops.dialCount,
                    matrix = this.getmatrix(),
                    spareMatrix = matrix % 30,
                    spare = null;
                if (spareMatrix % d !== 0 && spareMatrix % d < 15) {
                    spare = spareMatrix - spareMatrix % d + (matrix - spareMatrix);
                    this.rotate(spare);
                } else if (spareMatrix % d >= 15) {
                    spare = spareMatrix + (d - spareMatrix % d);
                    this.rotate(spare);
                }
                this.curTime = 0;
                this.rotateDis += spare;
            }
        };
        run();
    }
    rotate (angle) {
        this.ops.wrapper.css({
            transform: `rotateZ(${angle}deg)`
        });
    }
    getmatrix () {
        let matrix = this.ops.wrapper.css('transform');
        matrix.match(/\((.+)\)/g);
        let matrixArr = RegExp.$1.split(',').map((item, index) => {
            return +item.trim()
        });
        let a = Math.round(180*Math.asin(matrixArr[0]) / Math.PI),
            b = Math.round(180*Math.acos(matrixArr[1]) / Math.PI),  
            c = Math.round(180*Math.asin(matrixArr[2]) / Math.PI),  
            d = Math.round(180*Math.acos(matrixArr[3]) / Math.PI),  
            deg = 0;  
        if (a == b || -a == b) {  
            deg = d;  
        } else if (-a + b == 180) {  
            deg = 180 + c;  
        } else if (a + b == 180) {  
            deg = 360 - c || 360 - d;  
        }
        return deg >= 360 ? 0 : deg;  
    }
    init () {
        if (this.ops.centerX === 0 && this.ops.centerY === 0) {
            this.ops.centerX = Math.ceil(this.ops.wrapper.offset().left + this.ops.wrapper.width() / 2);
            this.ops.centerY = Math.ceil(this.ops.wrapper.offset().top + this.ops.wrapper.height() / 2);
        }
        this.bindEvent();
    }
}