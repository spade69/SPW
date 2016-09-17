/************
在页面中添加多个表单
要求:
表单获得焦点时，下方显示表单填写规则
表单失去焦点时校验表单内容

校验结果正确时，表单边框显示绿色，并在下方显示验证通过的描述文字
校验结果错误时，表单边框显示红色，并在下方显示验证错误的描述文字

点击提交按钮时，对页面中所有输入进行校验，校验结果显示方式同上。若所有表单校验通过，弹窗显示“提交成功”，否则显示“提交失败”
校验规则：
1.字符数为4~16位
2.每个英文字母、数字、英文符号长度为1
3.每个汉字，中文符号长度为2
	
Author:Jason
Date:2016/06/06
Modified:2016/09/02
***********/

//实际测试JavaScript默认情况下中文和英文字符都是一个字符长度。 如： "日" 和 "a" 是一个字符长度
//以下函数实现字符长度，中文占两个，英文占1个



define(['useful'],function(useful){
//封装属性,这个构造函数意义不大,为什么封装的用不了？
var vform=function(btn){
	this.btn=btn;
	this.check=new Array(false,false,false,false,false);
	
};
//原型

vform.prototype={
	constructor:vform, //构造函数
	flag:0,
	vName:function(info,name){
		
		var xnnn=name;//inputEles[0];
		var arg=this.check;

		function handle(arg){
			var text=xnnn.value.trim();
			var reaLen=text.glen();
			arg[0]=false;
			if(reaLen<1||text==""){
				xnnn.style.borderColor="red";
				info.innerHTML="<span style='color:red'>输入不能为空</span>";

					//return;
			}
			else if(reaLen<4||reaLen>16){
				xnnn.style.borderColor="red";
				info.innerHTML="<span style='color:red'>请检查名称的</span>";
			}
			else{
				arg[0]=true;
				xnnn.style.borderColor="green";
				info.innerHTML="<span style='color:green'>名称格式正确</span>";
			}

		}//handle

		addEvent(xnnn,'blur',function(){handle(arg);});
		addEvent(xnnn,'focus',function(){
		info.innerHTML="<span style='color:gray'>必填，长度为4~16字符</span>";
		});
		
	},

	vPasswd:function(icode,code){
		//var code=$("#passwd");
		
		var arg=this.check;

		function handle(arg){
			var text=code.value.trim();
			arg[1]=false;
			if(text.length<1||text===""){
				code.style.borderColor="red";
				icode.innerHTML="<span style='color:red'>输入不能为空</span>";
			}   
			else if(text.match(/^[a-zA-Z0-9]{6,16}$/))
			{
				arg[1]=true;
				code.style.borderColor="green";
				icode.innerHTML="<span style='color:green'>密码格式正确</span>";
				flag=1;
			}
			else{
				code.style.borderColor="red";
				icode.innerHTML="<span style='color:red'>请输入6-16位字符且只能为数字和字母</span>";
			}
		}

		addEvent(code,'blur',function(){handle(arg);});

		addEvent(code,'focus',function(){
		icode.innerHTML="<span style='color:gray'>6~16位数字和字母</span>";
		});
	},
	//fcode -- former(Original) password, xcode--xpassword
	//dcodex --the info div under it
	vPassx:function(dcodex,fcode,xcode){
		// var xcode=inputEles[2];
		// var fcode=inputEles[1];
		var arg=this.check;
		function handle(arg){
			var text=xcode.value.trim();
			var ftext=fcode.value.trim();
			arg[2]=false;
			if(text.length<1||text===""){
				xcode.style.borderColor="red";
				dcodex.innerHTML="<span style='color:red'>输入不能为空</span>";
			}
			else if(text===ftext&&flag===1){//&&flag===1
				arg[2]=true;
				xcode.style.borderColor="green";
				dcodex.innerHTML="<span style='color:green'>密码正确</span>";
			}
			else{
				xcode.style.borderColor="red";
				dcodex.innerHTML="<span style='color:red'>两次输入的密码要相同</span>";
			}

		}

		addEvent(xcode,'blur',function(){handle(arg);});
		addEvent(xcode,'focus',function(){
		dcodex.innerHTML="<span style='color:gray'>重复输入密码</span>";
		});
	},

	vmail:function(dmail,xmail){
		//var xmail=inputEles[3];
		var arg=this.check;

			function handle(arg){
			var str=xmail.value.trim();
			var reg=new RegExp('^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$','i');
			arg[3]=false;
			if(str.length<1||str===""){
				xmail.style.borderColor="red";
				dmail.innerHTML="<span style='color:red'>输入不能为空</span>";
			}
			else if(str.match(reg)){
				arg[3]=true;
				xmail.style.borderColor="green";	
				dmail.innerHTML="<span style='color:green'>邮箱格式正确</span>";
			}
			else{
				xmail.style.borderColor="red";
				dmail.innerHTML="<span style='color:red'>邮箱格式错误</span>";
			}
		}

			addEvent(xmail,'blur',function(){handle(arg);});
			addEvent(xmail,'focus',function(){
			dmail.innerHTML="<span style='color:gray'>exampleh@hah.com</span>";
			});
		
	},

	vphone:function(dphone,xphone){
		//var xphone=inputEles[4];
		var arg=this.check;
			function handle(arg){
			var str=xphone.value.trim();
			arg[4]=false;
			if(str.length<1||str===""){
				xphone.style.borderColor="red";
				dphone.innerHTML="<span style='color:red'>输入不能为空</span>";
			}
			else if(str.match(/0?(13|14|15|18)[0-9]{9}/)){
				arg[4]=true;
				xphone.style.borderColor="green";	
				dphone.innerHTML="<span style='color:green'>电话格式正确</span>";
			}
			else{
				xphone.style.borderColor="red";
				dphone.innerHTML="<span style='color:red'>电话格式错误</span>";
			}
		}

			addEvent(xphone,'blur',function(){handle(arg);});
			addEvent(xphone,'focus',function(){
			dphone.innerHTML="<span style='color:gray'>请输入11位手机号码</span>";
			});
	},

	vbtn:function(xbtn){
		var arg=this.check;
		//var xbtn=inputEles[5];
		function handle(arg){
			var flagx=1;
			for(var i=0;i<5;i++){
				if(arg[i]===false)
				{
					flagx=0;
					break;
				}
			}
			if(flagx)
			{
				alert("格式正确,提交成功！");
			}
			else
			{
				alert("提交失败，请重新输入");
			}
		}
		addEvent(xbtn,'click',function(){handle(arg);});
	}

	};//prototype
	return{
		vform:vform
	}
});


//var fuck=exform.check;
//alert(fuck[0]);
//fuck[0]=true;
//alert(exform.check[0]);