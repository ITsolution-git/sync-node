$(document).ready(function(){
    var jvalidate = $("#signup_form").validate({
        ignore: [],
        rules: {                                            
                first_name: {
                        required: true,
                },
                last_name: {
                        required: true,
                },
                password: {
                        required: true,
                        minlength: 8,
                },
                confirm_password: {
                        required: true,
                        minlength: 8,
                        equalTo: "#password2"
                },
                email: {
                        required: true,
                        email: true
                },
            }                                        
        });
})