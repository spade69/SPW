
/*
My Login  module source
Author Jason
Date 2016/9/12
*/

define(['verify','jquery'],function(verify,jquery){
	//jquery and querySelector conflict!!
	//写成function(){..}之类的不行，必须是var xxx=function.
	//具体看看requirejs源码
	var createLogin=function(btnSignIn,username,passwd,info,icode){
		this.btn=document.getElementById(btnSignIn);
		this.name=document.getElementById(username);
		this.passwd=document.getElementById(passwd);
		this.info=document.getElementById(info);
		this.icode=document.getElementById(icode);
		this.btn.disabled=true;//禁用
	}
	createLogin.prototype={
		myVerify:function(){
			var exform=new verify.vform(this.btn,2);
			exform.vName(this.info,this.name);
			exform.vPasswd(this.icode,this.passwd);
			exform.vbtn(this.btn);
		},
		myPost:function(loginForm,loginInfo){
			//var api="http://204d.cn/youtu/login";
			var url="http://spw.linzhida.cc/user/login";
			//$(".loginForm").attr("action");
			this.name.setAttribute("name","username");//val() 用于获取输入框的内容
			this.passwd.setAttribute("name","password");
			//find操作 获取的是jq对象
			var validateCode=$("."+loginForm).find("input[name='validateCode']").val();
			console.log(validateCode);
			$(this.btn).on('click',function(){
				$("."+loginForm).on('submit',function(event){
					event.preventDefault();
					var posting=$.post(url,$("."+loginForm).serialize());
					posting.done(function(data){
						switch(data.result){
							case 0:
								window.location.href="Main.html";
								break;
							case 1:
								alert("Failed,problem with username or password");
								break;
							case 2:
								alert("Failed of validateCode");
								break;
							default:break;
						}
					});
				});
			});
			
		},//刷新验证码
		myValidateFresh:function(){
			//http://spw.204d.cn/getValidateCode
			var url="http://spw.linzhida.cc/getValidateCode";
			var img=$("#validateImg").on('click',function(){
				//每设置一次url都会发生一次get请求
				this.setAttribute("src",url);
			});
		}

	};


	return {
		createLogin:createLogin
	}
});