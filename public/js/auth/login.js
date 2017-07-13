$(document).ready(function(){
	$.validator.addMethod("pwcheck", function(value) {
        return /^[A-Za-z0-9\d=!\-@.#&\^_*]*$/.test(value) // consists of only these
            && /[a-z]/.test(value) // has a lowercase letter
            && /\d/.test(value) // has a digit
     }, "Password should be included Letter, Number, Special Syntax");
	
	var jvalidate = $("#login-form").validate({
	    ignore: [],
	    rules: {                                            
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