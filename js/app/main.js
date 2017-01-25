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
var urlBase="http://spw.linzhida.cc";
var urlPost=urlBase+"/article";
var urlGet=urlBase+"/article/";

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
	var fill=$('.fill');
	myEle.on('click','li a',function(event){
		$("#tabContent").children().addClass("hidden");
		var tmp=myEle.find("li a");
		for(var i=0;i<tmp.length;i++){
			if(event.target===tmp[i]){
				$("#tabContent").children().eq(i).removeClass("hidden");
				switch(i)
				{//Graph
					case 4:					
						var count=1,pre=calInitial(185);	
						init('gallery');
						for( var i=0;i<pre;i++){
							getPhoto('gallery',count);
							waterfall('gallery','box');
							//65 ? experience?
							fill.css('height',65*(count+1)+'px');
							count++;
						}
						window.onscroll=function(){
							if(checkScrollSlide('gallery','box')&&count<97){
								//var oParent=document.getElementById(parent);
								//let data reder behind将数据块加载到页面尾部
								getPhoto('gallery',count);
								waterfall('gallery','box');
								fill.css('height',60*(count+1)+'px');
								count++;
							}
				
						}
						break;
			
					case 3:
						var mySign=new mySignUp.createSignUp('username','passwd','xpasswd','mail',
							'info','icode','dcodex','dmail');
						mySign.myVerify();
						mySign.signUpPost();
						break;
					
					case 2://Leave Note
						fill.css('height','1024px');
						var myLog=new myLogin.createLogin('btnSignIn','userid','codeid','loginInfo','loginPwd');
						var myPo=new myPosts.createPosts('posts','txtInput','oContent');
						myLog.myValidateFresh();
						myLog.myVerify();
						myLog.myPost('loginForm','loginInfo');

						//myPo.init();
						myPo.postContent(urlPost,urlGet);
						
						break;
					case 1:
						window.location.href="blog/tech.html";
						break;
					default:
					break;
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

