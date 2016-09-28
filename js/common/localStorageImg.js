/*Canvas transfer img to Base64 string 
Author:Jason
*/
define(function(){
	var createStorage=function(imgPath,ele){
		this.src=imgPath;//var src="xxx.jpg";
		this.ele=ele;
	}

	createStorage.prototype={
		set:function(key,imgType){
			var img=document.createElement('img');
			//img.setAttribute('crossOrigin','annonymous');
			//当图片加载完成时触发回调函数
			img.src=this.src;
			img.addEventListener('load',function(){
				var imgcanvas=document.createElement("canvas");
				var imgContext=imgcanvas.getContext("2d");
				imgcanvas.style.width="50px";//CANVAS大小
				imgcanvas.style.height="50px";
				//确保canvas元素的大小和图片尺寸一致
				//渲染图片到canvas中 定位以及宽高
				// context.drawImage(img,x,y,width,height);
				imgContext.drawImage(this,0,0,300,110);
				//用data url形式取出
				var imgAsDataURL=imgcanvas.toDataURL("image/"+imgType);

				//保存到本地存储中
				try{
					localStorage.setItem(key,imgAsDataURL);//存到localstorage~！
				}catch(e){
					console.log("Storage failed:"+e);
				}
			},false);
			
		},

		get:function(key){//从本地缓存取图片并渲染
			var srcStr=localStorage.getItem(key);
			var imgObj=document.createElement('img');
			imgObj.src=srcStr;
			imgObj.style.width="50px"; //这个会截断图片
			imgObj.style.height="60px";
			imgObj.style.marginLeft="20px";
			//document.body.appendChild(imgObj);
			this.ele.appendChild(imgObj);
		}
	}

	return{
		createStorage:createStorage
	}
});