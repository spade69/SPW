/*
Main page source code
Of My Super Personal Website
Author Jason
Date 2016/7/15
*/


/*原生js处理方式

	 JSON.parse(jsondata,function(k,v){
 			console.log(k);
			return v;
		});
*/




function SideBar(ele){
	//ele <==> $(".sidebar")
	$(window).scroll(function(){
		var items=$("#content").find(".item");
		var top=$(document).scrollTop();
		var currentId="";// 滚动条现在所在位置的item id
		items.each(function(){
			var m=$(this);
			//注意 m.offset().top 代表每一个item的顶部位置
			if(top>m.offset().top-200){
				currentId="#"+m.attr("id");
			}else{
				return false;
			}
		});

		var currentLink=ele.find(".currentx");
		if(currentId&&currentLink.attr("href")!=currentId){
			currentLink.removeClass("currentx");
			ele.find("[href="+currentId+"]").addClass("currentx");
		}
	});
}

//Tab switch ele --> id=tab
	//遍历每一个tab,用事件代理捕捉。
	//1)是绑定所有的孩子和click事件
	//2) 事件委托，绑定到父元素
function tab_switch(ele){
	var myEle=$('#'+ele);	
	myEle.on('click','li a',function(event){
		$("#tabContent").children().addClass("hidden");
		var tmp=myEle.find("li a");
		for(var i=0;i<tmp.length;i++){
			if(event.target===tmp[i]){
				$("#tabContent").children().eq(i).removeClass("hidden");
				if(i===4)//Graph
				waterfall('gallery','box');
				//else if(i==2)//Leave Note
				//waterfallJQ('gallery');
			}
		}
	});
}

//根据class获取元素,考虑兼容性的时候，这个函数有用
//因为就算你设置的className是没有重复的，用getElementsByClassName也只是
//在兼容的浏览器上面才有用。
function getByClass(parent,clsName)
{
	var boxArr=[];
	var oElements=parent.getElementsByTagName('*');
	for (var i = 0; i < oElements.length; i++) {
		if(oElements[i].className==clsName)
			boxArr.push(oElements[i]);
	}
	return boxArr;
}


//Waterfull layout 瀑布流布局
//纯Js实现
function waterfall(parent,box){
	//将gallery下的所有class为box的元素取出来
	var oParent=document.getElementById(parent);
	var oBoxs=getByClass(oParent,box);
	//计算整个页面显示的列数(页面宽/box的宽)
	var oBoxW=oBoxs[0].offsetWidth;//单列的宽度
	//clientWidth为页面宽度，兼容所有浏览器的写法
	var dWidth=document.documentElement.clientWidth||document.body.clientWidth||window.innerWidth;
	console.log(dWidth);
	var cols=Math.floor(dWidth/oBoxW);
	//设置Gallery的宽度，居中对齐
	oParent.style.cssText='width:'+oBoxW*cols+'px;margin:0 auto';

	var hArr=[];
	for(var i=0;i<oBoxs.length;i++)
	{
		console.log(oBoxs[i]);
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

//waterfall JQ ver
function waterfallJQ(parent){
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

//检测是否加载图片
//同样需要考虑浏览器兼容性
//算法：比较 浏览器的滚动的距离+浏览器页面的高度 与 最后一张图片距离顶部的距离+该元素一半的高度

function checkScrollSlide(){
	var oParent=document.getElementById('gallery');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	//混杂模式 标准模式！
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var height=document.documentElement.clientHeight||document.body.clientHeight;
	return (lastBoxH<scrollTop+height);
}

//滚动条 hidden处理
function scrollHidden(ele){
	//对于MOZ window.innerWidth 不准确,放最后把
	var dWidth=document.documentElement.clientWidth||document.body.clientWidth||window.innerWidth;
	if(dWidth<750)
	{
		ele.find("a").css("overflow","hidden");
	}
	else{
		ele.find("a").css("overflow","visible");
	}
}

require(['createSideBar','dragMove','getGeoLocation'],function(createSideBar,dragMove,getGeoLocation){
	
	var $ali = $('#tab>li>a');
	var $li = $('#tab>li');
	var $ul = $('#tab');
	var $left=$('#left');
	var $person=$('#person');
	var $sidebar=$('#sidebar');

	var interval=5000;
		$ali.mouseover(function(){
			//$(this) indicates $ali dom node
			var $this = $(this);
			var $t = $this.index();
			$this.addClass('current');
			//alert("selected");
			//$ul.eq($t).css('display','block');
		});

		$ali.mouseout(function(){
		 	$ali.removeClass('current');
		 });

	createSideBar($person);//$left
	dragMove($left);
	SideBar($sidebar);
	//隔一段时间设置一次<a>的overflow，设置为hidden就不会有scroll滚动条
	setInterval(function(){
		scrollHidden($ul);
	},500);
	
/*weather api
/*
Note this example will work only over
http and NOT https because of a http resource used below.
*/
	var loc=new getGeoLocation.CreateLocation();
	loc.getLocation();
	loc.handlePermission();

//异步执行的，不会等待函数执行结束才执行。
//每隔多久刷新一次数据,这个只是读取数据 
	setTimeout(function(){
		loc.myGetJSON();
	},5000);
	//When acquire data, reset Interval to 30s!
	var myInterval=setInterval(function(){
		loc.myGetJSON();
		console.log(interval);
		if(loc.latitude!==undefined&&loc.longitude!==undefined)
		{
			window.clearInterval(myInterval);
			//console.log($(this)); this--> window
			interval=30000;
			setInterval(function(){
				loc.myGetJSON();
				console.log(interval);
			},interval);
		}
	//if(!handlePermission())
		//getLocation();
	},interval);
//manually ask if allowed location ,to get weather data.
	$("#show_btn").on("click",function(){
		loc.getLocation();
	});
//Info. Improving user experience
	$("#weather-info").text(function(){
		if(loc.latitude===undefined||loc.longitude===undefined)
			return "Loading weather data...";
	});

	tab_switch("tab");
	
});


require(['popLogin'],function(popLogin){
	var afloat=new popLogin.CreateFloat('closeBtn','mask','pop','login');
	afloat.autoCenter('pop');
	afloat.resizable('pop');
});