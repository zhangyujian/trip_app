
//index page info
$(document).delegate("#index","pageinit", function() {
    $(document).bind( "pagebeforechange", beforechange);
    $.ajax({
        type:"GET",
        url:"http://121.199.29.125:3004/list",
        dataType:"jsonp",
        success:function(data){
            var html="";
            //i表示在data中的索引位置，n表示包含的信息的对象
            $.each(data,function(i,n){
                //获取对象中属性为optionsValue的值
                html+='<li><a href=detail.html?'+n["_id"]+'><h2>'+n["title"]+'</h2><p>级别'+n["grade"]+'</p></a></li>';
            });
            $('#thelist').append(html);
            $('#thelist').listview('refresh');
        },
        error:function(){
            alert(error);
        }
    });
});
//localStorage.url = "detail.html?51f9d967eed181a42f000002";
function beforechange( e, data ) {
    if ( typeof data.toPage != "string" ) {
        var url = $.mobile.path.parseUrl(e.target.baseURI),
        re = /detail.html/;
        if(url.href.search(re) != -1){
            var page = $(e.target).find("#detail");
            var d = e.target.baseURI;
            //page.find("#url").append(decodeURIComponent(d));
            //$('body').attr("date-current-url",decodeURIComponent(d));
            localStorage.url = decodeURIComponent(d);
        }
    }
}

//detail page info
$(document).delegate("#detail","pageshow", function() {
    var fullurl = $('body').attr("date-current-url");
    var fullurl = localStorage.url + '';
    var url = fullurl.split('?')[1];
    //console.log(url);
    $.ajax({
        type:"GET",
        url:"http://121.199.29.125:3004/detail/"+ url,
        dataType:"jsonp",
        success:function(data){
            var address = data.province + data.city;
            $('.j_title').html(data.title);
            $('.j_address').html(address);
            $('.j_phone').html(data.weather);
            $('.j_content').html(data.content);
            $('#thelist').listview('refresh');
        }
    });

    var elem = document.getElementById('mySwipe');
    window.mySwipe = Swipe(elem, {
      // startSlide: 4,
      auto: 2500,
      continuous: true,
      // disableScroll: true,
      // stopPropagation: true,
      callback: function(pos) {
        var i = bullets.length;
        while (i--) {
            bullets[i].className = ' ';
        }
        bullets[pos].className = 'on';

      }
      // transitionEnd: function(index, element) {}
    });
    var bullets = document.getElementById('position').getElementsByTagName('li');

    // with jQuery
    // window.mySwipe = $('#mySwipe').Swipe().data('Swipe');
});
