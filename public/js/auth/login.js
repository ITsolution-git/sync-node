$(document).ready(function(){
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