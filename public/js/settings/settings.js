$(document).ready(function() {
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
            },
            confirm_password: {
                required: true,
                minlength: 8,
                equalTo: "#password"
            },
            image: {
                required: true
            },
        }
    });
})
