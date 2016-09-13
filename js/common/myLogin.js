
/*
My Login  module source
Author Jason
Date 2016/9/12
*/

define(['verify'],function(verify){
	//jquery and querySelector conflict!!
	function createLogin(){
		this.btn=document.getElementById("btnSignIn");
		this.name=document.getElementById("username");
		this.passwd=document.getElementById("passwd");
		this.info=document.getElementById("info");
		this.icode=document.getElementById("icode");

	}
	createLogin.prototype={
		myVerify:function(){
			var exform=new verify.vform(this.btn);
			exform.vName(this.info,this.name);
			exform.vPasswd(this.icode,this.passwd);
			console.log("running verify");
		},
		myPost:function(){
			//var api="http://204d.cn/youtu/login";
			var url=$(".loginForm").attr("action");
			var userID=$("#username").val();//val() 用于获取输入框的内容
			var userCode=$("#passwd").val();
			//find操作
			var validateCode=$(".loginForm").find("input[name='validateCode']").val();
			console.log(validateCode);
			var posting=$.post(url,function(){
				console.log("success");
			});
			posting.done(function(data){
				console.log(data);
			});
		},//刷新验证码
		myValidateFresh:function(){
			var url="http://204d.cn/youtu/getValidateCode";
			var img=$("#validateImg").on('click',function(){
				/*$.ajax({
					type:"GET",
					url:"http://204d.cn/youtu/getValidateCode",
					dataType:"jsonp",

				})*/
				this.attr("src",url);
			});
		}

	}
	return {
		createLogin:createLogin
	}
});