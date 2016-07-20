

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
		"height":"150px"

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

$(function(){
	var $ali = $('#tab>li>a');
	var $li = $('#tab>li');
	var $ul = $('#tab');
	var $left=$('#left');

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

	createSideBar($left);
	dragMove($left);


/*weather api*/
// JSON.parse(jsondata,function(k,v){
// 			console.log(k);
// 			//return v;
// 		});
	var api="http://api.openweathermap.org/data/2.5/weather?q=";
	var appid="&APPID=4c16d64121b3d1c838c58a8c8b100a15";
	var city="Shenzhen";
	var cb="&jsoncallback=JSON_CALLBACK";
	$.getJSON(api+city+appid+cb,function(data){
		alert("ufck");
		var html='<ul>';
		//data已经被转为jq的对象
		 $.each(data,function(k,v){
		 	console.log(k);
		});
		html+='</ul>';
		
		$("#weather").html(html);
		
	});


});
