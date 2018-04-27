import '../includes/stopExecutionOnTimeout';
import '../../layui/layui';
// import createCode'../includes/Treatment';
import '../includes/Particleground';

const canGetCookie = 0;//是否支持存储Cookie 0 不支持 1 支持
const ajaxmockjax = 0;//是否启用虚拟Ajax的请求响 0 不启用  1 启用
const loginData = {
    success: '登陆成功<br /><br />欢迎回来',
    fail: '账号名或密码或验证码有误<p><a href="/login">重新登录</a></p><p><a href="/">回到首页</a></p>'
};
let code = "";
function createCode(e) {
    code = "";
    let codeLength = 4;
    let selectChar = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    for (let i = 0; i < codeLength; i++) {
        let charIndex = Math.floor(Math.random() * 60);
        code += selectChar[charIndex];
    }
    if (code.length != codeLength) {
        createCode(e);
    }
    if(canGetCookie == 1){
        setCookie(e, code, 60 * 60 * 60, '/');
    }else{
        return code;
    }
}

function fullscreen () {
    let elem = document.body;
    if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.requestFullScreen) {
        elem.requestFullscreen();
    } else {
        //浏览器不支持全屏API或已被禁用
    }
} 

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
}

export default function () {
    $('#myCanvas').on('click', () => {
        Code();
    });

    let CodeVal = 0;
    Code();
    function Code() {
        if(canGetCookie == 1){
            createCode("AdminCode");
            let AdminCode = getCookieValue("AdminCode");
            showCheck(AdminCode);
        }else{
            showCheck(createCode(""));
        }
    }
    function showCheck(a) {
        CodeVal = a;
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.font = "80px 'Hiragino Sans GB'";
        ctx.fillStyle = "#E8DFE8";
        ctx.fillText(a, 0, 100);
    }
    $(document).keypress(function (e) {
        if (e.which == 13) {
            $('input[type="button"]').click();
        }
    });
    //粒子背景特效
    $('body').particleground({
        dotColor: '#E8DFE8',
        lineColor: '#133b88'
    });
    $('input[name="pwd"]').focus(function () {
        $(this).attr('type', 'password');
    });
    $('input[type="text"]').focus(function () {
        $(this).prev().animate({ 'opacity': '1' }, 200);
    });
    $('input[type="text"],input[type="password"]').blur(function () {
        $(this).prev().animate({ 'opacity': '.5' }, 200);
    });
    $('input[name="login"],input[name="pwd"]').keyup(function () {
        var Len = $(this).val().length;
        if (!$(this).val() == '' && Len >= 5) {
            $(this).next().animate({
                'opacity': '1',
                'right': '30'
            }, 200);
        } else {
            $(this).next().animate({
                'opacity': '0',
                'right': '20'
            }, 200);
        }
    });
    var open = 0;
        
    //非空验证
    $('input[type="button"]').click(function () {
        let name = $('input[name="name"]').val(),
            password = $('input[name="password').val(),
            code = $('input[name="code"]').val(),
            loginStatus = '';
        if (name == '') {
            alert('请输入您的账号');
        } else if (password == '') {
            alert('请输入密码');
        } else if (code == '' || code.length != 4) {
            alert('输入验证码');
        } else {
            fullscreen();
            $('.login').addClass('test'); //倾斜特效
            setTimeout(function () {
                $('.login').addClass('testtwo'); //平移特效
            }, 300);
            setTimeout(function () {
                $('.authent').show().animate({ right: -320 }, {
                    easing: 'easeOutQuint',
                    duration: 600,
                    queue: false
                });
                $('.authent').animate({ opacity: 1 }, {
                    duration: 200,
                    queue: false
                }).addClass('visible');
            }, 500);

            if (code.toUpperCase() == CodeVal.toUpperCase()) {
                setTimeout(function () {
                    $('.authent').show().animate({ right: 90 }, {
                        easing: 'easeOutQuint',
                        duration: 600,
                        queue: false
                    });
                    $('.authent').animate({ opacity: 0 }, {
                        duration: 200,
                        queue: false
                    }).addClass('visible');
                    $('.login').removeClass('testtwo'); //平移特效
                }, 2000);
                setTimeout(function () {
                    $('.authent').hide();
                    $('.login').removeClass('test');
                    $('.login div').fadeOut(100);
                    $('.success').fadeIn(1000);
                    
                    $.post('/login/user', {
                        name,
                        password
                    }, (res) => {
                        loginStatus = res.loginStatus;
                        if (res.loginStatus) {
                            $('.success').html(loginData.success);
                        } else {
                            $('.success').html(loginData.fail);
                        }
                    });
                    setTimeout(() => {
                        exitFullscreen();
                    }, 1500);
                    setTimeout(() => {
                        if (loginStatus) {
                            location.href = '/admin/essay/list';
                        }
                    }, 2000);
                }, 2400);
            } else {
                alert('验证码错误！');
                location.href = '/login';
            }
        }
    });
}