define("localStorageImg",[],function(){var e=function(e,t){this.src=e,this.ele=t};return e.prototype={set:function(e,t){var a=document.createElement("img");a.src=this.src,a.addEventListener("load",function(){var a=document.createElement("canvas"),n=a.getContext("2d");a.style.width="50px",a.style.height="50px",n.drawImage(this,0,0,300,110);var r=a.toDataURL("image/"+t);try{localStorage.setItem(e,r)}catch(e){console.log("Storage failed:"+e)}},!1)},get:function(e){var t=localStorage.getItem(e),a=document.createElement("img");a.src=t,a.style.width="50px",a.style.height="60px",a.style.marginLeft="20px",this.ele.appendChild(a)}},{createStorage:e}});