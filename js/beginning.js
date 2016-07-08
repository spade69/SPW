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

var x = 100;//矩形开始坐标
var y = 100;//矩形结束坐标
var mx = 0;//0右1左
var my = 0; //0下1上
var ml = 1;//每次移动长度
var w = 20;//矩形宽度
var h = 20;//矩形高度
var cw = 500;//canvas宽度
var ch = 400; //canvas高度

function move(context){
	context.clearRect(0,0,500,400);
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

function open_index(){
 //openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
 window.open('Main.html');
}

$(function(){
	$("#btn").on('click',open_index);
});
window.onload=function(){
	draw("myCanvas");

}
