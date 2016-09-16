
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
		format:function(str){//日期格式化

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
