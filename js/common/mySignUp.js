define(['verify'],function(verify){
	function createSignUp(username,passwd,xpass,mail,info,icode,xcode,dmail){
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
			exform.vName(this.info,this.name);
			exform.vPasswd(this.icode,this.passwd);
			console.log("running verify");
		}
	}

	return{
		createSignUp:createSignUp
	}
});	