define("useful",[],function(){String.prototype.glen=function(){for(var e=0,n=0;n<this.length;n++)this.charCodeAt(n)>127||94==this.charCodeAt(n)?e+=2:e++;return e},addEvent=function(e,n,t){e.addEventListener?e.addEventListener(n,t,!1):e.attachEvent?e.attachEvent("on"+n,t):e["on"+n]=t},autoCenter=function(e){var n=document.body.clientWidth,t=document.body.clientHeight,r=e.offsetWidth,s=e.offsetHeight;e.style.left=(n-r)/2+"px",e.style.top=(t-s)/2+"px"},fillToBody=function(e){e.style.width=document.body.clientWidth+"px",e.style.height=document.body.clientHeight+"px"}}),define("verify",["useful"],function(e){var n=function(e,n){this.btn=e,this.check=new Array(!1,!1,!1,!1,!1),this.items=n};return n.prototype={constructor:n,flag:0,vName:function(e,n){function t(n){var t=r.value.trim(),s=t.glen();n[0]=!1,s<1||""==t?(r.style.borderColor="red",e.innerHTML="<span style='color:red'>输入不能为空</span>"):s<4||s>16?(r.style.borderColor="red",e.innerHTML="<span style='color:red'>请检查名称的</span>"):(n[0]=!0,r.style.borderColor="green",e.innerHTML="<span style='color:green'>名称格式正确</span>")}var r=n,s=this.check;addEvent(r,"blur",function(){t(s)}),addEvent(r,"focus",function(){e.innerHTML="<span style='color:gray'>必填，长度为4~16字符</span>"})},vPasswd:function(e,n){function t(t){var r=n.value.trim();t[1]=!1,r.length<1||""===r?(n.style.borderColor="red",e.innerHTML="<span style='color:red'>输入不能为空</span>"):r.match(/^[a-zA-Z0-9]{6,16}$/)?(t[1]=!0,n.style.borderColor="green",e.innerHTML="<span style='color:green'>密码格式正确</span>",flag=1):(n.style.borderColor="red",e.innerHTML="<span style='color:red'>请输入6-16位字符且只能为数字和字母</span>")}var r=this.check;addEvent(n,"blur",function(){t(r)}),addEvent(n,"focus",function(){e.innerHTML="<span style='color:gray'>6~16位数字和字母</span>"})},vPassx:function(e,n,t){function r(r){var s=t.value.trim(),o=n.value.trim();r[2]=!1,s.length<1||""===s?(t.style.borderColor="red",e.innerHTML="<span style='color:red'>输入不能为空</span>"):s===o&&1===flag?(r[2]=!0,t.style.borderColor="green",e.innerHTML="<span style='color:green'>密码正确</span>"):(t.style.borderColor="red",e.innerHTML="<span style='color:red'>两次输入的密码要相同</span>")}var s=this.check;addEvent(t,"blur",function(){r(s)}),addEvent(t,"focus",function(){e.innerHTML="<span style='color:gray'>重复输入密码</span>"})},vmail:function(e,n){function t(t){var r=n.value.trim(),s=new RegExp("^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$","i");t[3]=!1,r.length<1||""===r?(n.style.borderColor="red",e.innerHTML="<span style='color:red'>输入不能为空</span>"):r.match(s)?(t[3]=!0,n.style.borderColor="green",e.innerHTML="<span style='color:green'>邮箱格式正确</span>"):(n.style.borderColor="red",e.innerHTML="<span style='color:red'>邮箱格式错误</span>")}var r=this.check;addEvent(n,"blur",function(){t(r)}),addEvent(n,"focus",function(){e.innerHTML="<span style='color:gray'>exampleh@hah.com</span>"})},vphone:function(e,n){function t(t){var r=n.value.trim();t[4]=!1,r.length<1||""===r?(n.style.borderColor="red",e.innerHTML="<span style='color:red'>输入不能为空</span>"):r.match(/0?(13|14|15|18)[0-9]{9}/)?(t[4]=!0,n.style.borderColor="green",e.innerHTML="<span style='color:green'>电话格式正确</span>"):(n.style.borderColor="red",e.innerHTML="<span style='color:red'>电话格式错误</span>")}var r=this.check;addEvent(n,"blur",function(){t(r)}),addEvent(n,"focus",function(){e.innerHTML="<span style='color:gray'>请输入11位手机号码</span>"})},vbtn:function(e){function n(n,t){for(var r=1,s=0;s<t;s++)if(n[s]===!1){r=0;break}r?e.disabled=!1:e.disabled=!0}var t=this.check,r=this.items;setInterval(function(){n(t,r)},1e3)}},{vform:n}}),define("mySignUp",["verify","jquery"],function(e,n){var t=function(e,n,t,r,s,o,i,a){this.userID=document.getElementById(e),this.passwd=document.getElementById(n),this.xpass=document.getElementById(t),this.mail=document.getElementById(r),this.info=document.getElementById(s),this.icode=document.getElementById(o),this.xcode=document.getElementById(i),this.dmail=document.getElementById(a),this.btn=document.getElementById("verify"),this.btn.disabled=!0};return t.prototype={myVerify:function(){var n=new e.vform(this.btn,4);n.vName(this.info,this.userID),n.vPasswd(this.icode,this.passwd),n.vPassx(this.xcode,this.passwd,this.xpass),n.vmail(this.dmail,this.mail),n.vbtn(this.btn)},signUpPost:function(){var e="http://spw.linzhida.cc/user/register",n=this;this.userID.setAttribute("name","username"),this.passwd.setAttribute("name","password"),this.mail.setAttribute("name","email"),$("#verify").on("click",function(){$("#signUpForm").on("submit",function(t){t.preventDefault();var r=$.post(e,$("#signUpForm").serialize());r.done(function(e){switch($("#signupInfo").empty(),e.result){case 0:n.cleanAll();var t=$('<p style="background-color:green;color:white">Success!!!<button class="btn btn-danger">Confirm</button></p>');$("#signupInfo").append(t),$("#signUpForm").css("display","none"),$("#signupInfo").find("button").on("click",function(){window.location.href="Main.html"});break;case 1:var r=$('<p style="color:red;width:100%">Failed to sign up,please try again,later!</p>');$("#signupInfo").append(r),alert("Failed!");break;case 2:var s=$('<p style="color:red">Failed to sign up, email is already used!</p>');$("#signupInfo").append(s);break;case 3:var o=$('<p style="color:red">Failed to sign up, username is already used !</p>');$("#signupInfo").append(o)}})})})},cleanAll:function(){$(this.userID).val(""),$(this.passwd).val(""),$(this.xpass).val(""),$(this.mail).val("")}},{createSignUp:t}});