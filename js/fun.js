x$( "header" ).html("完美旅行3");
/*
x$("#xhr").xhr('http://121.199.29.125:3004/list',{
	method: 'get',
	async: true,
	callback: function(){
		x$("#xhr").html(this.responseText);// this.responseText is string
		//console.log(this.responseText);
	},
	error: function(){
		alert('error');
	}
});
*/
x$(window).xhr('test.json',{
	method: 'get',
	async: true,
	callback: function(){
		var t = this.responseText;// this.responseText is string
		var arr = eval('('+t+')');
		for (var i = 0; i<arr.length; i++){
			var html = '<li><a href="' + arr[i]._id + '">' + arr[i].title +'</a></li>';
			var old_html = x$("#thelist").html();
			x$("#thelist").html(old_html + html);
		}
	},
	error: function(){
		alert('error');
	}
});
x$(window).load(function(e) {
x$("#thelist li").each(function(){//由于是html写入的dom 无法x$！
	var that = x$(this);
	//alert("hi");
	that.on('click',function(){
		that.xhr('test2.json',{
			method: 'get',
			async: true,
			callback: function(){
				var t = this.responseText;// this.responseText is string
				var obj = eval('('+t+')');
				that.html(obj.title);
			},
			error: function(){
				alert('error');
			}
		});
		return false;
	});
});
});

