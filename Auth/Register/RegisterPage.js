$(document).ready(function () {

    $("#submit-register").submit(function (e) {
        e.preventDefault();
        var name = $("#name").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();
        if (name && email && password && confirmPassword) {
            if ($("#confirmPassword").val() != $("#password").val()) {
                $("#confirmPassword").css("border-color", "red");
            } else {
                window.localStorage.setItem('userInfo', JSON.stringify({ name, email, password }));

                if (window.localStorage.getItem('userInfo')) {
                    window.location.href = '../SignIn/LoginPage.html';
                }
            }
        } else {
            alert('Please input valid information!');
        }
    })
})