//实现元素的拖拉
//所有的鼠标事件：检测浏览器是否支持所有DOM2级以上的事件

define(['jquery','featureDectect'],function(jquery,featureDectect){
	return function(ele){
	if(!featureDectect.isSupported('MouseEvent','3.0')){
		alert("您的浏览器不支持拖拽！请使用Chrome");
		return;
	}
	//dragMove(ele){
	var move=false;//标记移动
	ele.mousedown(function(event){
		var event=event||window.event;
		move=true;
		//event.pageX  event.pageY 当前鼠标的横纵坐标
		//_x 是鼠标离最左边的距离减去div离最左边的距离，即鼠标相对于div左边边距的距离(margin)
		 _x=event.pageX-parseInt(ele.css("left"));//left  左外边距边界与其包含块左边界之间的偏移。
		 _y=event.pageY-parseInt(ele.css("top"));//因为想直接转“12px”这样的数 为 12

		// _x=event.pageX-ele.offset().left;
		// _y=event.pageY-ele.offset().top;
	});
	//$('body')
	ele.mousemove(function(event){
		var event=event||window.event;
		if(move){
			//console.log(event.pageX,event.pageY);
			var x=event.pageX-_x;//控件左上角到屏幕左上角的相对位置
			var y=event.pageY-_y;
			if(x<-100)
				x=-100;
			if(y<-100)
				y=-100;
			if(x>700)
				x=700;
			//bottom，最下方的值不好设置，因为文档会随着内容拉长，不能设为定值
			//ele.css({"top":y,"left":x});
			ele[0].style.top=y+"px";
			ele[0].style.left=x+"px";
		}
	});
	ele.mouseup(function(){
		//var event=event||window.event;
		move=false;
	});
	}
});