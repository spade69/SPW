define("useful",[],function(){String.prototype.glen=function(){for(var t=0,e=0;e<this.length;e++)this.charCodeAt(e)>127||94==this.charCodeAt(e)?t+=2:t++;return t},addEvent=function(t,e,n){t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent?t.attachEvent("on"+e,n):t["on"+e]=n},autoCenter=function(t){var e=document.body.clientWidth,n=document.body.clientHeight,o=t.offsetWidth,i=t.offsetHeight;t.style.left=(e-o)/2+"px",t.style.top=(n-i)/2+"px"},fillToBody=function(t){t.style.width=document.body.clientWidth+"px",t.style.height=document.body.clientHeight+"px"}});