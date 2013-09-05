x$( "header" ).html("完美旅行2");
x$("#xhr").xhr('http://121.199.29.125:3004/list',{
	method: 'get',
	async: true,
	dataType: "json",
	callback: function(){
		alert(this.responseText);
	},
	error: function(){
		alert('error');
	}
});