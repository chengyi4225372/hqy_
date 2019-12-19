window.onload = function () {

    var menuList = document.querySelectorAll('#headerContent ul li')
    var menuUl = document.querySelector('#headerContent ul')

    for (var i = 0; i < menuList.length; i++) {
        menuList[i].onmouseenter = function () {
            var li = document.querySelectorAll('.nav-active')[0]
            li.classList.remove('nav-active')
            this.classList.add('nav-active')
        }
    }

    menuUl.onmouseleave = function () {
        var li = document.querySelectorAll('.nav-active')[0]
        li.classList.remove('nav-active')
        menuList[5].classList.add('nav-active')
    }

    var liArr = document.querySelectorAll(".tabs ul li");
    var spanArr = document.querySelectorAll(".tabs-items");

    for (var i = 0; i < liArr.length; i++) {
        liArr[i].index = i;
        liArr[i].onclick = function () {
            for (var j = 0; j < liArr.length; j++) {
                liArr[j].className = "";
                spanArr[j].className = "tabs-items";
            }
            this.classList.add("li-active");
            spanArr[this.index].classList.add("show");
        }
    }

    // 返回顶部
    window.onscroll = function () {
        var top = document.body.scrollTop || document.documentElement.scrollTop;
        console.log(top)
        console.log(document.body.scrollTop);
        console.log(document.documentElement.scrollTop);

        if (top >= 1080) {
            var goTop = document.getElementById('goTop');
            goTop.style.display = "block";

            // console.log(goTop);
            var timer = null;
            goTop.onclick = function () {
                cancelAnimationFrame(timer);
                //获取当前毫秒数
                var startTime = +new Date();
                //获取当前页面的滚动高度
                var b = document.body.scrollTop || document.documentElement.scrollTop;
                var d = 500;
                var c = b;
                timer = requestAnimationFrame(function func() {
                    var t = d - Math.max(0, startTime - (+new Date()) + d);
                    document.documentElement.scrollTop = document.body.scrollTop = t * (-c) / d + b;
                    timer = requestAnimationFrame(func);
                    if (t == d) {
                        cancelAnimationFrame(timer);
                    }
                });
            }
        } else if (top < 1080) {

            // 返回顶部样式
            var goTop = document.getElementById('goTop');
            goTop.style.display = "none";

        }
    }
};



//招商政策详情,查看详情
var home_module = (function () {
    var show_detail = function show_detail(objthis) {
        var mobile_phone = $(objthis).attr('mobile-phone');
        var url = $(objthis).attr('data-url');
        var login_url2 = $(objthis).attr('login_url');
        var loca_url2 = $(objthis).attr('loca_url');
        var loca_url = encodeURIComponent(loca_url2);
        var login_url = login_url2 + '?artId=' + loca_url;

        var data_id = $(objthis).attr('data-id');
        if (mobile_phone == undefined || mobile_phone == '') {
            //location.href = login_url;
            window.open(login_url);
        } else {
            location.href = url;
        }
    };
    return {
        show_detail: show_detail,
    };
})();

