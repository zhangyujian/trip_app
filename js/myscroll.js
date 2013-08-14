var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;
    n=0;

function pullUpAction () {// 这个函数是下拉刷新，但是刷新后样式有问题，高度不变，滚动条拉到底部了，内容却没有达到底部。
    setTimeout(function () {//如果去掉$.ajax后换成其他的循环函数，正常。
        var el, lis='', i;
        el = $('#thelist');
        $.ajax({ url:'http://121.199.29.125:3004/list/?p='+(++n)+'',//从该处获取数据
            dataType:'jsonp',
            success:function(data){
                for (i=0;i<8;i++){
                    //var time = getLocalTime(data[i]['pub_time']);
                    lis += "<li><a href=detail.html?"+data[i]['_id']+">"+data[i]['title']+"</a></li>";
                };
                el.append(lis);
                el.listview('refresh');
                myScroll.refresh();
            }//;success不能跟分号
        });
        }, 1000);
}

function pullDownAction () {
    setTimeout(function () {
        var el = $('#thelist') , lis='', i;

        for (i=0;i<5;i++ ){
            lis += '<li><a>'+ 'Generated row ' + (++generatedCount)+ '</a></li>';
        };
        el.prepend(lis);
        el.listview('refresh');
        myScroll.refresh();
    }, 1000);
    // $('#thelist').listview('refresh');
}

function loaded() {
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        useTransition: true,
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullDownEl.className.match('loading')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
            } else if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
            }
        },
        onScrollMove: function () {
            if (this.y > 5 && !pullDownEl.className.match('flip')) {
                pullDownEl.className = 'flip';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放刷新...';
                this.minScrollY = 0;
            } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                pullDownEl.className = '';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                this.minScrollY = -pullDownOffset;
            } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放刷新...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '等待...';
                pullDownAction();    // Execute custom function (ajax call?)
            } else if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '等待...';
                pullUpAction();    // Execute custom function (ajax call?)
            }
        }
    });

    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);

/*

//函数：将时间戳变成日期形式
function getLocalTime(nS) {
   return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}


//获取数据
function xunlei(){
    var el, li, i,option,ell;
    el = document.getElementById('thelist');
    $.ajax({
        type:"GET",
        url:'http://202.198.133.181/android/andrew2/jsonp2.php?callback=?',//从该处获取数据
        dataType:'json',
        success:function(data){
            for (i=0;i<20;i++)
            {
            li = document.createElement('li');
            //var time = getLocalTime(data[i]['pub_time']);
            li.innerHTML = "<a href='news.html?news_id="+data[i]['news_id']+"'>"+data[i]['title']+"</a>";
            el.appendChild(li, el.childNodes[0]);
            }
            $('#thelist').listview('refresh');
        }//;success不能跟分号
    });
}

window.onload = xunlei;
*/