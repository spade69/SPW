/*
My Waterfall  module source
Author Jason
Date 2016/9/12
*/

//Waterfull layout 瀑布流布局
define(['jquery'],function(jquery){
//纯Js实现 这个方法主要是修改内联样式 style了~
    waterfall=function(parent,box){ 
        //将gallery下的所有class为box的元素取出来
        var oParent=document.getElementById(parent);
        var oBoxs=getByClass(oParent,box);
        //计算整个页面显示的列数(页面宽/box的宽)
        var oBoxW=oBoxs[0].offsetWidth;//单列的宽度
        //clientWidth为页面宽度，兼容所有浏览器的写法
        var dWidth=document.documentElement.clientWidth||document.body.clientWidth||window.innerWidth;

        var cols=Math.floor(dWidth/oBoxW);
        //设置Gallery的宽度，居中对齐
        oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';

        var hArr=[];
        for(var i=0;i<oBoxs.length;i++)
        {
            //console.log(oBoxs[i]);
            if(i<cols){
                hArr.push(oBoxs[i].offsetHeight);
            }else{
                //本来 min函数只能比较 两个数，用apply扩展到数组
                var minH=Math.min.apply(null,hArr);// min apply to array hArr!
                //返回最小的数对应的index
                var index=hArr.indexOf(minH);
                oBoxs[i].style.position='absolute';
                oBoxs[i].style.top=minH+'px';
                oBoxs[i].style.left=oBoxW*index+'px';
                //更新每一列的高度！ 每次都是把图片加到列最矮的下面
                hArr[index]+=oBoxs[i].offsetHeight;
            }
        }
    }
//waterfall JQ ver 渲染这个DOM
    waterfallJQ=function(parent){
        var oParent=$("#"+parent);
        var oBoxs=oParent.children("div.box");
        //var oBoxW=oBoxs[0].outerWidth();
        var oBoxW=oBoxs.eq(0).outerWidth();
        var dWidth=$(window).width();
        var cols=Math.floor(dWidth/oBoxW);
        oParent.css({
            width:oBoxW*cols+'px',
            margin:"0 auto"
        });
        var hArr=[];
        oBoxs.each(function(index,value){
            var h=oBoxs.eq(index).outerHeight();
            if(index<cols){
                hArr[index]=h;
            }else{
                var minH=Math.min.apply(null,hArr);// min apply to array hArr!
                var minIndex=hArr.indexOf(minH);
                // value=oBoxs[index]
                $(value).css({
                    'position':'absolute',
                    'top':minH+'px',
                    'left':minIndex*oBoxW+'px'
                });
                hArr[minIndex]+=$(value).outerHeight();
            }
        });
    }
    //根据class获取元素,考虑兼容性的时候，这个函数有用
//因为就算你设置的className是没有重复的，用getElementsByClassName也只是
//在兼容的浏览器上面才有用。
    getByClass=function(parent,clsName)
    { //clsName 要匹配的类的名字
        if(parent.getElementsByClassName(clsName)){
            var boxArr=parent.getElementsByClassName(clsName);
            return boxArr;
        }
        var boxArr=[];
        var oElements=parent.getElementsByTagName('*');
        for (var i = 0; i < oElements.length; i++) {
            if(oElements[i].className==clsName)
                boxArr.push(oElements[i]);
        }
        return boxArr;
    }

    //检测是否加载图片
    //同样需要考虑浏览器兼容性
    //算法：比较 浏览器的滚动的距离+浏览器页面的高度 与 最后一张图片距离顶部的距离+该元素一半的高度

    checkScrollSlide=function(parent,box){
        var oParent=document.getElementById(parent);
        var oBoxs=getByClass(oParent,box);//获取所有匹配这个样式名的元素
        var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
        //混杂模式 标准模式！+
        var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
        var height=document.documentElement.clientHeight||document.body.clientHeight;
        //
        return (lastBoxH<scrollTop+height);
    }
    init=function(parent,urlBase){

        var urlBase="//www.linzhida.cc/balight/file/photos/";  //http:
        var oParent=document.getElementById(parent);
        oParent.innerHTML="<div class='box'><div class='pic'><img src='"+urlBase+"0.jpg'></div></div>";
    }
    getPhoto=function(parent,count){
        //return json dataInt={"data":[{"src":"0.jpg"},{"src","1.jpg"},....]};
        var urlBase="//www.linzhida.cc/balight/file/photos/";//http:
        var oParent=document.getElementById(parent);
        //for (var i = 1; i <23; i++) {
            var oBox=document.createElement('div');
            oBox.className='box';
            oParent.appendChild(oBox);
            var oPic=document.createElement('div');
            oPic.className='pic';
            oBox.appendChild(oPic);
            var oImg=document.createElement('img');
            oImg.src=urlBase+count+".jpg";
            oPic.appendChild(oImg);
        //}
    
    }
    //calculate the row and column 
    calInitial=function(picWidth){
        var picHeight=picWidth;//
        var viewHeight=window.innerHeight||document.documentElement.clientHeight;
        var viewWidth=window.innerWidth||document.documentElement.clientWidth;
        var columns=Math.floor(viewWidth/picWidth-1);  //consider the padding and margin
        var rows=Math.floor(viewHeight/picHeight);
        return rows*columns;
    }

});