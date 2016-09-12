
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
			var api="http://204d.cn/youtu/login";
			var userID=
			var userCode=
			$.getJSON()
		}
	}
	return {
		createLogin:createLogin
	}
});