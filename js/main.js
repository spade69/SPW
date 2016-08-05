/*
Main page source code
Of My Super Personal Website
Author Jason
Date 2016/7/15
*/

//Global object. saved postion data.
var obj={
	latitude:undefined,
	longitude:undefined
};

function createSideBar(ele){
	//创建几个选项tap并用bootstrap附上样式
	//注意插入到Main.html，但是直接写/images/headPhoto.png是不对的,要使用相对路径
	var $personal=$('<div><img src="../SuperPersonal/images/headPhoto.png" class="img-circle"></div>');
	var $tap=$('<a id="tap" href="#" class="list-group-item active"><span class="glyphicon glyphicon-tag"></span>Content</a>');
	var $tap1=$('<a id="tap1" href="#" class="list-group-item active"><span class="glyphicon glyphicon-tag"></span>Gallery</a>');
	ele.append($personal);
	ele.append($tap);
	ele.append($tap1);
	ele.find("img").css({
		"width":"150px",
		"height":"150px",
		"left":"50px",
		"position":"relative"
	});
	//<div id="person_img">
	ele.find("img").on("click",function(){
		console.log($(this));
		$(this).animate({
			 "margin-left":"20px",
			 //left:"toggle"
		},300);
	});

	ele.on('dragstart',function(){
		return false;
	});

}

//实现元素的拖拉
function dragMove(ele){
	var move=false;//标记移动
	ele.mousedown(function(event){
		move=true;
		//event.pageX  event.pageY 当前鼠标的横纵坐标
		//_x 是鼠标离最左边的距离减去div离最左边的距离，即鼠标相对于div左边边距的距离(margin)
		 _x=event.pageX-parseInt(ele.css("left"));//left左外边距边界与其包含块左边界之间的偏移。
		 _y=event.pageY-parseInt(ele.css("top"));

		// _x=event.pageX-ele.offset().left;
		// _y=event.pageY-ele.offset().top;
	});
	//
	$("body").mousemove(function(event){
		if(move){
			var x=event.pageX-_x;//控件左上角到屏幕左上角的相对位置
			var y=event.pageY-_y;
			if(x<-100)
				x=-100;
			if(y<-100)
				y=-100;
			if(x>700)
				x=700;
			//bottom，最下方的值不好设置，因为文档会随着内容拉长，不能设为定值
			ele.css({"top":y,"left":x});
		}
	});
	$("body").mouseup(function(){
		move=false;
	});


}

//HTML5 Geolocation
function getLocation(){
	if(navigator.geolocation){

		//navigator.geolocation.getCurrentPosition(locationSuccess,showError,);
		
		var wpid=navigator.geolocation.watchPosition(locationSuccess,showError,{
			//指示浏览器获取高精度的位置
			enableHighAcuracy:true,
			//指定获取地理位置的超时时间，ms
			timeout:50000,
			//最长有效期，重复获取地理位置时，此参数多久再次获取
			maximumAge:30000
		});
	}
	else{
		alert("Geolocation is not supported by this browser!");
	}
}

function locationSuccess(position){
	var coords=position.coords;
	obj.latitude=coords.latitude+0.00374531687912;//偏移量校正值 
	obj.longitude=coords.longitude+0.008774687519;
	console.log(obj);
}


function showError(error){
	switch(error.code)
	{
		case error.PERMISSION_DENIED:
			console.log("User denied the request for Geolocation.");
			break;
		case error.POSITION_UNAVAILABLE:
			console.log("Location information is unavailable.");
			break;
		case error.TIMEOUT:
			console.log("The request to get user location timed out.");
			break;
		case error.UNKNOWN_ERROR:
			console.log("An unknown error occurred.");
			break;
	}
}

//AJAX longPolling,but it needs the corperation with server-side
function longPolling(){
	var api="http://api.openweathermap.org/data/2.5/weather?q=";
	var appid="&APPID=4c16d64121b3d1c838c58a8c8b100a15";
	var city="Shenzhen";
	// var lat="lat="+obj.latitude;
	// var lon="lon="+obj.longitude;
	//返回数据的单位。不设置默认不是摄氏度
	var units="&units=metric";
	var cb="&jsoncallback=JSON_CALLBACK";
	$.ajax({
		url:api+city+units+appid+cb,
		data:{"timed":new Date().getTime()},
		dataType:"jsonp",
		jsonpCallback:"JSON_CALLBACK",
		success:function(data){

		}
	});
}

function myGetJSON(){
	var api="http://api.openweathermap.org/data/2.5/weather?";
	var appid="&APPID=4c16d64121b3d1c838c58a8c8b100a15";
	var city="q=Shenzhen";
	//返回数据的单位。不设置默认不是摄氏度
	var units="&units=metric";
	//&jsoncallback=?,设置为?是jq随机产生一个名字，但是此处必须指定一个名字，都可以除了?
	var lat="lat="+obj.latitude;
	var lon="&lon="+obj.longitude;
	
	var cb="&jsoncallback=JSON_CALLBACK";
	var html='<h4>MyWeather</h4>';
	$.getJSON(api+lat+lon+units+appid+cb,function(data){
	var weatherData='<ul>';
		//data已经被转为jq的对象
	var temp=Math.round(data.main.temp);
	var descript=data.weather[0].description;		
		$.each(data,function(k,v){
		 	//console.log(k);
		 });
	html+='<span>'+data.name+','+data.sys.country+'</span>';
	$("#weather").html(html);
	weatherData+='<li>'+temp+'\u2103'+'</li>'+'<li>'+descript+'</li>';
	weatherData+='</ul>';
	$("#weather").append(weatherData);
		
		
	});
}

//Supoo
function handlePermission(){
	if(navigator.permissions){
	navigator.permissions.query({name:'geolocation'}).then(function(result){
		if(result.state=='granted'){
			report(result.state);
			return false;//it doesn't need to ask if location is allowed to visited
		}else if(result.state=='prompt'){
			report(result.state);
			return true;
		}else if(result.state=='denied'){
			report(result.state);
			return false;
		}
		result.onchange=function(){
			report(result.state);
		}
	});
	}
	else
	{
		console.log("The browser doesn't support Permissions API!");
	}
}

function report(state){
	console.log('Permission: '+state);
}


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
				if(i===4)
				waterfall('gallery','box');
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
	var dWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
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


$(function(){
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

/*weather api*/
/*
Note this example will work only over
http and NOT https because of a http resource used below.
*/

	getLocation();
	handlePermission();

//异步执行的，不会等待函数执行结束才执行。
//每隔多久刷新一次数据,这个只是读取数据 
	setTimeout(function(){
		myGetJSON();
	},5000);
	//When acquire data, reset Interval to 30s!
	var myInterval=setInterval(function(){
		myGetJSON();
		console.log(interval);
		if(obj.latitude!==undefined&&obj.longitude!==undefined)
		{
			window.clearInterval(myInterval);
			//console.log($(this)); this--> window
			interval=30000;
			setInterval(function(){
				myGetJSON();
				console.log(interval);
			},interval);
		}
	//if(!handlePermission())
		//getLocation();
	},interval);
//manually ask if allowed location ,to get weather data.
	$("#show_btn").on("click",function(){
		getLocation();
	});
//Info. Improving user experience
	$("#weather-info").text(function(){
		if(obj.latitude===undefined||obj.longitude===undefined)
			return "Loading weather data...";
	});

	tab_switch("tab");
	
});


/*原生js处理方式

// JSON.parse(jsondata,function(k,v){
// 			console.log(k);
// 			//return v;
// 		});

*/

