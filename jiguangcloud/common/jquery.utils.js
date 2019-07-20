var $$ = window.$$ = {};
/*获取URL后的传递参数
 * @param key 参数的传递字段
 * @auth zhjy
 */
var verCode,verPhone,userId,compType = 1;
/*重新封装ajax
 * @param $.ajax上送参数
 * @auth zhjy
 */
var isWuHeng = isLocalStorageSupported();
var AmtRegExp =/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,
    idCard = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;//银行卡正则
    $$.Storage = {
    setItem:function(key,val){
        if(isWuHeng){
            window.localStorage.setItem(key,val);
        }else{
            setCookie(key,val,{maxAge:300000});
        }
    },
    getItem:function(key){
        if(isWuHeng){
            return window.localStorage.getItem(key);
        }else{
            var name = getCookie(key);
            return name;
        }
    },
    clear:function(){
        if(isWuHeng){
            window.localStorage.clear();
        }else{
            clearCookie();
        }
    }
};
function isLocalStorageSupported() {
    var testKey = 'testWu',
        storage = window.sessionStorage;
    try {
        storage.setItem(testKey, 'testValue');
        storage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
};
function getCookiesObj(){
    var cookies = {};
    if(document.cookie){
        var objs = document.cookie.split('; ');
        for(var i in objs){
            var index = objs[i].indexOf('='),
                name = objs[i].substr(0, index),
                value = objs[i].substr(index + 1, objs[i].length);
            cookies[name] = value;
        }
    }
    return cookies;
};
function setCookie(name, value,opts){
    if(name && value){
        var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        if(opts){
            if(opts.maxAge){
                cookie += '; max-age=' + opts.maxAge;
            }
        }
        document.cookie = cookie;
    }else{
        return '';
    }
};
//获取cookie
function getCookie(name){
    return decodeURIComponent(getCookiesObj()[name]) || null;
};
//清除所有cookie
function clearCookie(){
    var cookies = getCookiesObj();
    for(var key in cookies){
        document.cookie = key + '=; max-age=0';
    }
};

$$.ajax = function(opt){
    var _this = this;
    //不对返回数据做缓存
    opt.type = 'POST';
    //备份opt中error和success方法
    var fn = {
        error:function(XMLHttpRequest, textStatus, errorThrown){},
        success:function(data, textStatus){}
    }
    //重写jquery ajax方法
    if(opt.success){
        fn.success = opt.success;
    }
    if(opt.error){
        fn.success = opt.error;
    }
    opt.success = function(result, textStatus){
        if(result.error == '9999'){
            $$.Storage.clear();
            $$.alert('',function(){
                //window.location.href="index.html";
            });
        }else if(result.error == '8888'){
            $$.Storage.clear();
            //window.location.href="front/closeWeb.do";
        }else{
            fn.success(result, textStatus);
        }
    }
    var _data = opt.data;
    var _opt = $.extend({
        error:function(XMLHttpRequest, textStatus, errorThrown){
            //Alert("通讯失败,请检查网络连接状况！");
        },
        beforeSend:function(){
            //ajax发送之前
        },
        complete:function(){
            //ajax完成之后
        },
        data:_data,
    },opt);
    return $.ajax(_opt);
    //}
};
/* @initPage 页面初始化 
 * @flg 1&
 * @auth zhjy
 */
$$.initPage = function(hash,flg){
    var url,url_1;
    if(flg == 1){
        url ="../company-header.html";
        // url_1="../company-footer.html";                       
    }else{
        url="company-heder.html";
        // url_1="company-footer.html";                       
    }    
    //页面top初始化
    $.ajax({
        url: url,
        type: "get",
        dataType: "html",
        success: function (data) {
            $('#company-header').empty().html(data);
            $('#company-header li').removeClass('active');
            $('#company-header').find('a[href="'+hash+'"]').parent('li').addClass('active');
            $$.fontSize(document,window);
            var $headerFloat = $('.headerFloat');
            var $header = $('html');
            var $navBtn = $('.navbtn');
            $(".link",$headerFloat).on("click",function(event) {
                var $this=$(this);
                if($this.siblings('.ol').length){
                    var $item=$this.parents("li"),
                        $Sub=$this.siblings('.menu-sub');
                    if(!$Sub.hasClass('on')){
                        $item.addClass('on').find('.ol').addClass("on").slideDown(200).parents("li").
                            siblings('li').removeClass("on").find('.ol').removeClass('on').slideUp(200);
                    }else{
                        $item.removeClass('on').find('.ol').removeClass('on').slideUp(200);
                    }
                }
            });
            setNavCss();
            $navBtn.on("click",function (e) {
                if($header.hasClass('show')){
                    $header.removeClass('show');
                }else{
                    $header.addClass('show');
                }
                setNavCss();
            });
            function setNavCss(){
                $navBtn.find('span').height(Math.ceil((6/100)*parseInt($header.css("font-size"))));
                // $nav.css({"height":window.height()-($("#function").css("position")=="fixed"?$("#function").height():0),"overflow-y":"auto"});
            }
        }
    });
    // 禁止F12
    // $("*").keydown(function (e) {//判断按键
    //     e = window.event || e || e.which;
    //     if (e.keyCode == 123) {
    //         e.keyCode = 0;
    //         return false;
    //     }
    // });
    // //禁止审查元素
    // $(document).bind("contextmenu",function(e){
    //     return false;
    // });
    // //页面底部初始化
    // $.ajax({
    //     url: url_1,
    //     type: "get",
    //     dataType: "html",
    //     success: function (data) {
    //         $('#company-footer').empty().html(data);
    //     }
    // });
};
/*Loading
 * @auth zhjy
 */
$$.Loading = function(m){
	if($('.loading').is(':visible')){
		return;
	}
	var toast = $('<div class="loading"></div>');
	toast.appendTo($('body'));
};
/*toast提示框
 * @param msg 提示语
 * @param time 提示语显示时间
 * @auth zhjy
 */
$$.toast = function(msg, time){
	if($('.toastMessage').is(':visible')){
		return;
	}
	var toast = $('<div class="toastMessage"><p>'+msg+'</p></div>');
	delay = 3000;
	toast.appendTo($('body')).fadeIn(500);
	if(time)
		delay = time;
	setTimeout(function(){
		toast.fadeOut();
		toast.remove();
	},delay)
};
/*手机校验
 * @param m 输入的手机号
 * @auth zhjy
 */
$$.isPhone = function(mobile){
    var reg =  /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    return reg.test(mobile);
};
/*固话校验
 * @param m 输入的固定电话
 * @auth zhjy
 */
$$.isTel = function(mobile){
    var reg =  /^0\d{2,3}-?\d{7,8}$/;//固定电话
    return reg.test(mobile)
};
/*金额格式校验
 * @param m 输入的金额
 * @auth zhjy
 */
$$.isMoney = function(m){
    if(!AmtRegExp.test(m)){
        return true;
    }else{
        return false;
    }
};
/*邮箱校验
 * @param m 输入的邮箱号
 * @auth zhjy
 */
$$.isEmail = function(m){
    var reg =  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;//邮箱正则
    return reg.test(m)
}
/*身份证校验
 * @param c 输入的身份证号
 * @auth zhjy
 */
$$.isIdCard = function(c){
    if(idCard.test(c)){
        return true;
    }else{
        return false;
    }
}
/*前台数据分页
 * @param url 请求的url
 * @param param 上送参数
 * @param listelm 数据显示列表
 * @param elm 分页显示列表
 * @param listData 分页数据参数[]
 * @param fn 分页回调方法
 * @auth zhjy
 */
function Page(url,param,listelm,elm,listData,fn){
    if(url == ''){
        $$.alert('url error');
    };
    this.minNumber = 10;
    this.Data;
    this.AllData;
    this.url = url;
    this.initPageNum = 1;//当前页
    this.pageTotalNum = 0;//总页数
    this.param = param;
    this.elm = elm;
    this.pageLoading = true;
    this.listelm = listelm;
    if(fn){this.fn = fn;}
    if(listData){this.listData = listData;};
    this.listelm.empty();
    this.elm.empty();
    this.initAjax();
}
//获取后台请求数据
Page.prototype.initAjax = function(num){
    var _this = this;
    if(num){
        _this.param.curPage = num;
    }else{
        _this.param.curPage = 1;
    };
    _this.listelm.empty();
    _this.listelm.addClass('list-loading');
    if(!_this.pageLoading)return;
    _this.pageLoading = false;
    $$.ajax({
        url:_this.url,
        data:JSON.stringify(_this.param),
        dataType:'json',
        success: function(data){
            _this.listelm.removeClass('list-loading');
            if(data.error == 0){
                _this.Data = data['pageBean'].page;
                _this.AllData = data;
                _this.pageTotalNum = data['pageBean'].totalPageNum;
                _this.initPageNum = _this.param.curPage;
                if(_this.Data.length>0){
                    _this.initPage(_this.param.curPage);
                }else{
                    var oLi = $('<li class="none">暂无数据</li>');
                    var oHeight = _this.listelm.height();
                    if(oHeight>0){
                        oLi.css({'line-height':oHeight+'px'})
                    }else{
                        oLi.css({'line-height':'60px'});
                    }
                    oLi.appendTo(_this.listelm);
                    _this.elm.empty();
                    if(_this.fn){
                        _this.fn.call(_this,_this.AllData);
                    }
                }
            }else{
            	var oLi = $('<li class="none">暂无数据</li>');
                var oHeight = _this.listelm.height();
                if(oHeight>0){
                      oLi.css({'line-height':oHeight+'px'})
                }else{
                      oLi.css({'line-height':'60px'});
                }
                oLi.appendTo(_this.listelm);
                _this.elm.empty();
                if(_this.fn){
                    _this.fn.call(_this,_this.AllData);
                }
            }
        }
    });
};
//初始化页面DOM数据
Page.prototype.initPage = function(num){
    var _this = this;
    this.elm.empty();
    //初始化数据
    if(this.listData){
        $$.initListData(this.listData,this.Data,this.listelm);
    };
    //pre
    var pre = $('<li><button type="button" class="pre">上一页</button></li>');
    pre.bind('click',function(){
        _this.Previou();
    });
    pre.appendTo(_this.elm);
    //生成页面列表
    if(_this.pageTotalNum>7){
        //first
        $('<li><button type="button" data-num="1">1</button></li>')
            .find('button').bind('click',function(){
            var index = $(this).data('num');
            if(index == _this.initPageNum)return;
            _this.toIndex(index);
        })
            .end()
            .appendTo(_this.elm);
        //center
        var x = 0;
        if(num>3 && (num+2)<_this.pageTotalNum){
            x=num-2;
        }else if(num+5>=_this.pageTotalNum){
            x=_this.pageTotalNum-5;
        }else{
            x=2;
        }
        //隐藏在开始之后
        if((num-2)>1){
            $('<li><span>...</span></li>').appendTo(_this.elm);
        };
        for(var i =x;i<=(x+4);i++){
            $('<li><button type="button" data-num="'+i+'">'+i+'</button></li>')
                .find('button').bind('click',function(){
                var index = $(this).data('num');
                if(index == _this.initPageNum)return;
                _this.toIndex(index);
            })
                .end()
                .appendTo(_this.elm);
        };
        //隐藏在结束之前
        if((x+2)<_this.pageTotalNum && (x+5)<_this.pageTotalNum){
            $('<li><span>...</span></li>').appendTo(_this.elm);
        };
        //last
        $('<li><button type="button" data-num="'+_this.pageTotalNum+'">'+_this.pageTotalNum+'</button></li>')
            .find('button').bind('click',function(){
            var index = $(this).data('num');
            if(index == _this.initPageNum)return;
            _this.toIndex(index);
        })
            .end()
            .appendTo(_this.elm);
    }else{
        for(var i =1;i<=_this.pageTotalNum;i++){
            var li = $('<li><button type="button" data-num="'+i+'">'+i+'</button></li>');
            li.find('button').bind('click',function(){
                var index = $(this).data('num');
                if(index == _this.initPageNum)return;
                _this.toIndex(index);
            });
            li.appendTo(_this.elm);
        };
    }
    //next
    var next = $('<li><button type="button" class="next">下一页</button></li>');
    next.bind('click',function(){
        _this.Next();
    });
    next.appendTo(_this.elm);
    _this.elm.find('li').eq(_this.initPageNum).addClass('active');
    //设置居中
    var liSize = _this.elm.find('li').size() - 2;
    liSize = liSize * 40 +180;
    _this.elm.css({'width':liSize+'px','margin':'30px auto'});
    $('[data-num="'+num+'"]').parent('li').addClass('active').siblings('li').removeClass('active');
    if(this.fn){
        this.fn.call(this,_this.AllData);
    }
    _this.pageLoading = true;
};
Page.prototype.Next = function(){
    if((Number(this.initPageNum)+1)>this.pageTotalNum){
        $$.toast('已经是最后一页了');
        return;
    }
    this.toIndex(Number(this.initPageNum)+1);
};
Page.prototype.Previou = function(){
    if((this.initPageNum-1)<1){
        $$.toast('当前已经是第一页了');
        return;
    }
    this.toIndex(Number(this.initPageNum)-1);
};
Page.prototype.toIndex = function(num){
    if(this.pageLoading==false)return;
    this.initAjax(num);
};
/*生成数据表格
 * @param list 分页数据参数[]
 * @param data 返回的单条数据
 * @param listelm 数据显示列表
 * @auth zhjy
 */
$$.initListData = function(list, data, listelm){
    if(data.length>0){
        for(var i=0;i<data.length;i++){
            if((i+1)%2 == 1){
                var oLi = $('<li class="interval"></li>');
            }else{
                var oLi = $('<li></li>');
            }
            for(var j=0;j<list.length;j++){
                var oP = $('<div class="children'+j+'"></div>');
                var oValue = data[i][list[j]['key']];
                var oCallback = list[j]['resolve'].call(this,oValue,data[i],i);
                oP.html(oCallback);
                oP.appendTo(oLi);
            };
            oLi.appendTo(listelm);
        }
    }
};
/*给表单添加状态
 * @auth zhjy
 */
$$.initInput = function(){
    $('input').focus(function(){
        if($(this).siblings('label.icon')){
            $(this).parent('.from').addClass('focus');
        }
    }).blur(function(){
        if($(this).siblings('label.icon')){
            $(this).parent('.from').removeClass('focus');
        }
    })
}
/*alert弹出框
 * @param text 弹出提示
 * @param fn 回调函数
 * @auth zhjy
 */
$$.alert = function(text, fn){
    new Dialog(text,true,fn);
}
/*confirm确认框
 * @param text 弹出提示
 * @param fn 回调函数
 * @auth zhjy
 */
$$.confirm = function(text, fn){
    new Dialog(text,false,fn);
}
/*获取URL后的传递参数
 * @param key 参数的传递字段
 * @auth zhjy
 */
$$.getUrlParam=function(key){
    var href = window.location.href;
    var param = href.substr(href.indexOf('?')+1).split('&'),obj={};
    for(var i=0;i<param.length;i++){
        var arr = param[i].split('=');
        obj[arr[0]] = arr[1];
    }
    return obj[key];
};
function Dialog(text,flag,fn){
    if(flag){
        this.Dom = ['<div class="ui-dialog">',
            '<div class="ui-peek"></div>',
            '<div class="ui-content">',
            '<div class="kindly-text">温馨提示</div>',
            '<div class="dialog-text">',
            '<p>{text}</p>',
            '</div>',
            '<div class="dialog-botton">',
            '<button class="dialog-true" type="button">确定</button>',
            '</div>',
            '</div>',
            '</div>'].join("");
    }else{
        this.Dom = ['<div class="ui-dialog">',
            '<div class="ui-peek"></div>',
            '<div class="ui-content">',
            '<div class="kindly-text">温馨提示</div>',
            '<div class="dialog-text">',
            '<p>{text}</p>',
            '</div>',
            '<div class="dialog-botton">',
            '<a class="dialog-false" href="javascript:void(0);">取消</a>',
            '<button class="dialog-true" type="button">确定</button>',
            '</div>',
            '</div>',
            '</div>'].join("");
    }
    if(fn)this.fn = fn;
    this.text = text;
    this.init();
}
Dialog.prototype.init = function(){
    this.initDom();
    this.initEvent();
    this.showDom();
};
Dialog.prototype.initDom = function(){
    var node = document.createElement('div');
    	node.innerHTML = this.Dom.replace('{text}',this.text);
    this.dom = node.childNodes[0];
};
Dialog.prototype.initEvent = function(){
    var _this = this;
    if(document.addEventListener){
        this.dom.addEventListener('click',function(e){
            try{
                if(e.target.tagName == 'A'){
                    _this.hideDom();
                }else if(e.target.tagName == 'BUTTON'){
                    _this.hideDom(true);
                }
            }catch(a){
                if(e.srcElement.nodeName == 'A'){
                    _this.hideDom();
                }else if(e.srcElement.nodeName == 'BUTTON'){
                    _this.hideDom(true);
                }
            }
        }, false)
    }else{
        this.dom.attachEvent('onclick', function(e){
            try{
                if(e.target.tagName == 'A'){
                    _this.hideDom();
                }else if(e.target.tagName == 'BUTTON'){
                    _this.hideDom(true);
                }
            }catch(a){
                if(e.srcElement.nodeName == 'A'){
                    _this.hideDom();
                }else if(e.srcElement.nodeName == 'BUTTON'){
                    _this.hideDom(true);
                }
            }
        })
    }
};
Dialog.prototype.showDom = function(){
    var _this = this;
    document.body.appendChild(this.dom);
    setTimeout(function(){
        _this.dom.setAttribute('class','ui-dialog transition');
    },100)
}
Dialog.prototype.hideDom = function(flag){
    if(flag){
        if(this.fn){
            this.fn.call(this,true);
            document.body.removeChild(this.dom);
        }else{
            document.body.removeChild(this.dom);
        }
    }else{
        document.body.removeChild(this.dom);
    }
};
/*web-app
 * @适配
 * @auth zhjy
 */
$$.fontSize = function(doc,win){
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    (setRem = function () {
        var docEl = doc.documentElement;
        var clientWidth = docEl.clientWidth;
        if(clientWidth>768){
            docEl.style.fontSize = 100 + "px";
        }else{
            docEl.style.fontSize = 75*(clientWidth / 750) + "px";
        }
    })(doc,win);
    win.addEventListener(resizeEvt,setRem);
}


