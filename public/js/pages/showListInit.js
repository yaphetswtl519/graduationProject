export default function () {
    let ajaxXhr;
    function deleteDataPromise (id) {
        let defer = $.Deferred();
        if (ajaxXhr) {
            ajaxXhr.abort();
            ajaxXhr = null;
        }
        ajaxXhr = $.ajax({
            type: 'delete',
            url: `/admin/essay/delete?id=${id}`,
            success: (res) => {
                if (res.status !== 1) {
                    defer.reject();
                } else {
                    defer.resolve(); 
                }
            },
            error: () => {
                defer.reject();
            }
        });
        return defer.promise();
    }
    $('.btn-delete').on('click', (e) => {
        let id = $(e.target).data('id');
        let $tr = $(`.essay-${id}`)
        deleteDataPromise(id).then(() => {
            $tr.remove();
        }, () => {
            alert('please retry!');
        });
    });
}