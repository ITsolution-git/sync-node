$(document).ready(function() {
	var win = $(window);

	var page = 0, notLoading = false;

	// Each time the user scrolls
	win.scroll(function() {
		// End of the document reached?
		if ($(document).height() - win.height() == win.scrollTop()) {
			// $('#loading').show();
			console.log(notLoading)
			if(notLoading == false){
				page += 1;				
				$.ajax({
					url: '/projects/ajax_get',
					type: 'POST',
					data: {
						page: page,
						user: <%- JSON.stringify(user) %>
					},
					dataType: 'html',
					success: function(html) {
						$('#project_list').append(html);
						if(html == ''){
							notLoading = true;
						}
						// $('#loading').hide();
					}
				});
			} 

		}
	});
});