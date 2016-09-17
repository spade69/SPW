
/*
My Login  module source
Author Jason
Date 2016/9/12
*/

define(['verify'],function(verify){
	//jquery and querySelector conflict!!
	//写成function(){..}之类的不行，必须是var xxx=function.
	//具体看看requirejs源码
	var createLogin=function(btnSignIn,username,passwd){
		this.btn=document.getElementById(btnSignIn);
		this.name=document.getElementById(username);
		this.passwd=document.getElementById(passwd);

	}
	createLogin.prototype={
		myVerify:function(){
			var exform=new verify.vform(this.btn);
			exform.vName(this.info,this.name);
			exform.vPasswd(this.icode,this.passwd);
		},
		myPost:function(){
			//var api="http://204d.cn/youtu/login";
			var url=$(".loginForm").attr("action");
			var userID=this.name.val();//val() 用于获取输入框的内容
			var userCode=this.passwd.val();
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

	var createSignUp=function(username,passwd,xpass,mail,info,icode,xcode,dmail){
		this.userID=document.getElementById(username);
		this.passwd=document.getElementById(passwd);
		this.xpass=document.getElementById(xpass);
		this.mail=document.getElementById(mail);
		this.info=document.getElementById(info);
		this.icode=document.getElementById(icode);
		this.xcode=document.getElementById(xcode);
		this.dmail=document.getElementById(dmail);
	}
	createSignUp.prototype={
		myVerify:function(){
			var exform=new verify.vform(this.btn);
			exform.vName(this.info,this.userID);
			exform.vPasswd(this.icode,this.passwd);
			exform.vPassx(this.xcode,this.passwd,this.xpass);
			exform.vmail(this.dmail,this.mail);
			console.log("running myVerify");
		}
	}

	return {
		createLogin:createLogin,
		createSignUp:createSignUp
	}
});