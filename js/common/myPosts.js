
/*
Post and get posts module source
Author Jason
Date 2016/9/14
*/
define(['jquery','useful'],function(jquery,useful){

	function createPosts(posts,txtInput,oContent){
		//ar date=new Date();
		var userId=[];
		var articleId=[];
		this.timer=null;
		this.posts=document.getElementById(posts);//btn
		this.txtInput=document.getElementById(txtInput);
		this.oContent=document.getElementById(oContent);
		this.getUserId=function(index){
			//AJAX GET userId from Database
			if(index<=this.userId.length-1)
				return this.userId[index];
		}
		this.setUserId=function(userId){
			var len=this.userId.length;
			this.userId[len]=userId;
		}
		this.getArticleId=function(index){
			if(index<=this.articleId.length-1)
				return this.articleId[index];
		}
		this.setArticleId=function(articleId){
			var len=this.articleId.length;
			this.articleId[len]=articleId;
		}
	}
	createPosts.prototype={
		postContent:function(url,urlGet){
			var posts=$(this.posts);
			var self=this;
			posts.on('click',function(event){
				var ranTitle=randomString(10);//random set
				var ranUuid=Math.floor(Math.random()*99999999);
				var postObj={title:ranTitle,userUuid:ranUuid,texts:self.txtInput.value}
				var posting=$.post(url,postObj);
				posting.done(function(data){
					switch(data.result){
						case 0:
						var artiId=data.articleUuid;
						self.setArticleId(artiId);
						break;
						case 1:alert("Fail to post");break;
						default:break;
					}
				});
				posting.always(function(){
					self.getContent(urlGet);
				})
			})
			
		},
		getAllId:function(url){

		},
		displayContent:function(self,txt){
			var text=$(self.txtInput);//DOM 转jquery对象
			//self.oContent.innerHTML="";//refresh?
			self.oContent.innerHTML+="<div class='release'><p>"+txt+"</p></div>";

		},
		confine:function(){//txtarea字符限制

		},
		format:function(str){//格式化时间, 如果为一位数时补0
			return str.toString().replace(/^(\d)$/,"0$1");
		},
		//Ajax get latest content
		getContent:function(url){
			var index=this.articleId.length-1;
			var id=this.getArticleId(index);
			var self=this;
			url=url+id;
			$.get(url,function(data){
				self.displayContent(self,data.article.texts);
				console.log(data.article);
			});
		},
		delContent:function(urlBase){

		}
		test:function(){
			var posts=$(this.posts);
			var self=this;
			//posts.on('click',function(event){self.displayContent(self)});
		}
	}
	return{
		createPosts:createPosts
	}
});
