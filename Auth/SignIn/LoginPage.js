$(document).ready(function () {
    $("#submit-login").submit(function (e) {
        e.preventDefault();
        var email = $("#email").val();
        var password = $("#password").val();
        if (email && password) {
            if (window.localStorage.getItem('userInfo')) {
                var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
                if (userInfo.email == email && userInfo.password == password) {
                    window.location.href = '../../Home/HomePage.html';
                }
            }
        } else {
            alert('Please input valid information!');
        }
    })
})