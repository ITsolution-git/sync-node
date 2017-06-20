$(document).ready(function(){
	var jvalidate = $("#create-form").validate({
	    ignore: [],
	    rules: {                                            
	            title: {
	                    required: true,
	                    minlength: 4,
	            },
	            content: {
	                    required: true,
	                    minlength: 8,
	            },
	            category: {
	                    required: true,
	            }
	        }                                        
	    });
})