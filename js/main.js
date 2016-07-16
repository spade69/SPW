

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
}

//实现元素的拖拉
function dragMove(ele){
	var move=false;//标记移动
	ele.mousedown(function(e){
		move=true;
		//e.pageX  e.pageY 当前鼠标的横纵坐标
		//_x 是鼠标离最左边的距离减去div离最左边的距离，即鼠标相对于div左边边距的距离(margin)
		_x=e.pageX-parseInt(ele.css("left"));//left是离上级的距离，pageX是离文档的
		_y=e.pageY-parseInt(ele.css("top"));
	});
	//
	$(document).mousemove(function(e){
		if(move){
			var x=e.pageX-_x;//控件左上角到屏幕左上角的相对位置
			var y=e.pageY-_y;
			ele.css({"top":y,"left":x});
		}
	});
	$(document).mouseup(function(){
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
})