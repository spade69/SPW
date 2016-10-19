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
