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