

function createSideBar(ele){
	//创建几个选项tap并用bootstrap附上样式
	var $personal=$('<div class="thumbnail"><img src="../images/headPhoto.png" class="img-circle"></div>');
	var $tap=$('<a href="#" class="list-group-item active"><span class="glyphicon glyphicon-tag"></span>Content</a>');
	//var $tap1=
	ele.append($personal);
	ele.append($tap);
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
})