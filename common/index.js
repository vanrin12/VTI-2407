function ajaxRequest({ url, method = 'GET', data = {}, headers = {}, success, error }) {
    var username = 'admin';
    var password = '123456';
    $.ajax({
        url: url,
        method: method,
        data: method === 'GET' ? data : JSON.stringify(data),
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ":" + password));
        },
        success: function (response) {
            if (typeof success === 'function') {
                success(response);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (typeof error === 'function') {
                error(jqXHR, textStatus, errorThrown);
            }
        }
    });

}