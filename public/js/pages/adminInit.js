import markdown from '../includes/markdown';
export default function () {
    function change (input, output) {
        let value = $(input).val();
        let outputValue = markdown.toHTML(value);
        $(output).html(outputValue);
    }
    //tab缩进功能
    $('#form-markdown-content').on('keydown', function (e) {
        if (e.keyCode === 9) {
            e.preventDefault();
            let indent = '    ';
            let start = this.selectionStart;
            let end = this.selectionEnd;
            let selected = window.getSelection().toString();
            selected = indent + selected.replace(/\n/g, '\n' + indent);
            this.value = this.value.substring(0, start) + selected + this.value.substring(end);
            this.setSelectionRange(start + indent.length, start + selected.length);
        }
    });
    $('#form-markdown-content').on('input', function () {
        change($(this), '#form-html-content')
    });
}