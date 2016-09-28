// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// Some lib from CDN!!!!!
// except 'app' ones, 
require.config({
	//直接改变基目录
	"baseUrl":"js/common",
	"paths":{
		"app":"../app",
		"jquery":"http://libs.baidu.com/jquery/2.0.0/jquery.min",
		"bootstrap":"http://libs.baidu.com/bootstrap/3.0.3/js/bootstrap.min"
	}
});
//only use shim config for non-AMD scripts
//Here we config bootstrap.min.js, it depends jquery,so we should write deps:['jquery']
//exports: the name you use. We introduce the bootstrap using CDN, then config it using shim!
//
require.config({

    shim: {
        'bootstrap': {
            //These script dependencies should be loaded before loading
            //bootstrap.min.js
            deps: [ 'jquery'],
            //Once loaded, use the global 'bootstrap' as the
            //module value.
            exports: 'bootstrap'
        },
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);
/***
Opening Animation
Of My Super Personal Website
Author Jason
Date 2016/7/10
***/

/**
前面是函数定义
后面是jQuery
*/

//背景颜色值
var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c','#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

 //quote
 var quotes=["Give me a museum and I'll fill it!","Like a fire","A"];


//Using setInterval to create a animate
function draw(id){
	var canvas=document.getElementById(id);
	if(canvas==null)
		return false;
	var context=canvas.getContext("2d");

	// context.fillStyle="red";
	// context.strokeStyle="#ff0011";
	// context.fillRect(0,0,100,100);
	// context.strokeRect(0,0,100,100);
	
	var interval=setInterval(function(){
		move(context);
	},1);


}

var x = 0;//矩形开始坐标
var y = 0;//矩形结束坐标
var mx = 0;//0右1左
var my = 0; //0下1上
var ml = 1;//每次移动长度
var w = 20;//矩形宽度
var h = 20;//矩形高度
var cw = 500;//canvas宽度
var ch = 400; //canvas高度

function move(context){
	context.clearRect(0,0,500,400);//每次都会清除这个区域的内容
	context.fillStyle = "red";
    context.fillRect(x, y, w, h); 
    if(mx==0){
    	x=x+ml;
    	if(x>=cw-w){
    		mx=1;
    	}
    }
    else{
    	x=x-ml;
    	if(x<=0){
    		mx=0;
    	}
    }
    if(my==0){
    	y=y+ml;
    	if(y>=ch-h){
    		my=1;
    	}
    }
    else{
    	y=y-ml;
    	if(y<=0){
    		my=0;
    	}
    }
}

// 圆弧context.arc(x, y, radius, starAngle,endAngle, anticlockwise)
//利用beginPath closePath() 绘制路径
function draw0(id){
	var canvas=document.getElementById(id);
	if(canvas==null){return false;}
	var context=canvas.getContext('2d');
	context.beginPath();
	context.arc(200,150,20,0,Math.PI*2,true);
	context.fillStyle="#12eeff";
	context.fill();
	context.closePath();
	
	context.beginPath();
	context.arc(300,150,20,0,Math.PI*2,false);
	context.fillStyle="black";
	context.fill();
	context.closePath();
}

function drawline(context){
	context.strokeStyle="white";
	context.moveTo(96,80);
	context.lineTo(120,96);
	context.lineTo(112,105);
	context.moveTo(102,118);
	context.lineTo(80,102);
	context.lineTo(85,95);
	context.stroke();
}

//绘制多线段构成的锯齿形多边形
function draw8(id){
	var canvas=document.getElementById(id);
	if(canvas==null){return false;}
	var context=canvas.getContext('2d');
	
	var n=0;
	//100, 100 是多边形的原点
	var dx=100;//坐标偏移值
	var dy=100;
	var s=30;//控制图案的大小
	
	context.beginPath();
	context.fillStyle='black'//'#4B0082';
	context.strokeStyle='white';
	var x=Math.sin(0);
	var y=Math.cos(0);
	//改变图案的边数arcnum不等于图案的边数
	var arcnum=5;//11是超级多边形
	var dig=Math.PI/15*arcnum;
	for(var i=0;i<30;i++){
		var x=Math.sin(i*dig);
		var y=Math.cos(i*dig);
		context.lineTo(dx+x*s,dy+y*s);
	}
	context.closePath();
	context.fill();//填充到多边形中
	context.stroke();//设置到边框中
	drawline(context);
}


function open_index(){
 //openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
 //还有哪些方式可以打开url，与<a>的区别？
 window.open('Main.html');
}

//产生quote以及相应的颜色，将这个函数绑定到nextquote 按钮处，
//每次按下就会quote切换以颜色切换
function getQuote(){
	//产生随机的颜色。
	var color=Math.floor(Math.random()*colors.length);
	//console.log(colors[color]);
	var xcolor=colors[color];
	/*需要插件支持才能实现
	$("body").animate({
		backgroundColor:xcolor,
		color:xcolor
	},1000);*/
	$("body").css("backgroundColor",xcolor);

	$(".btn").css("backgroundColor",xcolor);
	$(".quote-text").css("color",xcolor);
}


//jquery文档加载完全之后放这个里面
$(function(){
	
	$("#btn").on('click',open_index);
	$("#new-quote").on('click',getQuote);
	$("#myAni").on('mouseover',function(){
		$("#myAni").css("cursor","pointer");
	});

	$("#myAni").on('click',function(){
		window.location.reload();
	});

});

window.onload=function(){
	draw("myCanvas");
	//draw0("myCanvas");
	draw8("myAni");
}

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
function tab_switch(ele,myLogin,myPosts,mySignUp){
	var myEle=$('#'+ele);	
	myEle.on('click','li a',function(event){
		$("#tabContent").children().addClass("hidden");
		var tmp=myEle.find("li a");
		for(var i=0;i<tmp.length;i++){
			if(event.target===tmp[i]){
				$("#tabContent").children().eq(i).removeClass("hidden");
				switch(i)
				{//Graph
					case 4:
						getPhoto('gallery');
						waterfall('gallery','box');
						break;
			
					case 3:
						var mySign=new mySignUp.createSignUp('username','passwd','xpasswd','mail',
							'info','icode','dcodex','dmail');
						mySign.myVerify();
						mySign.signUpPost();
						break;
					
					case 2://Leave Note
						var myLog=new myLogin.createLogin('btnSignIn','userid','codeid','loginInfo','loginPwd');
						var myPo=new myPosts.createPosts('posts','txtInput','oContent');
						myLog.myValidateFresh();
						myLog.myVerify();
						myLog.myPost('loginForm','pop');
						// $("#btnSignIn").on('submit',function(event){
						// 	event.preventDefault();
						// 	myLog.myPost();
						// });
						myPo.init();
						break;
					case 1:
						window.location.href="blog/tech.html";
						break;
					default:break;
				}
			}
		}
	});
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

require(['createSideBar','dragMove','getGeoLocation','bootstrap','waterFall','mySignUp','myLogin','myPosts'],
	function(createSideBar,dragMove,getGeoLocation,bootstrap,waterFall,mySignUp,myLogin,myPosts){
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

	tab_switch("tab",myLogin,myPosts,mySignUp);

});


require(['popLogin'],function(popLogin){
	var afloat=new popLogin.CreateFloat('closeBtn','mask','pop','login');
	afloat.autoCenter('pop');
	afloat.resizable('pop');
});
define(['jquery'],function(jquery){
	return function(ele){
	// createSideBar(ele)
	//创建几个选项tap并用bootstrap附上样式
	//注意插入到Main.html，但是直接写/images/headPhoto.png是不对的,要使用相对路径
	var $personal=$('<div><img src="./images/headPhoto.png" class="img-circle"></div>');
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
});
function getQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(response) {
      var r = JSON.parse(response);
      currentQuote = r.quote;
      currentAuthor = r.author;
      if(inIframe())
      {
        $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
        $('#tumblr-quote').attr('href', 'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(currentAuthor)+'&content=' + encodeURIComponent(currentQuote));
      }
      $(".quote-text").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#text').text(r.quote);
        });

      $(".quote-author").animate({
          opacity: 0
        }, 500,
        function() {
          $(this).animate({
            opacity: 1
          }, 500);
          $('#author').html(r.author);
        });

      var color = Math.floor(Math.random() * colors.length);
      $("html body").animate({
        backgroundColor: colors[color],
        color: colors[color]
      }, 1000);
      $(".button").animate({
        backgroundColor: colors[color]
      }, 1000);
    }
  });
}
//实现元素的拖拉
define(['jquery'],function(jquery){
	return function(ele){
	//dragMove(ele){
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
});

/*
My GeoLocation  module source
Author Jason
Date 2016/9/11
*/
//HTML5 Geolocation
define(['jquery'],function(jquery){

//Global object. saved postion data.
	function CreateLocation(){
		this.latitude=undefined;
		this.longitude=undefined;
	}

	CreateLocation.prototype={
		getLocation:function(){
			if(navigator.geolocation){

				//navigator.geolocation.getCurrentPosition(locationSuccess,showError,);
				var self=this;
				var wpid=navigator.geolocation.watchPosition(self.locationSuccess,self.showError,{
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
		},
		locationSuccess:function(position){
			var coords=position.coords;
			this.latitude=coords.latitude+0.00374531687912;//偏移量校正值 
			this.longitude=coords.longitude+0.008774687519;
			console.log(position);
		},
		showError:function(error){
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
		},

	//AJAX longPolling,but it needs the corperation with server-side
		longPolling:function(){
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
		},
		myGetJSON:function(){
			var api="http://api.openweathermap.org/data/2.5/weather?";
			var appid="&APPID=4c16d64121b3d1c838c58a8c8b100a15";
			var city="q=Shenzhen";
			//返回数据的单位。不设置默认不是摄氏度
			var units="&units=metric";
			//&jsoncallback=?,设置为?是jq随机产生一个名字，但是此处必须指定一个名字，都可以除了?
			var lat="lat="+this.latitude;
			var lon="&lon="+this.longitude;
			
			var cb="&jsoncallback=JSON_CALLBACK";
			var html='<h4>MyWeather</h4>';

			$.getJSON(api+lat+lon+units+appid+cb,function(data){
				var weatherData='<ul>';
					//data已经被转为jq的对象
				var temp=Math.round(data.main.temp);
				var descript=data.weather[0].description;		
					/*$.each(data,function(k,v){
					 	console.log(k);
					 });*/
				html+='<span>'+data.name+','+data.sys.country+'</span>';
				$("#weather").html(html);
				weatherData+='<li>'+temp+'\u2103'+'</li>'+'<li>'+descript+'</li>';
				weatherData+='</ul>';
				$("#weather").append(weatherData);	
			});
		},
		handlePermission:function(){
			if(navigator.permissions){
				var self=this;
				navigator.permissions.query({name:'geolocation'}).then(function(result){
				if(result.state=='granted'){
					self.report(result.state);
					return false;//it doesn't need to ask if location is allowed to visited
				}else if(result.state=='prompt'){
					self.report(result.state);
					return true;
				}else if(result.state=='denied'){
					self.report(result.state);
					return false;
				}
					result.onchange=function(){
						self.report(result.state);
					}
				});
			}
			else
			{
				console.log("The browser doesn't support Permissions API!");
			}
		},
		report:function(state){
			console.log('Permission: '+state);
		}
	}
	return {
		CreateLocation:CreateLocation
	}

});
/*Canvas transfer img to Base64 string 
Author:Jason
*/

var src="xxx.jpg";

function set(key){
	var img=document.createElement('img');
	//当图片加载完成时触发回调函数
	img.addEventListener('load',function(){
		var imgcanvas=document.createElement("canvas");
		var imgContext=imgcanvas.getContext("2d");
		//确保canvas元素的大小和图片尺寸一致
		imgcanvas.width=this.width;
		imgcanvas.height=this.height;

		//渲染图片到canvas中 定位以及宽高
		// context.drawImage(img,x,y,width,height);
		imgContext.drawImage(this,0,0,this.width,this.height);
		//用data url形式取出
		var imgAsDataURL=imgcanvas.toDataURL("image/png");

		//保存到本地存储中
		try{
			localStorage.setItem(key,imgAsDataURL);//存到localstorage~！
		}catch(e){
			console.log("Storage failed:"+e);
		}
	},false);
	img.src=src;
}

function get(key){//从本地缓存取图片并渲染
	var srcStr=localStorage.getItem(key);
	var imgObj=document.createElement('img');
	imgObj.src=srcstr;
	document.body.appendChild(imgObj);
}


/*
My Login  module source
Author Jason
Date 2016/9/12
*/

define(['verify','jquery'],function(verify,jquery){
	//jquery and querySelector conflict!!
	//写成function(){..}之类的不行，必须是var xxx=function.
	//具体看看requirejs源码
	var createLogin=function(btnSignIn,username,passwd,info,icode){
		this.btn=document.getElementById(btnSignIn);
		this.name=document.getElementById(username);
		this.passwd=document.getElementById(passwd);
		this.info=document.getElementById(info);
		this.icode=document.getElementById(icode);
		this.btn.disabled=true;//禁用
	}
	createLogin.prototype={
		myVerify:function(){
			var exform=new verify.vform(this.btn,2);
			exform.vName(this.info,this.name);
			exform.vPasswd(this.icode,this.passwd);
			exform.vbtn(this.btn);
		},
		myPost:function(loginForm,loginInfo){
			//var api="http://204d.cn/youtu/login";
			var url="http://spw.linzhida.cc/user/login";
			//$(".loginForm").attr("action");
			this.name.setAttribute("name","username");//val() 用于获取输入框的内容
			this.passwd.setAttribute("name","password");
			//find操作 获取的是jq对象
			var validateCode=$("."+loginForm).find("input[name='validateCode']").val();
			console.log(validateCode);
			$(this.btn).on('click',function(){
				$("."+loginForm).on('submit',function(event){
					event.preventDefault();
					var posting=$.post(url,$("."+loginForm).serialize());
					posting.done(function(data){
						switch(data.result){
							case 0:
								window.location.href="Main.html";
								break;
							case 1:
								alert("Failed,problem with username or password");
								break;
							case 2:
								alert("Failed of validateCode");
								break;
							default:break;
						}
					});
				});
			});
			
		},//刷新验证码
		myValidateFresh:function(){
			//http://spw.204d.cn/getValidateCode
			var url="http://spw.linzhida.cc/getValidateCode";
			var img=$("#validateImg").on('click',function(){
				//每设置一次url都会发生一次get请求
				this.setAttribute("src",url);
			});
		}

	};


	return {
		createLogin:createLogin
	}
});

/*
Post and get posts module source
Author Jason
Date 2016/9/14
*/
define(['jquery'],function(jquery){

	function createPosts(posts,txtInput,oContent){
		//ar date=new Date();
		var userid;
		this.timer=null;
		this.posts=document.getElementById(posts);//btn
		this.txtInput=document.getElementById(txtInput);
		this.oContent=document.getElementById(oContent);
		this.getUserId=function(){
			//AJAX GET userId from Database
		}
	}
	createPosts.prototype={
		postContent:function(){
			//this.oContent.innerHTML+=
		},
		displayContent:function(self){
			var text=$(self.txtInput);//DOM 转jquery对象
			self.oContent.innerHTML="";//refresh?
			self.oContent.innerHTML+="<div class='content'><p>"+text.val()+"</p></div>";

		},
		confine:function(){//txtarea字符限制

		},
		format:function(str){//格式化时间, 如果为一位数时补0
			return str.toString().replace(/^(\d)$/,"0$1");
		},
		//Ajax get 
		getContent:function(){

		},
		init:function(){
			var posts=$(this.posts);
			var self=this;
			posts.on('click',function(event){self.displayContent(self)});
		}
	}
	return{
		createPosts:createPosts
	}
});

define(['verify','jquery'],function(verify,jquery){
	var createSignUp=function(username,passwd,xpass,mail,info,icode,xcode,dmail){
		this.userID=document.getElementById(username);
		this.passwd=document.getElementById(passwd);
		this.xpass=document.getElementById(xpass);
		this.mail=document.getElementById(mail);
		this.info=document.getElementById(info);
		this.icode=document.getElementById(icode);
		this.xcode=document.getElementById(xcode);
		this.dmail=document.getElementById(dmail);
		this.btn=document.getElementById("verify");//DOM object...
		this.btn.disabled=true;//xx.style?  disable is attribute not css property
	}
	createSignUp.prototype={
		myVerify:function(){
			var exform=new verify.vform(this.btn,4);//4 items to verify
			exform.vName(this.info,this.userID);
			exform.vPasswd(this.icode,this.passwd);
			exform.vPassx(this.xcode,this.passwd,this.xpass);
			exform.vmail(this.dmail,this.mail);
			exform.vbtn(this.btn);
			//console.log("running myVerify");
		},
		signUpPost:function(){
			var url="http://spw.linzhida.cc/user/register";
			var self=this;
			this.userID.setAttribute("name","username");
			this.passwd.setAttribute("name","password");
			this.mail.setAttribute("name",'email');
			//console.log("running signUpPost");

			$("#verify").on('click',function(){
				$("#signUpForm").on('submit',function(event){
					event.preventDefault();
					var posting=$.post(url,$("#signUpForm").serialize());
					posting.done(function(data){
						$("#signupInfo").empty();//like innerHTML="";
						switch(data.result){
							case 0:
							//隐藏表单页面，返回成功信息
								self.cleanAll();	
								var $info=$('<p style="background-color:green;color:white">Success!!!<button class="btn btn-danger">Confirm</button></p>');
								$("#signupInfo").append($info);
								$('#signUpForm').css("display","none");
								$("#signupInfo").find("button").on('click',function(){
									window.location.href="Main.html";//index.html
								});
								break;
							case 1://不隐藏表单页面，
								var $info1=$('<p style="color:red;width:100%">Failed to sign up,please try again,later!</p>');
								$("#signupInfo").append($info1);
								alert("Failed!");break;
							case 2:
								//做一个div提示email重复
								var $info2=$('<p style="color:red">Failed to sign up, email is already used!</p>');
								$("#signupInfo").append($info2);
								break;
							case 3:
								//做一个div在旁边提示username重复
								var $info3=$('<p style="color:red">Failed to sign up, username is already used !</p>');
								$("#signupInfo").append($info3);
								break;
							default:break;
						}
					});
				});
			});
		},
		cleanAll:function(){
			$(this.userID).val("");
			$(this.passwd).val("");
			$(this.xpass).val("");
			$(this.mail).val("");

		}

	}
	return{
		createSignUp:createSignUp
	}
});	
/************
浮出层UI设计
1.浮出层中心默认在屏幕正中
2.当浮出层显示时，屏幕滚动时，浮出层始终保持位置固定在屏幕正中，
不随屏幕滚动而变化位置。或者禁止页面在有浮出层出现时滚动
3.当浮出层显示时，点击浮出层以外的部分，默认为关闭浮出层。可以实现一个半透明的遮罩来挡住浮出层外的部分
浮出层的样式、内容和逻辑尽量解耦
4.提供使用JavaScript控制浮出层展现和关闭的接口
5.浮出层的窗口大小可以是一个默认固定值，也可以是随内容变化而自适应变化，也可以是
通过接口参数进行调整
6.有能力的同学可以实现浮出层的拖拽移动浮出窗口位置以及拖拽边缘来放大缩小浮出窗口的功能
Author:Jason
Date:2016/06/17
Modified:2016/9/4
*******/
//* @param {ctn,mask,pop,login} - ctn关闭按钮 mask蒙版 pop登录模块 login登录按钮

define(['useful'],function(useful){
	//ctn 
	function CreateFloat(ctn,mask,pop,login){
		var mousePanel,mouseCtrl,mouseType;
		this.mask=document.getElementById(mask);
		this.ctn=document.getElementById(ctn);
		this.pop=document.getElementById(pop);
		this.login=document.getElementById(login);
		this.mouseOffsetX=0;
		this.mouseOffsetY=0;
		this.isDraging=false;
		this.moving=0;
		this.mouseStartX=0;
		this.mouseStartY=0;
		this.mouseX=this.mouseY=0;
		this.setPanel=function(newPanel){
			mousePanel=newPanel;
		}
		this.getPanel=function(){
			return mousePanel;
		}
		this.setCtrl=function(newCtrl){
			mouseCtrl=newCtrl;
		}
		this.getCtrl=function(){
			return mouseCtrl;
		}
		this.setType=function(newType){
			mouseType=newType;
		}
		this.getType=function(){
			return mouseType;
		}

	//点击mask 隐藏mask 和 pop
		
		this.initialEvent=function(){//this的作用域
			var self=this;//here  this means this object
			addEvent(this.mask,"click",function(){
				self.mask.style.display="none";
				self.pop.style.display="none";
			});
			addEvent(this.ctn,'click',function(){
				self.mask.style.display="none";
				self.pop.style.display="none";
			});
			addEvent(this.login,"click",function(){
				//here this means this.login this element not the object itself
				if(self.mask.style.display=="none"){
					self.mask.style.display="block";
					self.pop.style.display="block";
				}else{
					self.mask.style.display="none";
					self.pop.style.display="none";
				}
			});
	

		};
		this.mouseEvent=function(){
			//添加按下事件到 pop浮出层
			var self=this;
			addEvent(this.pop,'mousedown',function(e){
				var e=e||window.event;				
				//鼠标点击点离浮出层左边框的距离
				self.mouseOffsetX=e.pageX-this.offsetLeft;
				//鼠标点击点离浮出层右边框的距离
				self.mouseOffsetY=e.pageY-this.offsetTop;
				self.isDraging=true;
				
			});
		};
		
		this.initialEvent();
		this.mouseEvent();
	}


	CreateFloat.prototype={
		//自动居中
		autoCenter:function(ele){
			var ele=document.querySelector(ele)||document.getElementById(ele);
			var bodyW=document.body.clientWidth;
			var bodyH=document.body.clientHeight;

			var elW=ele.offsetWidth;
			var elH=ele.offsetHeight;

			ele.style.left=(bodyW-elW)/2+"px";
			ele.style.top=(bodyH-elH)/2+"px";
		},
		//使元素自动全屏
		fillToBody:function(ele){
			var ele=document.querySelector(ele)||document.getElementById(ele);
			ele.style.width=document.body.clientWidth+"px";
			ele.style.height=document.body.clientHeight+"px";
		},
		mousemoveHandler:function(){
			var self=this;
			addEvent(document,'mousemove',function(e){
				var e=e||window.event;
				self.mouseX=e.pageX;
				self.mouseY=e.pageY;

				var moveX=0;
				var moveY=0;
			//按下鼠标时为true
				if(self.isDraging===true){
					moveX=self.mouseX-self.mouseOffsetX;
					moveY=self.mouseY-self.mouseOffsetY;
					//获取页面的宽高度
					var pageWidth=document.body.clientWidth;
					var pageHeight=document.body.clientHeight;

					//获取浮出层的宽高度
					var loginWidth=self.pop.offsetWidth;
					var loginHeight=self.pop.offsetHeight;

					var maxMoveX=pageWidth-loginWidth;
					var maxMoveY=pageHeight-loginHeight;

					moveX=Math.min(maxMoveX,Math.max(0,moveX));
					moveY=Math.min(maxMoveY,Math.max(0,moveY));
					self.pop.style.left=moveX+"px";
					self.pop.style.top=moveY+"px";
					//console.log("moving");
				}
			});
		},
		mouseupHandler:function(){
			//按键向上时，draging恢复，且消除interval事件即onmove
			var self=this;
			addEvent(document,'mouseup',function(){
				self.isDraging=false;
				clearInterval(self.moving);//清除，停止setInterval对某个函数的定时调用
				self.moving=0;
				var cls=document.getElementsByClassName("resizable-box");
				for(var i=0;i<cls.length;i++){
					cls[i].style.left="";
					cls[i].style.top="";
				}
			});
		},
		//event panel? ctrl? 这个是根据点击
		onMouseDown:function(e,panel,ctrl,type,self){
			var e=e||window.event;
			self.mouseStartX=e.pageX-ctrl.offsetLeft;
			self.mouseStartY=e.pageY-ctrl.offsetTop;
			console.log(self);
			self.setPanel(panel);//十字移动那个
			self.setCtrl(ctrl);
			self.setType(type);
			console.log(self.getType());
			self.moving=setInterval(function(){
				self.onMove(self);
			},10);//隔10ms执行一次onMove
		},
		//制造一个 十字移动的图标，style在移动随着
		onMove:function(self){
			if(self.moving){
				var toX=self.mouseX-self.mouseStartX
				var toY=self.mouseY-self.mouseStartY;
				//限定浮出层的最大宽高度
				var maxToX=document.body.clientWidth-self.getPanel().offsetLeft-10;
				var maxToY=document.body.clientHeight-self.getPanel().offsetTop-10;

				toX=Math.min(maxToX,Math.max(toX,180));
				toY=Math.min(maxToY,Math.max(toY,140));
				self.isDraging=false;
				console.log(self.isDraging);
				switch(self.getType()){
					//仅拉右边的
					case "r":
						self.getCtrl().style.left=toX+"px";// 加长的px数量+原来toX长度
						self.getPanel().style.width = toX + "px";
						break;
					//仅拉下方的
					case "b":
		                self.getCtrl().style.top = toY + "px";
		                self.getPanel().style.height = toY + "px";
		                break;
		             //拉对角的
		            case "rb":
		                //console.log(mouseCtrl.style.left);
		                self.getCtrl().style.left = toX-8 + "px";
		                self.getCtrl().style.top = toY-8 + "px";
		                self.getPanel().style.width = toX + "px";
		                self.getPanel().style.height = toY + "px";
		                break;
				}
			}
		},
		resizable:function(ele){
			var pop=document.querySelector(ele)||document.getElementById(ele);//panel是传入的元素
			//在ele后面创建三个div，它们是resizeable box
			var self=this;//this是随着上下文执行环境改变的
			var rightBox=document.createElement("div");
			var bottomBox = document.createElement("div");
			var rightBottomBox = document.createElement("div");
			rightBox.class=rightBox.className="resizable-right resizable-box";
			bottomBox.class=bottomBox.className="resizable-bottom resizable-box";
			rightBottomBox.class=rightBottomBox.className="resizable-right-bottom resizable-box";

			pop.appendChild(rightBox);
			pop.appendChild(bottomBox);
		    pop.appendChild(rightBottomBox);
		    
			//addEventhere?	
			this.mousemoveHandler();
			this.mouseupHandler();

		    addEvent(rightBox,"mousedown",function(e){
		    	self.onMouseDown(e,pop,rightBox,"r",self);
		    });


		    addEvent(bottomBox,"mousedown",function(e){
		    	self.onMouseDown(e,pop,bottomBox,"b",self);
		    });

		     addEvent(rightBottomBox,"mousedown",function(e){
		    	self.onMouseDown(e,pop,rightBottomBox,"rb",self);
		    });

		}

	
	}


	return{
		CreateFloat:CreateFloat
	}
});



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
});
/************
在页面中添加多个表单
要求:
表单获得焦点时，下方显示表单填写规则
表单失去焦点时校验表单内容

校验结果正确时，表单边框显示绿色，并在下方显示验证通过的描述文字
校验结果错误时，表单边框显示红色，并在下方显示验证错误的描述文字

点击提交按钮时，对页面中所有输入进行校验，校验结果显示方式同上。若所有表单校验通过，弹窗显示“提交成功”，否则显示“提交失败”
校验规则：
1.字符数为4~16位
2.每个英文字母、数字、英文符号长度为1
3.每个汉字，中文符号长度为2
	
Author:Jason
Date:2016/06/06
Modified:2016/09/02
***********/

//实际测试JavaScript默认情况下中文和英文字符都是一个字符长度。 如： "日" 和 "a" 是一个字符长度
//以下函数实现字符长度，中文占两个，英文占1个



define(['useful'],function(useful){
//封装属性,这个构造函数意义不大,为什么封装的用不了？
var vform=function(btn,items){
	this.btn=btn;
	this.check=new Array(false,false,false,false,false);
	this.items=items;
	
};
//原型

vform.prototype={
	constructor:vform, //构造函数
	flag:0,
	vName:function(info,name){
		
		var xnnn=name;//inputEles[0];
		var arg=this.check;

		function handle(arg){
			var text=xnnn.value.trim();
			var reaLen=text.glen();
			arg[0]=false;
			if(reaLen<1||text==""){
				xnnn.style.borderColor="red";
				info.innerHTML="<span style='color:red'>输入不能为空</span>";

					//return;
			}
			else if(reaLen<4||reaLen>16){
				xnnn.style.borderColor="red";
				info.innerHTML="<span style='color:red'>请检查名称的</span>";
			}
			else{
				arg[0]=true;
				xnnn.style.borderColor="green";
				info.innerHTML="<span style='color:green'>名称格式正确</span>";
			}

		}//handle

		addEvent(xnnn,'blur',function(){handle(arg);});
		addEvent(xnnn,'focus',function(){
		info.innerHTML="<span style='color:gray'>必填，长度为4~16字符</span>";
		});
		
	},

	vPasswd:function(icode,code){
		//var code=$("#passwd");
		
		var arg=this.check;

		function handle(arg){
			var text=code.value.trim();
			arg[1]=false;
			if(text.length<1||text===""){
				code.style.borderColor="red";
				icode.innerHTML="<span style='color:red'>输入不能为空</span>";
			}   
			else if(text.match(/^[a-zA-Z0-9]{6,16}$/))
			{
				arg[1]=true;
				code.style.borderColor="green";
				icode.innerHTML="<span style='color:green'>密码格式正确</span>";
				flag=1;
			}
			else{
				code.style.borderColor="red";
				icode.innerHTML="<span style='color:red'>请输入6-16位字符且只能为数字和字母</span>";
			}
		}

		addEvent(code,'blur',function(){handle(arg);});

		addEvent(code,'focus',function(){
		icode.innerHTML="<span style='color:gray'>6~16位数字和字母</span>";
		});
	},
	//fcode -- former(Original) password, xcode--xpassword
	//dcodex --the info div under it
	vPassx:function(dcodex,fcode,xcode){
		// var xcode=inputEles[2];
		// var fcode=inputEles[1];
		var arg=this.check;
		function handle(arg){
			var text=xcode.value.trim();
			var ftext=fcode.value.trim();
			arg[2]=false;
			if(text.length<1||text===""){
				xcode.style.borderColor="red";
				dcodex.innerHTML="<span style='color:red'>输入不能为空</span>";
			}
			else if(text===ftext&&flag===1){//&&flag===1
				arg[2]=true;
				xcode.style.borderColor="green";
				dcodex.innerHTML="<span style='color:green'>密码正确</span>";
			}
			else{
				xcode.style.borderColor="red";
				dcodex.innerHTML="<span style='color:red'>两次输入的密码要相同</span>";
			}

		}

		addEvent(xcode,'blur',function(){handle(arg);});
		addEvent(xcode,'focus',function(){
		dcodex.innerHTML="<span style='color:gray'>重复输入密码</span>";
		});
	},

	vmail:function(dmail,xmail){
		//var xmail=inputEles[3];
		var arg=this.check;

			function handle(arg){
			var str=xmail.value.trim();
			var reg=new RegExp('^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$','i');
			arg[3]=false;
			if(str.length<1||str===""){
				xmail.style.borderColor="red";
				dmail.innerHTML="<span style='color:red'>输入不能为空</span>";
			}
			else if(str.match(reg)){
				arg[3]=true;
				xmail.style.borderColor="green";	
				dmail.innerHTML="<span style='color:green'>邮箱格式正确</span>";
			}
			else{
				xmail.style.borderColor="red";
				dmail.innerHTML="<span style='color:red'>邮箱格式错误</span>";
			}
		}

			addEvent(xmail,'blur',function(){handle(arg);});
			addEvent(xmail,'focus',function(){
			dmail.innerHTML="<span style='color:gray'>exampleh@hah.com</span>";
			});
		
	},

	vphone:function(dphone,xphone){
		//var xphone=inputEles[4];
		var arg=this.check;
			function handle(arg){
			var str=xphone.value.trim();
			arg[4]=false;
			if(str.length<1||str===""){
				xphone.style.borderColor="red";
				dphone.innerHTML="<span style='color:red'>输入不能为空</span>";
			}
			else if(str.match(/0?(13|14|15|18)[0-9]{9}/)){
				arg[4]=true;
				xphone.style.borderColor="green";	
				dphone.innerHTML="<span style='color:green'>电话格式正确</span>";
			}
			else{
				xphone.style.borderColor="red";
				dphone.innerHTML="<span style='color:red'>电话格式错误</span>";
			}
		}

			addEvent(xphone,'blur',function(){handle(arg);});
			addEvent(xphone,'focus',function(){
			dphone.innerHTML="<span style='color:gray'>请输入11位手机号码</span>";
			});
	},

	vbtn:function(xbtn){
		var arg=this.check;
		var count=this.items
		//var xbtn=inputEles[5];
		function handle(arg,count){
			var flagx=1;
			//5  it depends on how much you use
			for(var i=0;i<count;i++){
				if(arg[i]===false)
				{
					flagx=0;
					break;
				}
			}
			if(flagx)
			{
				//alert("格式正确,提交成功！");
				xbtn.disabled=false;
			}
			else
			{
				
				//alert("提交失败，请重新输入");
				xbtn.disabled=true;
			}
		}
		//addEvent(xbtn,'mouseover',function(){handle(arg);});
		setInterval(function(){
			handle(arg,count);
		},1000);
	}

	};//prototype
	return{
		vform:vform
	}
});


//var fuck=exform.check;
//alert(fuck[0]);
//fuck[0]=true;
//alert(exform.check[0]);
/*
My Waterfall  module source
Author Jason
Date 2016/9/12
*/

//Waterfull layout 瀑布流布局
define(['jquery'],function(jquery){
//纯Js实现
	waterfall=function(parent,box){
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
//waterfall JQ ver
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
	{
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
		var oBoxs=getByClass(oParent,box);
		var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
		//混杂模式 标准模式！
		var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
		var height=document.documentElement.clientHeight||document.body.clientHeight;
		return (lastBoxH<scrollTop+height);
	}
	getPhoto=function(parent){
		//return json dataInt={"data":[{"src":"0.jpg"},{"src","1.jpg"},....]};
		var urlBase="http://119.29.165.186/balight/file/photos/";
		var oParent=document.getElementById(parent);
		oParent.innerHTML="<div class='box'><div class='pic'><img src='"+urlBase+"0.jpg'></div></div>";
		for (var i = 1; i <97; i++) {
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src=urlBase+i+".jpg";
				oPic.appendChild(oImg);
		}
		var count=23;
/*		window.onscroll=function(){
			if(checkScrollSlide&&count<93){
				//var oParent=document.getElementById(parent);
				//let data reder behind将数据块加载到页面尾部
				//93 length of data
				count++;
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src=urlBase+count+".jpg";
				oPic.appendChild(oImg);
				
			}
		}
*/
	}
});
/** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.2.0 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/requirejs/LICENSE
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */

var requirejs, require, define;
(function (global) {
    var req, s, head, baseElement, dataMain, src,
        interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = '2.2.0',
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        isBrowser = !!(typeof window !== 'undefined' && typeof navigator !== 'undefined' && window.document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
        //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
                      /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',
        //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    //Could match something like ')//comment', do not lose the prefix to comment.
    function commentReplace(match, multi, multiText, singlePrefix) {
        return singlePrefix || '';
    }

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value === 'object' && value &&
                        !isArray(value) && !isFunction(value) &&
                        !(value instanceof RegExp)) {

                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    function defaultOnError(err) {
        throw err;
    }

    //Allow getting a global that is expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite an existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof require !== 'undefined' && !isFunction(require)) {
        //assume it is a config object.
        cfg = require;
        require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers,
            checkLoadedTimeoutId,
            config = {
                //Defaults. Do not set a default for map
                //config to speed up normalize(), which
                //will run faster if there is no default.
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            registry = {},
            //registry of just enabled modules, to speed
            //cycle breaking code when lots of modules
            //are registered, but not activated.
            enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            defined = {},
            urlFetched = {},
            bundlesMap = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; i < ary.length; i++) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && ary[2] === '..') || ary[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgMain, mapValue, nameParts, i, j, nameSegment, lastIndex,
                foundMap, foundI, foundStarMap, starI, normalizedBaseParts,
                baseParts = (baseName && baseName.split('/')),
                map = config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // If wanting node ID compatibility, strip .js from end
                // of IDs. Have to do this here, and not in nameToUrl
                // because node allows either .js or non .js to map
                // to same file.
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                // Starts with a '.' so need the baseName
                if (name[0].charAt(0) === '.' && baseParts) {
                    //Convert baseName to array, and lop off the last part,
                    //so that . matches that 'directory' and not name of the baseName's
                    //module. For instance, baseName of 'one/two/three', maps to
                    //'one/two/three.js', but we want the directory, 'one/two' for
                    //this normalization.
                    normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    name = normalizedBaseParts.concat(name);
                }

                trimDots(name);
                name = name.join('/');
            }

            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split('/');

                outerLoop: for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break outerLoop;
                                }
                            }
                        }
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            // If the name points to a package's name, use
            // the package main instead.
            pkgMain = getOwn(config.pkgs, name);

            return pkgMain ? pkgMain : name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name &&
                            scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);

                //Custom require that does not do map translation, since
                //ID is "absolute", already mapped/resolved.
                context.makeRequire(null, {
                    skipMap: true
                })([id]);

                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        // If nested plugin references, then do not try to
                        // normalize, as it will not normalize correctly. This
                        // places a restriction on resourceIds, and the longer
                        // term solution is not to normalize until plugins are
                        // loaded and all normalizations to allow for async
                        // loading of a loader plugin. But for now, fixes the
                        // common uses. Details in #1131
                        normalizedName = name.indexOf('!') === -1 ?
                                         normalize(name, parentName, applyMap) :
                                         name;
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ?
                     '_unnormalized' + (unnormalizedCounter += 1) :
                     '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ?
                        prefix + '!' + normalizedName :
                        normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(defined, id) &&
                    (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(defined[id]);
                }
            } else {
                mod = getModule(depMap);
                if (mod.error && name === 'error') {
                    fn(mod.error);
                } else {
                    mod.on(name, fn);
                }
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                each(globalDefQueue, function(queueItem) {
                    var id = queueItem[0];
                    if (typeof id === 'string') {
                        context.defQueueMap[id] = true;
                    }
                    defQueue.push(queueItem);
                });
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function (mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return (mod.require = context.makeRequire(mod.map));
                }
            },
            'exports': function (mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return (defined[mod.map.id] = mod.exports);
                    } else {
                        return (mod.exports = defined[mod.map.id] = {});
                    }
                }
            },
            'module': function (mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return (mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function () {
                            return getOwn(config.config, mod.map.id) || {};
                        },
                        exports: mod.exports || (mod.exports = {})
                    });
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var err, usingPathFallback,
                waitInterval = config.waitSeconds * 1000,
                //It is possible to disable the wait interval by using waitSeconds of 0.
                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function (mod) {
                var map = mod.map,
                    modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return (needCycleCheck = false);
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function (i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function () {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = (new Date()).getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function () {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err, cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    // Only fetch if not already in the defQueue.
                    if (!hasProp(context.defQueueMap, id)) {
                        this.fetch();
                    }
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error. However,
                            //only do it for define()'d  modules. require
                            //errbacks should not be called for failures in
                            //their callbacks (#699). However if a global
                            //onError is set, use that.
                            if ((this.events.error && this.map.isDefine) ||
                                req.onError !== defaultOnError) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            // Favor return value over exports. If node/cjs in play,
                            // then will not have a return value anyway. Favor
                            // module.exports assignment over exports object.
                            if (this.map.isDefine && exports === undefined) {
                                cjsModule = this.module;
                                if (cjsModule) {
                                    exports = cjsModule.exports;
                                } else if (this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = this.map.isDefine ? [this.map.id] : null;
                                err.requireType = this.map.isDefine ? 'define' : 'require';
                                return onError((this.error = err));
                            }

                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;

                            if (req.onResourceLoad) {
                                var resLoadMaps = [];
                                each(this.depMaps, function (depMap) {
                                    resLoadMaps.push(depMap.normalizedMap || depMap);
                                });
                                req.onResourceLoad(context, this.map, resLoadMaps);
                            }
                        }

                        //Clean up
                        cleanRegistry(id);

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }

                }
            },

            callPlugin: function () {
                var map = this.map,
                    id = map.id,
                    //Map already normalized the prefix.
                    pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod,
                        bundleId = getOwn(bundlesMap, this.map.id),
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                            enableBuildCallback: true
                        });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name,
                                                      this.map.parentMap);
                        on(normalizedMap,
                            'defined', bind(this, function (value) {
                                this.map.normalizedMap = normalizedMap;
                                this.init([], function () { return value; }, null, {
                                    enabled: true,
                                    ignore: true
                                });
                            }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    //If a paths config, then just load that file instead to
                    //resolve the plugin, as it is built into that paths layer.
                    if (bundleId) {
                        this.map.url = context.nameToUrl(bundleId);
                        this.load();
                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () { return value; }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError('fromtexteval',
                                             'fromText eval for ' + id +
                                            ' failed: ' + e,
                                             e,
                                             [id]));
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function () {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap,
                                               (this.map.isDefine ? this.map : this.map.parentMap),
                                               false,
                                               !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            if (this.undefed) {
                                return;
                            }
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', bind(this, this.errback));
                        } else if (this.events.error) {
                            // No direct errback on this module, but something
                            // else is listening for errors, so be sure to
                            // propagate the error correctly.
                            on(depMap, 'error', bind(this, function(err) {
                                this.emit('error', err);
                            }));
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function (name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function (name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' +
                        args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
            context.defQueueMap = {};
        }

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            defQueueMap: {},
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                // Convert old style urlArgs string to a function.
                if (typeof cfg.urlArgs === 'string') {
                    var urlArgs = cfg.urlArgs;
                    cfg.urlArgs = function(id, url) {
                        return (url.indexOf('?') === -1 ? '?' : '&') + urlArgs;
                    };
                }

                //Save off the paths since they require special processing,
                //they are additive.
                var shim = config.shim,
                    objs = {
                        paths: true,
                        bundles: true,
                        config: true,
                        map: true
                    };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (!config[prop]) {
                            config[prop] = {};
                        }
                        mixin(config[prop], value, true, true);
                    } else {
                        config[prop] = value;
                    }
                });

                //Reverse map the bundles
                if (cfg.bundles) {
                    eachProp(cfg.bundles, function (value, prop) {
                        each(value, function (v) {
                            if (v !== prop) {
                                bundlesMap[v] = prop;
                            }
                        });
                    });
                }

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location, name;

                        pkgObj = typeof pkgObj === 'string' ? {name: pkgObj} : pkgObj;

                        name = pkgObj.name;
                        location = pkgObj.location;
                        if (location) {
                            config.paths[name] = pkgObj.location;
                        }

                        //Save pointer to main module ID for pkg name.
                        //Remove leading dot in main, so main paths are normalized,
                        //and remove any trailing .js, since different package
                        //envs have different conventions: some use a module name,
                        //some use a file name.
                        config.pkgs[name] = pkgObj.name + '/' + (pkgObj.main || 'main')
                                     .replace(currDirRegExp, '')
                                     .replace(jsSuffixRegExp, '');
                    });
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id, null, true);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function (value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || (value.exports && getGlobal(value.exports));
                }
                return fn;
            },

            makeRequire: function (relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' +
                                        id +
                                        '" has not been loaded yet for context: ' +
                                        contextName +
                                        (relMap ? '' : '. Use require([])')));
                        }
                        return defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function (moduleNamePlusExt) {
                        var ext,
                            index = moduleNamePlusExt.lastIndexOf('.'),
                            segment = moduleNamePlusExt.split('/')[0],
                            isRelative = segment === '.' || segment === '..';

                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt,
                                                relMap && relMap.id, true), ext,  true);
                    },

                    defined: function (id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function (id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        mod.undefed = true;
                        removeScript(id);

                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        //Clean queued defines too. Go backwards
                        //in array so that the splices do not
                        //mess up the iteration.
                        eachReverse(defQueue, function(args, i) {
                            if (args[0] === id) {
                                defQueue.splice(i, 1);
                            }
                        });
                        delete context.defQueueMap[id];

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overridden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function (depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName) {
                var found, args, mod,
                    shim = getOwn(config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }
                context.defQueueMap = {};

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine',
                                             'No define call for ' + moduleName,
                                             null,
                                             [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName, ext, skipExt) {
                var paths, syms, i, parentModule, url,
                    parentPath, bundleId,
                    pkgMain = getOwn(config.pkgs, moduleName);

                if (pkgMain) {
                    moduleName = pkgMain;
                }

                bundleId = getOwn(bundlesMap, moduleName);

                if (bundleId) {
                    return context.nameToUrl(bundleId, ext, skipExt);
                }

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = config.paths;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');

                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += (ext || (/^data\:|^blob\:|\?/.test(url) || skipExt ? '' : '.js'));
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                }

                return config.urlArgs && !/^blob\:/.test(url) ?
                       url + config.urlArgs(moduleName, url) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callback function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' ||
                        (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function (evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    var parents = [];
                    eachProp(registry, function(value, key) {
                        if (key.indexOf('_@r') !== 0) {
                            each(value.depMaps, function(depMap) {
                                if (depMap.id === data.id) {
                                    parents.push(key);
                                    return true;
                                }
                            });
                        }
                    });
                    return onError(makeError('scripterror', 'Script error for "' + data.id +
                                             (parents.length ?
                                             '", needed by: ' + parents.join(', ') :
                                             '"'), evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) { fn(); };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!require) {
        require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each([
        'toUrl',
        'undef',
        'defined',
        'specified'
    ], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = defaultOnError;

    /**
     * Creates the node for the load command. Only used in browser envs.
     */
    req.createNode = function (config, moduleName, url) {
        var node = config.xhtml ?
                document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                document.createElement('script');
        node.type = config.scriptType || 'text/javascript';
        node.charset = 'utf-8';
        node.async = true;
        return node;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = req.createNode(config, moduleName, url);

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
                    //Check if node.attachEvent is artificially added by custom script or
                    //natively supported by browser
                    //read https://github.com/requirejs/requirejs/issues/187
                    //if we can NOT find [native code] then it must NOT natively supported.
                    //in IE8, node.attachEvent does not have toString()
                    //Note the test for "[native code" with no closing brace, see:
                    //https://github.com/requirejs/requirejs/issues/273
                    !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                    !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEventListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //Calling onNodeCreated after all properties on the node have been
            //set, but before it is placed in the DOM.
            if (config.onNodeCreated) {
                config.onNodeCreated(node, config, moduleName, url);
            }

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation is that a build has been done so
                //that only one script needs to be loaded anyway. This may need
                //to be reevaluated if other use cases become common.

                // Post a task to the event loop to work around a bug in WebKit
                // where the worker gets garbage-collected after calling
                // importScripts(): https://webkit.org/b/153317
                setTimeout(function() {}, 0);
                importScripts(url);

                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError('importscripts',
                                'importScripts failed for ' +
                                    moduleName + ' at ' + url,
                                e,
                                [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser && !cfg.skipDataMain) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Preserve dataMain in case it is a path (i.e. contains '?')
                mainScript = dataMain;

                //Set final baseUrl if there is not already an explicit one,
                //but only do so if the data-main value is not a loader plugin
                //module ID.
                if (!cfg.baseUrl && mainScript.indexOf('!') === -1) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = mainScript.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/')  + '/' : './';

                    cfg.baseUrl = subPath;
                }

                //Strip off any trailing .js since mainScript is now
                //like a module name.
                mainScript = mainScript.replace(jsSuffixRegExp, '');

                //If mainScript is still a path, fall back to dataMain
                if (req.jsExtRegExp.test(mainScript)) {
                    mainScript = dataMain;
                }

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function (name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = null;
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps && isFunction(callback)) {
            deps = [];
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, commentReplace)
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        if (context) {
            context.defQueue.push([name, deps, callback]);
            context.defQueueMap[name] = true;
        } else {
            globalDefQueue.push([name, deps, callback]);
        }
    };

    define.amd = {
        jQuery: true
    };

    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
}(this));
