define(['verify','jquery'],function(verify,jquery){
	var createSignUp=function(username,passwd,xpass,mail,info,icode,xcode,dmail){
		this.userID=document.getElementById(username);
		this.passwd=document.getElementById(passwd);
		this.xpass=document.getElementById(xpass);
		this.mail=document.getElementById(mail);
		this.info=document.getElementById(info);
		this.icode=document.getElementById(icode);
		this.xcode=document.getElementById(xcode);
		this.dmail=document.getElementById(dmail);
		this.btn=document.getElementById("verify");//DOM object...
		this.btn.disabled=true;//xx.style?  disable is attribute not css property
	}
	createSignUp.prototype={
		myVerify:function(){
			var exform=new verify.vform(this.btn,4);//4 items to verify
			exform.vName(this.info,this.userID);
			exform.vPasswd(this.icode,this.passwd);
			exform.vPassx(this.xcode,this.passwd,this.xpass);
			exform.vmail(this.dmail,this.mail);
			exform.vbtn(this.btn);
			//console.log("running myVerify");
		},
		signUpPost:function(){
			var url="http://spw.linzhida.cc/user/register";
			var self=this;
			this.userID.setAttribute("name","username");
			this.passwd.setAttribute("name","password");
			this.mail.setAttribute("name",'email');
			//console.log("running signUpPost");

			$("#verify").on('click',function(){
				$("#signUpForm").on('submit',function(event){
					event.preventDefault();
					var posting=$.post(url,$("#signUpForm").serialize());
					posting.done(function(data){
						switch(data.result){
							case 0:
							//隐藏表单页面，返回成功信息
								self.cleanAll();	
								var $info=$('<p style="background-color:green;color:white">Success!!!<button class="btn btn-danger">Confirm</button></p>');
								$("#signupInfo").append($info);
								$('#signUpForm').css("display","none");
								break;
							case 1://不隐藏表单页面，
								var $info1=$('<p style="color:red">Failed to sign up,please try again,later!</p>');
								$("#signupInfo").append($info1);
								alert("Failed!");break;
							case 2:
								//做一个div提示email重复
								var $info2=$('<p style="color:red">Failed to sign up, email is already used!</p>');
								$("#signupInfo").append($info2);
								break;
							case 3:
								//做一个div在旁边提示username重复
								var $info3=$('<p style="color:red">Failed to sign up, username is already used !</p>');
								$("#signupInfo").append($info3);
								break;
							default:break;
						}
					});
				});
			});
		},
		cleanAll:function(){
			$(this.userID).val("");
			$(this.passwd).val("");
			$(this.xpass).val("");
			$(this.mail).val("");

		}
	}
	return{
		createSignUp:createSignUp
	}
});	