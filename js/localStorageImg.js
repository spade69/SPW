/*Canvas transfer img to Base64 string 
Author:Jason
*/

var src="xxx.jpg";

function set(key){
	var img=document.createElement('img');
	//当图片加载完成时触发回调函数
	img.addEventListener('load',function(){
		var imgcanvas=document.createElement("canvas");
		var imgContext=imgcanvas.getContext("2d");
		//确保canvas元素的大小和图片尺寸一致
		imgcanvas.width=this.width;
		imgcanvas.height=this.height;

		//渲染图片到canvas中 定位以及宽高
		// context.drawImage(img,x,y,width,height);
		imgContext.drawImage(this,0,0,this.width,this.height);
		//用data url形式取出
		var imgAsDataURL=imgcanvas.toDataURL("image/png");

		//保存到本地存储中
		try{
			localStorage.setItem(key,imgAsDataURL);//存到localstorage~！
		}catch(e){
			console.log("Storage failed:"+e);
		}
	},false);
	img.src=src;
}

function get(key){//从本地缓存取图片并渲染
	var srcStr=localStorage.getItem(key);
	var imgObj=document.createElement('img');
	imgObj.src=srcstr;
	document.body.appendChild(imgObj);
}
