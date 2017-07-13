$(document).ready(function() {
    $.validator.addMethod("pwcheck", function(value) {
        return /^[A-Za-z0-9\d=!\-@.#&\^_*]*$/.test(value) // consists of only these
            && /[a-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
     }, "Password should be included Letter, Number, Special Syntax");
    var jvalidate = $("#profile-form").validate({
        ignore: [],
        rules: {
            first_name: {
                required: true,
                minlength: 4,
            },
            last_name: {
                required: true,
                minlength: 4,
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8,
                pwcheck: true
            },
            confirm_password: {
                required: true,
                minlength: 8,
                equalTo: "#password",
                pwcheck: true
            },
            image: {
                required: true
            },
        }
    });
})
