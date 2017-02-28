
define(function(){
    //实现在String的原型里面,即往原型增加了一个新的共享方法
    String.prototype.glen=function(){
        var len=0;
        for(var i=0;i<this.length;i++){
            if(this.charCodeAt(i)>127||this.charCodeAt(i)==94){
                len+=2;
            }
            else{
                len++;
            }
        }
        return len;
    }

    /*
    $=function(e1){
        return document.querySelector(e1);
    }*/
    // 跨浏览器兼容的工具函数
    addEvent=function(element,type,handler) {
        if(element.addEventListener) {
            element.addEventListener(type, handler,false);
        }
        else if(element.attachEvent) {
            element.attachEvent("on" + type, handler);
        }
        else {
            element["on" + type] = handler;
        }
    }

        //自动居中
    autoCenter=function(ele){
        var bodyW=document.body.clientWidth;
        var bodyH=document.body.clientHeight;

        var elW=ele.offsetWidth;
        var elH=ele.offsetHeight;

        ele.style.left=(bodyW-elW)/2+"px";
        ele.style.top=(bodyH-elH)/2+"px";
    }

    //使元素自动全屏
    fillToBody=function(ele){
        ele.style.width=document.body.clientWidth+"px";
        ele.style.height=document.body.clientHeight+"px";
    }

    //return is not needed!
    randomString=function(len){
        len=len||32;
        var chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var maxPos=chars.length;
        var pwd='';
        for(var i=0;i<len;i++){
            pwd+=chars.charAt(Math.floor(Math.random()*maxPos));

        }
        return pwd;
    }

    //DOMReady
    //为了在DOM加载完成之后，脚本载入之前执行！
//当页面加载完成后去做一些事情：绑定事件、DOM操作某些结点等。
//window.onload是很迟的，在加载完图片脚本样式和iframe中的所有资源之后
//W3C提出的DOMContentLoaded方法与onload相比该方法触发时间更早
//页面加载完DOM后立刻触发。 IE 9+支持
//同时支持iframe document和本身的document
    myDOMReady=function(documentEle,fn) {
        //判断如果支持addEventListten
        if(documentEle.addEventListener){
            documentEle.addEventListener('DOMContentLoaded',fn,false);
        }else{
            IEContentLoaded(fn);
        }
    }

//IE下模拟DOMContentLoaded
    IEContentLoaded=function(fn){
        var done=false,document=window.document;
        //只执行一次用户的回调函数init
        var init=function(){
            if(!done){
                done=true;
                fn();
            }
        }
        (function(){
            try{
                //DOM Tree 未创建完之前调用doScroll会抛出错误
                //doScroll是一个伟大的hack
                document.documentElement.doScroll('left');
            }catch(err){
                //延时再执行
                setTimeout(argument.callee, 1);
                return;
            }
            //没有错误表示DOM树创建完毕，执行用户回调
            init();
        })();
        //监听document的加载状态
        document.onreadystatechange=function(){
            //如果用户是在DOMReady之后调用的函数立即执行用户回调
            if(document.readyState==='complete'){
                document.onreadystatechange=null;
                init();
            }
        }
    }
    //code 过大溢出了
    loadScriptString=function(documentEle,code){
        var script=document.createElement('script');
        script.type='text/javascript';
        try{
            script.appendChild(document.createTextNode(code));
        }catch(ex){
            script.text=code;
        }
        documentEle.body.appendChild(script);
    }
});