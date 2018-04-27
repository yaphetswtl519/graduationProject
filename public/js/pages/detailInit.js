import markdown from '../includes/markdown';

export default function () {
    let $content = $('.essay-content');
    let $text = $('#comment-text');
    let $name = $('#comment-name');
    let $email = $('#comment-email');
    let $commentspan = $('#comment-text-span');
    let $namespan = $('#comment-name-span');
    let $emailspan = $('#comment-email-span');
    let html = markdown.toHTML($content.html());
    console.log($content.html());
    $content.html(html);
    function validation () {
        let emailRegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!$text.val()) {
            $commentspan.show();
            return false;
        } else {
            $commentspan.hide();
        }
        if (!$name.val()) {
            $namespan.show();
            return false;
        } else {
            $namespan.hide();
        }
        if (!emailRegExp.test($email.val())) {
            $emailspan.show();
            return false;
        } else {
            $email.hide();
        }
        return true;
    }

    $('#comments-form').on('submit', function () {
        return validation();
    });
}